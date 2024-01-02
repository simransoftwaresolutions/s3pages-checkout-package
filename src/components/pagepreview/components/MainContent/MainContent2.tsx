import { Fragment } from 'react';
import { usePushCtx } from "../../../../context/pagepreview/PushContext";
import { usePagesCtx } from "../../../../context/pagepreview/PagesContext";
import { useSettingsCtx } from "../../../../context/pagepreview/SettingsContext";
import { GridElements } from './MainSubElement';
import styles from '../../../../styles/pagepreview/MainContent.module.css';
import { useState, useEffect, useRef } from "react";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {  
  deepCloneSection, 
  deepCloneArray, 
  getTemplateStyle,
  getDraggedElement,
  getHoveredElement,  
  getChangeStyleOfElement,
  generateClassNameStr,
} from '../../../../utils/functions';
import ENV from '../../../../utils/env';
import { CreateTemplate, UpdateTemplate } from '../../../../service/pagepreview/TemplateServices';
import { DeletePage, ClonePage } from '../../../../service/pagepreview/PagesServices';
import EditSectionTopbar from '../../components/Atoms/EditSectionTopbar';
import PageTopbar from '../../components/Atoms/PageTopbar';
import { useContentCtx } from "../../../../context/pagepreview/ContentsContext";
import { toast } from 'react-toastify';
import MainMyComponent from './MainMyComponent';

const MainContent2 = () => {

  //////////////////////////////////////////////////////////////////////////////////////////
  const { sectionCtx, 
          setSectionCtx, 
          draggedElement, 
          setDraggedElement, 
          hoveredElement, 
          setHoveredElement,
          contentAction,
          setContentAction,
          changeStyleOfElement,
          setChangeStyleOfElement,
          myTemplatesCtx,
          myOverlayCtx,
          pageSeoUrlCtx,
        } = useContentCtx();

  const { setIsProcessing } = usePushCtx();

  ////////////////////////////////////////////////////////////////////////////////////////////
  const { eleNumCtx, setEleNumCtx } = usePushCtx();
  const { curEleCtx, setCurEleCtx } = usePushCtx();
  const { mobileView, setMobileView } = usePushCtx();
  const { selectedMainTools, setSelectedMainTools, setIsSettingsOpen } = useSettingsCtx();
  const [ viewState, setViewState ] = useState('desktop');
  const [ selDragEle, setSelDragEle ] = useState(-1);
  const [ sectionHoverIdx, setSectionHoverIdx ] = useState<number>(-1);

  const [ selDragSection, setSelDragSection ] = useState(-1);

  const { saveElementData, setSaveElementData } = usePushCtx();
  const { createNewElement, setCreateNewElement } = usePushCtx();

  const { showSettingCtx, setShowSettingCtx } = usePushCtx();

  //////////////////////////////////////////////////////////////////////////////////////
  const { 
          leftToolSHoverIdx, 
          leftToolCHoverIdx,
          sectionScrollIdx,  
          setSectionScrollIdx,
        } = usePushCtx();

  //////////////////////////////////////////////////////////////////////////////////////

  const { templateCss } = usePushCtx();
  
  const { pageAction, setPageAction, pagesArr, setPagesArr, stylesCtx, setStylesCtx, stylesGlobCtx } = usePagesCtx();

  const { hideOverlayArr, setHideOverlayArr, funnelPages, setFunnelPages, updateSection, setUpdateSection, saveElementsData, activeDevice, setActiveDevice } = usePagesCtx();

  const [ activeHighlight, setActiveHighlight ] = useState(false);
  const [ extDivMinHeight, setExtDivMinHeight ] = useState<number>(0);
  const [ previewEleData, setPreviewEleData ] = useState<any>(null);

  const secRefs = useRef<any>([]);
  const mainContentRef = useRef<any>(null);

  useEffect(() => {
    if(activeDevice !== viewState){
      switch(activeDevice){
        case "desktopview":
          setViewState("desktop");
          break;
        case "tabletview":
          setViewState("tablet");
          break;
        case "mobileview":
          setViewState("phone");
          break;
        default:
          setViewState("desktop");
          break;
      }
    }
  }, [activeDevice]);

  
  const setDeviceState = (state:string) => {
    switch(state){
      case "desktop":
        setActiveDevice("desktopview");
        break;
      case "tablet":
        setActiveDevice("tabletview");
        break;
      case "phone":
        setActiveDevice("mobileview");
        break;
      default:
        setActiveDevice("desktopview");
        break;
    }
  }

  useEffect(() => {
    
    if(ENV.isViewReadOnly === true){
      setSelDragEle(-1);
      setSelDragSection(-1);
    }

  }, [ENV.isViewReadOnly]);

  useEffect(() => {
    if(createNewElement.data && createNewElement.isAllowed){
      showElementInModal(createNewElement.data, createNewElement.sIndex);
      setCreateNewElement({...createNewElement, isAllowed:false});
    }

  }, [createNewElement]);

  useEffect(() => { // highlight hover section and column from left side tool Sections

    const hoveredSection:any = leftToolSHoverIdx !== -1 ? secRefs.current[leftToolSHoverIdx] : null;
    setSectionHoverIdx(leftToolSHoverIdx);
    const tooltipStr = "section_" + leftToolSHoverIdx; 
    setContentAction({...contentAction, tooltipEnableString:tooltipStr});
    // const hoveredColumn:any = leftToolCHoverIdx !== -1 ? colRefs.current[leftToolSHoverIdx + '_' + leftToolCHoverIdx] : null;

    if(leftToolSHoverIdx !== -1){
      removeAllHover();
      if(hoveredSection) hoveredSection.classList.add('drag-over');
      // if(hoveredColumn) hoveredColumn.classList.add('drag-over');
    }else{
      removeAllHover();
    }

  }, [leftToolSHoverIdx, leftToolCHoverIdx]);

  useEffect(() => { // scroll section when click in section popup
      
    if(sectionScrollIdx > -1 && mainContentRef && mainContentRef?.current && secRefs && secRefs.current[sectionScrollIdx]){
      const parent = mainContentRef?.current;
      const child = secRefs.current[sectionScrollIdx];
      
      const parentOffset = parent?.offsetHeight;
      const childOffset = child?.offsetHeight;
      
      const innerInstHeight = (parentOffset - childOffset) > 0 ? (parentOffset - childOffset) : 0;
      setExtDivMinHeight(innerInstHeight);

      setTimeout(()=>{
        const top = child.offsetTop - parent.offsetTop - 10;
        parent.scrollTo({top:top});
        setSectionScrollIdx(-1);          
      },500);

    }
  }, [sectionScrollIdx]);

  // functions for pages
  
  const deletePage = async () => {

    setIsProcessing(true);
    const pageIdx = pageAction?.activePage ? pageAction?.activePage : 0;
    const _pageId = funnelPages[pageIdx]?.pageData?.id;
    await DeletePage(_pageId);
    // setPageAction({...pageAction, isPageLoading:true});

    const tempFunnel = deepCloneArray(funnelPages);
    tempFunnel.splice(pageIdx, 1);
    setFunnelPages(tempFunnel);

    const tempPages = deepCloneArray(pagesArr);
    tempPages.splice(pageIdx, 1);  
    setPagesArr(tempPages);

    const _pVariant = deepCloneArray(pageAction.pageVariants);
    _pVariant.splice(pageIdx, 1);

    const _pageLength = tempPages?.length;
    if(pageIdx && _pageLength >= pageIdx){
      setPageAction({...pageAction, pageVariants: _pVariant, activePage: pageIdx-1, activeVariant: 0});
    }

    toast.success("Page deleted successfully.");
    setIsProcessing(false);
  }
  
  const splitTest = async () => {
    const _activePage = pageAction?.activePage ? pageAction?.activePage : 0;
    const variantLength = pageAction?.pageVariants ? pageAction?.pageVariants : []; 

    if(variantLength[_activePage] <= 0) return;

    if(variantLength[_activePage] === 1){
      setPageAction({...pageAction, showMainContent: "split_variants"});
    }else{
      setPageAction({...pageAction, showMainContent: "variant_content"});
    }
  }

  const clonePage = async () => {

    const pageIdx = pageAction?.activePage ? pageAction?.activePage : 0;
    const _pageId = funnelPages[pageIdx]?.pageData?.id;
    const _funnelId = funnelPages[pageIdx]?.pageData?.site;
    const template = {
      "site":_funnelId,
    }

    setIsProcessing(true);
    const _retPage = await ClonePage(_pageId, template);
    if(_retPage.status){

      const _pageArr = deepCloneArray(pagesArr);
      const _pageArr1 = deepCloneArray(pagesArr);
      const _fPages = deepCloneArray(funnelPages);

      const _tempPages = {
        pageName: _retPage.data.title,
        pageSectionCtx: _pageArr1[pageIdx]?.pageSectionCtx,
        pageEleNumCtx:0,
      }
      _pageArr.push(_tempPages);
      setPagesArr(_pageArr);

      const _rPage = _retPage.data;
      // const _rPage = Object.assign({}, _retPage.data, { funnel: { _id: _retPage.data.funnel} }); // for page data (all data)

      ////////////////////////////////////////////////////////////////
      // this code for template
      const _rTemplate = Object.assign({}, _retPage.data.variants[0], { _id: _retPage.data.variants[0]?.id} );
      const _tempFunnelTemplate = [];
      _tempFunnelTemplate.push(_rTemplate);
      ////////////////////////////////////////////////////////////////

      const _tempFunnel = {
        pageData: _rPage,
        template: _tempFunnelTemplate
      }

      _fPages.push(_tempFunnel);
      setFunnelPages(_fPages);

      const variantLength = pageAction?.pageVariants ? pageAction?.pageVariants : [];
      const _vLength = deepCloneArray(variantLength);
      _vLength.push(1);
      setPageAction({...pageAction, pageVariants:_vLength});

      toast.success("Page cloned successfully.");
    }else{
      toast.error("Something went wrong."); 
    }
    setIsProcessing(false);
  }

  // functions for pages

  const handlePreview = () => {

    const _myTemplatesCtx = [];
    for ( const [key,value] of Object.entries(myTemplatesCtx) ) {
      _myTemplatesCtx.push({
        key:key,
        data:value
      });
    }

    const _myOverlayCtx = [];
    for ( const [key,value] of Object.entries(myOverlayCtx) ) {
      _myOverlayCtx.push({
        key:key,
        data:value
      });
    }
    localStorage.removeItem("sectionCtx");
    localStorage.removeItem("templateCss");
    localStorage.removeItem("stylesCtx");
    localStorage.removeItem("stylesGlobCtx");
    localStorage.removeItem("myTemplatesCtx");
    localStorage.removeItem("myOverlayCtx");
    localStorage.removeItem("pageSeoUrlCtx");
    localStorage.setItem('sectionCtx', JSON.stringify(sectionCtx));
    localStorage.setItem('templateCss', JSON.stringify(templateCss));
    localStorage.setItem('stylesCtx', JSON.stringify(stylesCtx));
    localStorage.setItem('stylesGlobCtx', JSON.stringify(stylesGlobCtx));
    localStorage.setItem('myTemplatesCtx', JSON.stringify(_myTemplatesCtx));
    localStorage.setItem('myOverlayCtx', JSON.stringify(_myOverlayCtx));
    localStorage.setItem('pageSeoUrlCtx', JSON.stringify(pageSeoUrlCtx));

  }

  const handleSave = async() => {

    const pageIdx = pageAction?.activePage ? pageAction?.activePage : 0;
    const variantIdx = pageAction?.activeVariant ? pageAction?.activeVariant : 0;
    const tempPages = deepCloneArray(pagesArr);

    tempPages[pageIdx].pageSectionCtx[variantIdx] = sectionCtx;
    tempPages[pageIdx].pageEleNumCtx = eleNumCtx;

    setPagesArr(tempPages);

    const templateId = funnelPages[pageIdx]?.template[variantIdx]?._id;

    // console.log(funnelPages[pageIdx]);
    // stylesCtx.styles.splice(470, 1);
    if(templateId){
      const template = {
        "content":JSON.stringify(sectionCtx),
        "setting":JSON.stringify(templateCss),
        "styles":(stylesCtx.styles),
      }
    
      setIsProcessing(true);
      await UpdateTemplate(templateId, template);
      toast.success("Template updated successfully.");
      setIsProcessing(false);
    }else{

      const _pageId = funnelPages[pageIdx]?.pageData?.id;
      const _funnelId = funnelPages[pageIdx]?.pageData?.site;
      const template = {
        "site":_funnelId,
        "page":_pageId,
        "content":JSON.stringify(sectionCtx),
        "setting":JSON.stringify(templateCss),
        "traffic": 100,
      }

      const _retTemplate = await CreateTemplate(template);

      if(_retTemplate.status){
        
        const _retTemp = Object.assign({}, _retTemplate.data, { id: _retTemplate.data._id });

        const _fPages = deepCloneArray(funnelPages);
        _fPages[pageIdx]?.template.push(_retTemp);
        setFunnelPages(_fPages);

        const _pVariant = deepCloneArray(pageAction.pageVariants);
        _pVariant.push(_fPages[pageIdx]?.template?.length)
        setPageAction({...pageAction, pageVariants: _pVariant});
      }

    }
  }

  const handleDeleteSection = (sIndex:number) => {
    const curSectionCtx = deepCloneSection(sectionCtx);
    curSectionCtx.splice(sIndex, 1);
    
    // Restructure hide overlay array
    let indexToRemove = hideOverlayArr?.indexOf(sIndex);
    if (indexToRemove !== -1) hideOverlayArr?.splice(indexToRemove, 1); // remove current section if it is overlay
    const _hideOverlayArr = hideOverlayArr.map(element => (element > sIndex) ? element - 1 : element);
    setHideOverlayArr(_hideOverlayArr);

    setSectionCtx(curSectionCtx);
  }

  const openSettings = (type:string, sIndex:number=-1, cIdx:number=-1, tIdx:number=-1) => {
  }
 
  const cloneSectionComponent = (secIndex:number) => {

    const blockSectionCtx = deepCloneSection(sectionCtx);
    let newSectionCtx = deepCloneSection(sectionCtx[secIndex]);
    newSectionCtx.eleInfo.props.sectionId = "";

    blockSectionCtx.push(newSectionCtx);
    setSectionCtx(blockSectionCtx);

  }

  const openSectionSettings = (type:string, sIdx:number, data:any, elementIdxs:number[]) => {
    const _settingData = {
      from:"",
      data:data,
      sectionIdx:sIdx,
      elementIdxs:elementIdxs,
      type:type,
    }

    setChangeStyleOfElement({...changeStyleOfElement, ..._settingData});
    setIsSettingsOpen(true);
  }
  
  const actionSectionComponent = (tooltipStr:string, sec:any, sIdx:number, isMytemplate:boolean, isMyOverlay:boolean, isMyComponent:boolean=false) => {

    let showTooltip:boolean = true;
    if(contentAction.tooltipEnableString !== tooltipStr) showTooltip = false;

    let globalComponent = "";
    if(isMytemplate) globalComponent = "My Templates";
    if(isMyOverlay) globalComponent = "Overlay";
    if(isMyComponent) globalComponent = "My Component";

    return (
      ENV.isViewReadOnly === false && showTooltip && !updateSection?.sectionEditEnable && !saveElementsData?.showElement ?
      (
        globalComponent ? 
        (
          <span className={`${styles.actionSectionContainerChild} ${styles.noBorder}`}>
            <span className={styles.heading}><b>{globalComponent}</b></span>
            <span className={`${styles.sectionIcon}`}>
              <OpenWithOutlinedIcon fontSize="medium" onMouseDown={()=>setSelDragSection(sIdx)}/>
              <SettingsOutlinedIcon fontSize="medium" onClick={()=>openSectionSettings("Section", sIdx, sec, [])} />
              <DeleteForeverOutlinedIcon fontSize="medium" onClick={()=>handleDeleteSection(sIdx)} />
            </span>
          </span>
        )
        :
        (
          <span className={`${styles.actionSectionContainerChild} ${styles.noBorder}`}>
            <span className={styles.heading}><b>Section</b></span>
            <span className={`${styles.sectionIcon}`}>
              <OpenWithOutlinedIcon fontSize="medium" onMouseDown={()=>setSelDragSection(sIdx)}/>
              <SettingsOutlinedIcon fontSize="medium" onClick={()=>openSectionSettings("Section", sIdx, sec, [])}/>
              <FileCopyOutlinedIcon fontSize="medium" onClick={()=>cloneSectionComponent(sIdx)}/>
              <SaveOutlinedIcon fontSize="medium" data-bs-toggle="modal" data-bs-target="#saveModal" onClick={() => showElementInModal(sec, sIdx)} />
              <DeleteForeverOutlinedIcon fontSize="medium" onClick={()=>handleDeleteSection(sIdx)} />
            </span>
          </span>
        )
      ):
      (<></>)

    )
  }

  const showElementInModal = (blockSectionCtx:any, sIndex:number, cIdx:number = -1, tIdx:number = -1) => {
    setSaveElementData(blockSectionCtx);
  }

  const dropEle = (ev:any, secIndex:number, colIndex:number) => {
    ev.preventDefault();
    ev.target.classList.remove('drag-over');
    setSelDragEle(-1);

  }


  const dragSection = (ev:any, data:any, sIdx:number) => {
    
    ev.stopPropagation();
    const _element = {
      from:"main_content",
      data:data,
      sectionIdx:sIdx,
      elementIdxs:[],
      type:"Section",
    }

    setDraggedElement({...draggedElement, ..._element});
  }

////////////////////////////////////////////////////////////////////////////////////////////////
  const dropSection = (ev:any) => { // called on drop in section

    setCurEleCtx({
      eleNum:-1,
      secIndex:-1,
      colIndex:-1,
      type:'',
    });

    ev.preventDefault();
    removeAllHighlightedHover();
    setSelDragSection(-1);
    if(ENV.isViewReadOnly || !hoveredElement?.type) return;

    if(draggedElement?.from === "blocks" && draggedElement?.type === "Section"){
      // this code is called on section drop from blocks

      const _tempSectionsCtx = deepCloneArray(sectionCtx);
      if(hoveredElement.sectionIdx > -1 && (hoveredElement.sectionIdx+1) < _tempSectionsCtx.length){
        _tempSectionsCtx.splice((hoveredElement.sectionIdx), 0, draggedElement?.data);
        
        // Restructure hide overlay array
        const _hideOverlayArr = hideOverlayArr.map(element => (element >= hoveredElement.sectionIdx) ? element + 1 : element);
        setHideOverlayArr(_hideOverlayArr);
      }else{
        _tempSectionsCtx.push(draggedElement?.data);
      }
      setSectionCtx(_tempSectionsCtx);

      // reset dragged and hovered container start  
      setHoveredElement({...hoveredElement, ...getHoveredElement});
      setDraggedElement({...draggedElement, ...getDraggedElement});
      // reset dragged and hovered container end

    }

    if(draggedElement?.from === "main_content" && draggedElement?.type === "Section"){
      // this code is called on section drop from main content

      const _tempSectionsCtx = deepCloneArray(sectionCtx);
      if(hoveredElement.sectionIdx > -1 && (hoveredElement.sectionIdx+1) < _tempSectionsCtx.length){
        _tempSectionsCtx.splice((hoveredElement.sectionIdx), 0, draggedElement?.data);

        if(hoveredElement.sectionIdx < draggedElement.sectionIdx){
          _tempSectionsCtx.splice((draggedElement.sectionIdx+1), 1);

          // Restructure hide overlay array
          const _hideOverlayArr = hideOverlayArr.map(element => (element >= hoveredElement.sectionIdx && element < draggedElement.sectionIdx) ? element + 1 : element);
          setHideOverlayArr(_hideOverlayArr);
        }else{
          _tempSectionsCtx.splice(draggedElement.sectionIdx, 1); 
                              
          // Restructure hide overlay array
          const _hideOverlayArr = hideOverlayArr.map(element => (element < hoveredElement.sectionIdx && element >= draggedElement.sectionIdx) ? element - 1 : element);
          setHideOverlayArr(_hideOverlayArr);
        }

      }else{
        _tempSectionsCtx.push(draggedElement?.data);
        _tempSectionsCtx.splice(draggedElement.sectionIdx, 1);  
                
        // Restructure hide overlay array
        const _hideOverlayArr = hideOverlayArr.map(element => (element >= draggedElement.sectionIdx) ? element - 1 : element);
        setHideOverlayArr(_hideOverlayArr);
      }
      setSectionCtx(_tempSectionsCtx);

      // reset dragged and hovered container start  
      setHoveredElement({...hoveredElement, ...getHoveredElement});
      setDraggedElement({...draggedElement, ...getDraggedElement});
      // reset dragged and hovered container end

    }

    if( 
        draggedElement?.from === "main_content" && 
        draggedElement?.type !== "Section" && 
        draggedElement?.type !== "Column" &&
        hoveredElement?.type !== 'Grid'
      ){
        // This code is called on element drop from main content

        if(hoveredElement?.type === 'Section' && draggedElement?.type !== "Grid") return;

        if(draggedElement?.type === "Grid"){
          // Code for grid can not be copied in it self

          let dIdxArr = [];
          let hIdxArr = [];

          dIdxArr.push(draggedElement.sectionIdx);
          hIdxArr.push(hoveredElement.sectionIdx);

          for(let n=0; n<draggedElement.elementIdxs.length; n++){
            dIdxArr.push(draggedElement.elementIdxs[n]);
            hIdxArr.push(hoveredElement.elementIdxs[n]);
          }

          if(JSON.stringify(dIdxArr) === JSON.stringify(hIdxArr)){
            toast.warning("Action denied.");
            return;
          }
        }

        const _dragEleIdx = draggedElement?.elementIdxs?.length ? draggedElement.elementIdxs[draggedElement.elementIdxs.length-1]:0;
        // _dragEleIdx is dragged element index

        let _hoverEleIdx = -1; // _hoverEleIdx is hovered element index
        let _hoverLength = 0; // length of hover element pointing index array
        let _dragLength = draggedElement.elementIdxs.length-1; // length of drag element pointing index array

        let isSamePath = false;

        const pathOfDragEle = deepCloneArray(draggedElement.elementIdxs); // for getting path to dragged element
        pathOfDragEle.splice(pathOfDragEle.length-1, 1);

        if(hoveredElement.type === "Column"){ // this if condition check hovered element is column or other element like button, 
          _hoverLength = hoveredElement.elementIdxs.length; // for getting path to hovered array length
          _hoverEleIdx = -1;

          const pathOfHoverEle = deepCloneArray(hoveredElement.elementIdxs); // for getting path to hovered element

          if(draggedElement.sectionIdx === hoveredElement.sectionIdx && JSON.stringify(pathOfDragEle) === JSON.stringify(pathOfHoverEle)) isSamePath = true;
        }else{
          _hoverLength = hoveredElement.elementIdxs.length-1;
          _hoverEleIdx = hoveredElement.elementIdxs[hoveredElement.elementIdxs.length-1];

          const pathOfHoverEle = deepCloneArray(hoveredElement.elementIdxs); // for getting path to hovered element
          pathOfHoverEle.splice(pathOfHoverEle.length-1, 1);

          if(draggedElement.sectionIdx === hoveredElement.sectionIdx && JSON.stringify(pathOfDragEle) === JSON.stringify(pathOfHoverEle)) isSamePath = true;
        }

        const _toSectionsCtx = deepCloneArray(sectionCtx);

        let formTemp = [];
        let _formTemp = _toSectionsCtx[draggedElement.sectionIdx];
        formTemp.push(_formTemp);
        for(let i=0; i<_dragLength; i++){ // loop for pointing dragged element  
          formTemp[i+1] = formTemp[i].elements[draggedElement.elementIdxs[i]];
        }

        let toTemp = [];
        let _toTemp = _toSectionsCtx[hoveredElement.sectionIdx];
        toTemp.push(_toTemp);
        for(let i=0; i<_hoverLength; i++){ // loop for pointing destination
          toTemp[i+1] = toTemp[i].elements[hoveredElement.elementIdxs[i]];
        }

        if(_hoverEleIdx > -1){

          toTemp[toTemp.length-1].elements.splice(_hoverEleIdx, 0, draggedElement.data);

          if(isSamePath && _hoverEleIdx < _dragEleIdx){
            formTemp[formTemp.length-1].elements.splice((_dragEleIdx+1), 1);
          }else{
            formTemp[formTemp.length-1].elements.splice(_dragEleIdx, 1);
          }

        }else{
          toTemp[toTemp.length-1]?.elements.push(draggedElement.data); // at destination push dragged element
          formTemp[formTemp.length-1]?.elements.splice(_dragEleIdx, 1); // remove element after drag
        }
        setSectionCtx(_toSectionsCtx);

        // reset dragged and hovered container start
        setContentAction({...contentAction, draggableEleIdx:-1}); 
        setHoveredElement({...hoveredElement, ...getHoveredElement});
        setDraggedElement({...draggedElement, ...getDraggedElement});
        // reset dragged and hovered container end

    }

    if( 
        draggedElement?.from === "blocks" && 
        draggedElement?.type !== "Section" && 
        draggedElement?.type !== "Column"
        // hoveredElement?.type !== 'Section' 
    ){
      // This code is called on element drop from blocks

      if(!sectionCtx?.length) return;
      if(hoveredElement?.type === 'Section' && draggedElement?.type !== "Grid") return;

      let _hoverEleIdx = -1; // _hoverEleIdx is hovered element index
      let _hoverLength = 0; // length of hover element pointing index array

      if(hoveredElement.type === "Column"){ // this if condition check hovered element is column or other element like button, 
        _hoverLength = hoveredElement.elementIdxs.length; // for getting path to hovered array length
        _hoverEleIdx = -1;
      }else{
        _hoverLength = hoveredElement.elementIdxs.length-1;
        _hoverEleIdx = hoveredElement.elementIdxs[hoveredElement.elementIdxs.length-1];
      }

      const _toSectionsCtx = deepCloneArray(sectionCtx);

      let toTemp = [];
      let _toTemp = _toSectionsCtx[hoveredElement.sectionIdx];
      toTemp.push(_toTemp);
      for(let i=0; i<_hoverLength; i++){ // loop for pointing destination
        toTemp[i+1] = toTemp[i].elements[hoveredElement.elementIdxs[i]];
      }

      if(_hoverEleIdx > -1){
        toTemp[toTemp.length-1].elements.splice(_hoverEleIdx, 0, draggedElement.data);
      }else{
        toTemp[toTemp.length-1].elements.push(draggedElement.data); // at destination push dragged element
      }
      setSectionCtx(_toSectionsCtx);

      // reset dragged and hovered container start  
      setHoveredElement({...hoveredElement, ...getHoveredElement});
      setDraggedElement({...draggedElement, ...getDraggedElement});
      // reset dragged and hovered container end

    }



  }


 /////////////////////////////////////////////////////////////////////////////////////////////////
  const removeAllHover = () => {
    const elements = document.querySelectorAll(".drag-over");
    if(elements.length > 0){
      for(let i=0;i<elements.length;i++){
        elements[i].classList.remove('drag-over');
      }
    }
  }

  const removeAllHighlightedHover = () => {
    
    const elements = document.querySelectorAll(".drag-highlight");
    if(elements.length > 0){
      for(let i=0;i<elements.length;i++){
        elements[i].classList.remove('drag-highlight');
      }
    }

  }

  const handleHighlight = () => {
    const highlightEle = document.querySelectorAll(".highlight")!;

    setActiveHighlight(!activeHighlight);
    if(highlightEle && highlightEle.length){

      highlightEle.forEach((ele:any)=>{
        ele.style.outline = activeHighlight ? "none":"red solid 1px";
      });

    }

  }
  
  const openTemplateSettings = () => {
    const _settingData = deepCloneArray(getChangeStyleOfElement);
    _settingData.type = "Page";
    setChangeStyleOfElement({...changeStyleOfElement, ..._settingData});
    setIsSettingsOpen(true);
  }

  const onRedo = () => {
    console.log("redo clicked");
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  const onDragLeaveFromSection = (ev:any, sIdx:number) => {
    ev.preventDefault();
    ev.stopPropagation();
    secRefs?.current[sIdx]?.classList.remove('drag-highlight');
    setHoveredElement({...hoveredElement, ...getHoveredElement});
  }

  const onDragOverFromSection = (ev:any, sIdx:number) => {
    ev.preventDefault();
    ev.stopPropagation();

    if(ENV.isViewReadOnly === false){
      secRefs?.current[sIdx]?.classList.add('drag-highlight');
    }

    const _hoveredElement = {
      sectionIdx:sIdx,
      elementIdxs:[],
      type:"Section",
    }

    setHoveredElement({...hoveredElement, ..._hoveredElement});
  }

  const onMouseLeaveFromSec = (ev:any) => {
    ev.stopPropagation();
    setSectionHoverIdx(-1);
    removeAllHover();
    setContentAction({...contentAction, tooltipEnableString:""});    
  }
  const onMouseOverFromSec = (ev:any, sIndex:number, tooltipStr:string) => {
    ev.stopPropagation();
    removeAllHover();

    setSectionHoverIdx(sIndex);
    setContentAction({...contentAction, tooltipEnableString:tooltipStr});
    if(ENV.isViewReadOnly === false){
      secRefs?.current[sIndex]?.classList.add('drag-over');
    }
  }

  const closeOverlay = (sIndex:number) => { // for Overlay close 
    secRefs.current[sIndex].classList.add("ov_close_int");
    if(ENV.isViewReadOnly === false){
      if(hideOverlayArr.indexOf(sIndex) === -1){
        hideOverlayArr.push(sIndex);
        setHideOverlayArr(hideOverlayArr);
      }
      if(!secRefs?.current[sIndex]?.classList?.contains("overlay-hide")) secRefs.current[sIndex].classList.add("overlay-hide");
      if(secRefs?.current[sIndex]?.classList.contains('overlay-tgl-show')) secRefs?.current[sIndex]?.classList.remove('overlay-tgl-show');
    }else{
      if(secRefs?.current[sIndex]?.classList.contains("ov_show_int")) secRefs.current[sIndex].classList.remove("ov_show_int");
    }
  }

  useEffect(() => { // for overlay close at exit intent
    const handleMouseLeave = (e:any) => {
      const exitIntentThreshold = 20;

      if (e.clientY <= exitIntentThreshold && ENV.isViewReadOnly !== false ) {

        for(let i=0;i< secRefs?.current?.length; i++){
          if (!secRefs?.current[i]?.classList.contains('ov_hide') && secRefs?.current[i]?.classList?.contains('ov_exit_int')) {
            secRefs?.current[i]?.classList.add('ov_hide');
            secRefs?.current[i]?.classList.add('ov_show_int');
          }
        }

      }
    };

    if(typeof document !== 'undefined') document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if(typeof document !== 'undefined') document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // overlay intent setting function for readonly view
  const overlayDisplay = (isOverlay:boolean, sIndex:number, ovShowOn:string | undefined, ovShowDelay:number | undefined) => {
    if(isOverlay && ENV.isViewReadOnly !== false){ // for start intent show after delay
      switch(ovShowOn){
        case "exit_intent":
          if(secRefs?.current[sIndex] && !secRefs.current[sIndex].classList.contains('ov_close_int')) secRefs.current[sIndex].classList.add('ov_exit_int');
          break;
        case "start_intent":
          setTimeout(()=>{
            if(secRefs?.current[sIndex] && !secRefs.current[sIndex].classList.contains('ov_close_int')) secRefs.current[sIndex].classList.add('ov_show_int');
          },((ovShowDelay || 0) * 1000));
          break;
        default:
          if(secRefs?.current[sIndex] && !secRefs.current[sIndex].classList.contains('ov_close_int')) secRefs.current[sIndex].classList.add('ov_show_int');
      }
    }
    return <></>;
  }

  let deviceCls = "desktopclass";
  if(viewState === "desktop") deviceCls = "desktopclass";
  if(viewState === "tablet") deviceCls = "tabletclass";
  if(viewState === "phone") deviceCls = "phoneclass";
  return (
    <Fragment>
      {
        ENV.isViewReadOnly === false ?
        (
          <div className={`${styles.headBtnContain} ${ENV.isViewReadOnly ? "view-type":""} row`}>
        
            <div className="col-md-1">
              <FormatListBulletedIcon className={`${styles.curPointer}`} fontSize='medium' onClick={() => setShowSettingCtx(!showSettingCtx)} />
            </div>
            <div className="col-md-4">
                
                <div className={`${styles.viewSizes}`}>
                
                <span className={`${styles.SetSizes}`}>
                    <button className={viewState === 'desktop' ? styles.activeDevice : ''} onClick={() => setDeviceState('desktop')}>
                    <div className="tooltip">

                    <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25">
                        <path d="M336 936v-35l84-85H140q-24 0-42-18t-18-42V276q0-24 
                    18-42t42-18h680q24 0 42 18t18 42v480q0 24-18 42t-42 18H540l84 85v35H336ZM140 
                    660h680V276H140v384Zm0 0V276v384Z"/></svg>
                     <span className="tooltiptext">Desktop View</span>
                            </div>
                    </button>
                    <button className={viewState === 'tablet' ? styles.activeDevice : ''} onClick={() => setDeviceState('tablet')}>
                    <div className="tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20">
                        <path d="M260 1016q-24 0-42-18t-18-42V196q0-24 18-42t42-18h440q24 0 42 18t18 42v760q0 24-18 42t-42 
                        18H260Zm0-150v90h440v-90H260Zm220.175 75q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 
                        0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM260 
                    806h440V286H260v520Zm0-580h440v-30H260v30Zm0 640v90-90Zm0-640v-30 30Z"/></svg>
                         <span className="tooltiptext">Tablet View</span>
                    </div>

                    </button>
                    <button className={viewState === 'phone' ? styles.activeDevice : ''} onClick={() => setDeviceState('phone')}>
                    <div className="tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 96 960 960" width="15">
                        <path d="M260 1016q-24 0-42-18t-18-42V196q0-24 18-42t42-18h440q24 0 42 18t18 42v760q0 24-18 42t-42 
                    18H260Zm0-90v30h440v-30H260Zm0-60h440V286H260v580Zm0-640h440v-30H260v30Zm0 0v-30 30Zm0 700v30-30Z"/></svg>
                    <span className="tooltiptext">Phone View</span>
                            </div>
                    </button>
                    </span>
                    
                    
                   
                </div>
                
            </div>

            <div className="col-md-3">

            </div>
            { // for main editor
              !updateSection?.sectionEditEnable && !saveElementsData?.showElement &&
              <PageTopbar
                onRedo={onRedo}
                clonePage={clonePage}
                deletePage={deletePage}
                splitTest={splitTest}
                openTemplateSettings={openTemplateSettings}
                handlePreview={handlePreview}
                handleSave={handleSave}
                activeHighlight={activeHighlight}
                secRefs={secRefs}
                handleHighlight={handleHighlight}
              />
            }
            { // for Edit section    
              updateSection?.sectionEditEnable && !saveElementsData?.showElement &&
              <EditSectionTopbar 
                onRedo={onRedo} 
                activeHighlight={activeHighlight} 
                showElementInModal={showElementInModal} 
                openSettings={openSettings} 
                handleHighlight={handleHighlight} 
              />
            }
                
          </div>
        ):
        (<div></div>)
      }

      <div ref={mainContentRef} className={`${deviceCls} ${ENV.isViewReadOnly === false ? styles.mainContentBox : ""} page-editor-wrapper`} style={{ transform: "scale(1)", transformOrigin: "left top 0px", margin:"0 auto", padding:ENV.isViewReadOnly === false ? "5px":"", ...getTemplateStyle(templateCss) }} onDrop={(event) => dropSection(event)}>
        {/* <div ref={mainContentRef} className={`${styles[viewState]} ${ENV.isViewReadOnly === false ? styles.mainContentBox : ""}`} style={{ margin:"0 auto", padding:ENV.isViewReadOnly === false ? "5px":"", ...getTemplateStyle(templateCss) }} onDrop={(event) => dropSection(event)}> */}
        {
          sectionCtx?.length ?
          (
            sectionCtx?.map((secDat:any, sIndex:number) => {

              let sec = secDat;
              let _sectionId = secDat?.eleInfo?.props?.sectionId || "";

              // For my templates
              let isMytemplate = false;
              if(secDat?.eleInfo?.myTemplateId){
                if(myTemplatesCtx[secDat?.eleInfo?.myTemplateId]){
                  sec = myTemplatesCtx[secDat?.eleInfo?.myTemplateId];
                }else{
                  return;
                }
                isMytemplate = true;
                _sectionId = secDat?.eleInfo?.sectionId || "";
              }
              
              // For my overlay
              let isMyOverlay = false;
              if(secDat?.eleInfo?.myOverlayId){
                if(myOverlayCtx[secDat?.eleInfo?.myOverlayId]){
                  sec = myOverlayCtx[secDat?.eleInfo?.myOverlayId];
                }else{
                  return;
                }
                isMyOverlay = true;
                _sectionId = secDat?.eleInfo?.sectionId || "";
              }

              // Overlay component class generation 
              const isOverlay = sec?.eleInfo?.props?.isOverlay || false;
              const overlaySecCss = isOverlay ? (ENV.isViewReadOnly === false ? styles.overlayAbStyle : styles.overlayStyle) : "";
              const overlayHide = isOverlay && (hideOverlayArr.indexOf(sIndex) !== -1 || ENV.isViewReadOnly !== false) ? "overlay-hide" : "";
              const ovTglCls = isOverlay && ENV.isViewReadOnly === false ? "overlay-toggle-cls" : "";
              const overlayCrossEle = isOverlay ? <div style={{ color: secDat?.eleInfo?.ovXIconColor || "#fff" }} className="overlay-cross-icon"><div onClick={()=>closeOverlay(sIndex)} className="circle-with-cross" ></div></div> : <></>;
              const overlaySecContCss = isOverlay ? styles.overlayContStyle : "";
              let overlaySecPosCss = "";
              if(isOverlay && secDat?.eleInfo?.ovPosition){
                overlaySecPosCss = `overlay-${secDat?.eleInfo?.ovPosition}`;
              }
              let overlayMinWidth:any = {};
              let overlayMinHeight:any = {};
              if(isOverlay && secDat?.eleInfo?.ovPositionType === "popup"){
                overlayMinWidth = { minWidth: `${secDat?.eleInfo?.ovMinWidth}px` };
                overlayMinHeight = { minHeight: `${secDat?.eleInfo?.ovMinHeight}px` };
              }

              const sectionTooltipStr = "section_" + sIndex;

              // for My component
              if(ENV.isPackage){
                if(secDat?.eleInfo?.myComponentKey){
                  return (
                    <div id={secDat?.eleInfo?.sectionId || ""}><MainMyComponent componentName={secDat?.eleInfo?.myComponentKey} /></div>
                  )
                }
              }else{
                if(secDat?.eleInfo?.myComponentKey !== undefined){

                  if(!secDat?.eleInfo?.myComponentKey) return <></>;
  
                  return (
                    <section
                      key={sIndex+1} 
                      id={secDat?.eleInfo?.sectionId || ""}
                      className={`${styles.actionSectionContainerParent} highlight`} 
                      draggable={(selDragSection === sIndex && ENV.isViewReadOnly === false) ? "true":"false"} 
                      onDragLeave={(event:any) => onDragLeaveFromSection(event, sIndex)} 
                      onDragOver={(event) => onDragOverFromSection(event, sIndex)} 
                      onDragStart={(event:any) => dragSection(event, secDat, sIndex)} 
                      ref={(el) => (secRefs.current[sIndex] = el)}
                      onMouseLeave={(ev:any) => onMouseLeaveFromSec(ev)} 
                      onMouseOver={(ev:any) => onMouseOverFromSec(ev, sIndex, sectionTooltipStr)}
                    >
                      {sectionHoverIdx === sIndex && actionSectionComponent(sectionTooltipStr, secDat, sIndex, isMytemplate, isMyOverlay, true)}
                      <div className={`${styles.myCompContainer}`}>
                        <div className={`${styles.dragndropimg} ${styles.placehodlerMyComp}`}>
                          <h4 className={`${styles.myComph4}`}>Placeholder for "{secDat?.eleInfo?.myComponentName}"</h4>
                        </div>
                      </div>
                    </section>
                  )
                }
              }



              /////////////////////////////////////////////////////////////////////////////
              const animationStyleStrSec = sec?.eleInfo?.props?.style?.animationStyle ? `animate__${sec?.eleInfo?.props?.style?.animationStyle}` : "";
              const animationDelayStrSec = sec?.eleInfo?.props?.style?.animationDelay ? `animate__delay-${sec?.eleInfo?.props?.style?.animationDelay}s` : "";
              const animationDurationStrSec = sec?.eleInfo?.props?.style?.animationDuration ? `animate__duration-${sec?.eleInfo?.props?.style?.animationDuration}` : "";
              const animationIterationStrSec = sec?.eleInfo?.props?.style?.animationIteration ? `animate__repeat-${sec?.eleInfo?.props?.style?.animationIteration}` : "";

              const animationStrSec = `animate__animated ${animationStyleStrSec} ${animationDelayStrSec} ${animationDurationStrSec} ${animationIterationStrSec}`;
              const sectionStyleSelector = generateClassNameStr(sec?.eleInfo?.props?.styleClasses);

              const sectionHeightCls = sec?.eleInfo?.props?.isHeightClass ? styles.secHeight : "";

              // const sectionStyleSelector = sec?.eleInfo?.props?.styleSelctor ? sec?.eleInfo?.props?.styleSelctor:"";
              /////////////////////////////////////////////////////////////////////////////


              if(viewState === "phone" && sec?.eleInfo?.props?.mobileView && sec.eleInfo.props.mobileView === "false") return <></>;

              return (
                  <section
                    key={sIndex+1} 
                    id={_sectionId}
                    className={`${overlaySecCss} ${overlaySecPosCss} ${overlayHide} ${ovTglCls} ${sectionStyleSelector} ${styles.actionSectionContainerParent} ${animationStrSec} ${sectionHeightCls} section-print highlight`} 
                    style={{...overlayMinWidth, ...overlayMinHeight}}
                    draggable={(selDragSection === sIndex && ENV.isViewReadOnly === false) ? "true":"false"} 
                    onDragLeave={(event:any) => onDragLeaveFromSection(event, sIndex)} 
                    onDragOver={(event) => onDragOverFromSection(event, sIndex)} 
                    onDragStart={(event:any) => dragSection(event, secDat, sIndex)} 
                    ref={(el) => (secRefs.current[sIndex] = el)}
                    onMouseLeave={(ev:any) => onMouseLeaveFromSec(ev)} 
                    onMouseOver={(ev:any) => onMouseOverFromSec(ev, sIndex, sectionTooltipStr)}
                  >

                    {
                      // overlay intent display function
                      overlayDisplay(isOverlay, sIndex, secDat?.eleInfo?.ovShowOn, secDat?.eleInfo?.ovShowDelay)
                    }

                    {sectionHoverIdx === sIndex && actionSectionComponent(sectionTooltipStr, secDat, sIndex, isMytemplate, isMyOverlay)}
                    
                    {
                      sec?.elements?.length ?
                      sec?.elements?.map((eleData:any, eIdx:number) => {
                        const idxs = [];
                        idxs.push(eIdx);
                        return (
                          <div 
                            key={eIdx} 
                            className={`${overlaySecContCss} ${sec?.eleInfo?.props?.style?.contentWidth ? sec?.eleInfo?.props?.style?.contentWidth : "container"}`}
                          >
                            {
                              eleData.eleInfo?.type === "Grid" && 
                              <GridElements 
                                eleData={eleData} 
                                curEleSIndex={sIndex} 
                                parentIdx={1}
                                idxs={idxs}
                                gridIdx={eIdx}
                                viewState={viewState}
                                isMytemplate={isMytemplate}
                                isMyOverlay={isMyOverlay}
                              />
                            }
                            {overlayCrossEle}
                          </div>
                        )
                      }
                      )
                      :
                      (
                        ENV.isViewReadOnly === false &&
                        (
                          <div className={`${styles.dragndropimg}`}>
                            <img src={`${ENV.serverPath}images/dragndrop.png`} />
                          </div>
                        )
                      )
                    }                      
                  </section>
              )
            })
          )
          :
          (
            ENV.isViewReadOnly === false &&
            (<div className={`${styles.sectionContainer} ${styles.dragndropimg} highlight`} onDragLeave={(event:any) => onDragLeaveFromSection(event, 0)} onDragOver={(event) => onDragOverFromSection(event, 0)} >
              <img src={`${ENV.serverPath}images/dragndrop.png`} />
            </div>)
          )
        }
        <div key="section-extra-div" style={{ minHeight: `${extDivMinHeight}px` }}></div>
      </div>
        
    </Fragment>
  )
}

export default MainContent2;
