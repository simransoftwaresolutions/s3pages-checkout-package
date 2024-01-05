import { Fragment } from 'react'
import { useRef } from "react";
import ButtonUI from '../../button/ui/ButtonUI';
import HeadingUI from '../../heading/ui/HeadingUI';
import ProgressUI from '../../progress/ui/ProgressUI';
import SocialIconUI from '../../socialIcon/ui/SocialIconUI';
import SeparatorUI from '../../separator/ui/SeparatorUI';
import MenuUI from '../../menu/ui/MenuUI';
import TimerUI from '../../timer/ui/TimerUI';
import HtmlUI from '../../html/ui/HtmlUI';
import ImageUI from '../../image/ui/ImageUI';
import VideoUI from '../../video/ui/VideoUI';
import FormUI from '../../form/ui/FormUI';
import FaqUI from '../../faq/ui/FaqUI';
import BannerUI from '../../banner/ui/BannerUI';
import {  getElementName, deepCloneArray, generateClassNameStr } from '../../../../../utils/functions';
import styles from '../../../../../styles/editorui/MainContent.module.css';
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useSettingsCtx } from "../../../../../context/editorui/SettingsContext";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ENV from '../../../../../utils/env';
import { useContentCtx } from "../../../../../context/editorui/ContentsContext";
import { usePagesCtx } from '../../../../../context/editorui/PagesContext';

interface Prop {
  parentIdx:number;
  gridEle?:number;
  gridMatrix?:[];
  curEleSIndex:number;
  eleData?:any;
  viewState?:any;
  idxs?:number[];
  gridIdx?:number;
  isMytemplate?:boolean;
  isMyOverlay?:boolean;
  handleDelete?: (idx:number, idxArr:[], curEleSIndex:number) => void;
  handleClone?: (idx:number, idxArr:[], data:any, curEleSIndex:number) => void;
  handleSaveElements?: (type:string, data:any) => void;
  onDragLeaveFromGrid?: (ev:any, elePointer:string, type:string, gridRefs:any, gridEleRefs:any) => void;
  onDragOverFromGrid?: (ev:any, sIdx:number, gridIdxs:[], type:string, elePointer:string, isMytemplate:boolean, isMyOverlay:boolean, gridRefs:any, gridEleRefs:any) => void;
  onDragStartFromElement?: (ev:any, type:string, eleIdxs:any, data:any, curEleSIndex:number, isMytemplate:boolean, isMyOverlay:boolean) => void;
}

const GridUI = ({ 
  isMyOverlay, 
  isMytemplate, 
  gridIdx, 
  viewState, 
  idxs, 
  eleData, 
  parentIdx, 
  gridEle, 
  gridMatrix, 
  curEleSIndex, 
  handleDelete,
  handleClone,
  handleSaveElements,
  onDragLeaveFromGrid,
  onDragOverFromGrid,
  onDragStartFromElement,
}:Prop) => {

  const gridEleRefs = useRef<any>([]);
  const gridRefs = useRef<any>([]);
  const gridRowRef = useRef<any>(null);
  const { setIsSettingsOpen } = useSettingsCtx();
  const { saveElementsData, setSaveElementsData, queryData } = usePagesCtx();
  const { contentAction, setContentAction, changeStyleOfElement, setChangeStyleOfElement } = useContentCtx();

  const enableDrag = (idx:number) => {
    setContentAction({...contentAction, draggableEleIdx:idx});
  }

  const openSettings = (type:string, idxArr:[], data:any) => {
    const _settingData = {
      from:"",
      data:data,
      sectionIdx:curEleSIndex,
      elementIdxs:idxArr,
      type:type,
    }

    setChangeStyleOfElement({...changeStyleOfElement, ..._settingData});
    setIsSettingsOpen(true);
  }

  const actionElementComponent = (type:string, eleIdx:number, idxArr:[], data:any, tooltipStr:string) => {

    let showTooltip:boolean = true;
    if(contentAction.tooltipEnableString !== tooltipStr) showTooltip = false;

    if(ENV.isViewReadOnly === false && queryData?.siteType === "themesite" && saveElementsData?.showElement){
      return (
        <span className={`${styles.actionGridContainerChild} ${styles.noBorder}`}>
        <span className={styles.heading}><b>{getElementName(type)}</b></span>
        <SettingsOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>openSettings(type, idxArr, data)}/>
        <SaveOutlinedIcon fontSize="medium" data-bs-toggle="modal" data-bs-target="#saveElesModal" onClick={()=>{if(handleSaveElements) handleSaveElements(type, data)}} />
      </span>
      )      
    }

    if(ENV.isViewReadOnly === false && queryData?.siteType === "themesite"){
      return (
        <span className={`${styles.actionGridContainerChild} ${styles.noBorder}`}>
        <span className={styles.heading}><b>{getElementName(type)}</b></span>
        <OpenWithOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onMouseDown={()=>enableDrag(eleIdx)} />
        <SettingsOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>openSettings(type, idxArr, data)}/>
        <FileCopyOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>{if(handleClone) handleClone(eleIdx, idxArr, data, curEleSIndex)}}/>
        <SaveOutlinedIcon fontSize="medium" data-bs-toggle="modal" data-bs-target="#saveElesModal" onClick={()=>{if(handleSaveElements)handleSaveElements(type, data)}} />
        <DeleteForeverOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>{if(handleDelete) handleDelete(eleIdx, idxArr, curEleSIndex)}}/>
      </span>
      )      
    }

    return (
      ENV.isViewReadOnly === false && showTooltip ?
      (
        <span className={`${styles.actionGridContainerChild} ${styles.noBorder}`}>
          <span className={styles.heading}><b>{getElementName(type)}</b></span>
          <OpenWithOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onMouseDown={()=>enableDrag(eleIdx)} />
          <SettingsOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>openSettings(type, idxArr, data)}/>
          <FileCopyOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>{if(handleClone) handleClone(eleIdx, idxArr, data, curEleSIndex)}}/>
          <DeleteForeverOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>{if(handleDelete) handleDelete(eleIdx, idxArr, curEleSIndex)}}/>
        </span>
      ):(
        <></>
      )

    )
  }

  const actionGridRowComponent = (type:string, eleIdx:number, idxArr:any, data:any, tooltipStr:string) => {

    let showTooltip:boolean = true;
    if(contentAction.tooltipEnableString !== tooltipStr) showTooltip = false;

    return (
      ENV.isViewReadOnly === false && showTooltip && !saveElementsData?.showElement ?
      (
        <span className={`${styles.actionGridRowContainerChild} ${styles.noBorder}`}>
          <span className={styles.heading}><b>{getElementName(type)}</b></span>
          <OpenWithOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onMouseDown={()=>enableDrag(eleIdx)} />
          <SettingsOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>openSettings(type, idxArr, data)}/>
          <FileCopyOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>{if(handleClone) handleClone(eleIdx, idxArr, data, curEleSIndex)}}/>
          <DeleteForeverOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>{if(handleDelete) handleDelete(eleIdx, idxArr, curEleSIndex)}}/>
        </span>
      ):(
        <></>
      )

    )
  }

  const actionColumnComponent = (type:string, eleIdx:number, idxArr:[], data:any, tooltipStr:string) => {

    let showTooltip:boolean = true;
    if(contentAction.tooltipEnableString !== tooltipStr) showTooltip = false;

    return (
      ENV.isViewReadOnly === false && showTooltip && !saveElementsData?.showElement ?
      (
        <span className={`${styles.actionColumnContainerChild} ${styles.noBorder}`}>
          <span className={styles.heading}><b>{getElementName(type)}</b></span>
          <SettingsOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>openSettings(type, idxArr, data)}/>
          <FileCopyOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>{if(handleClone) handleClone(eleIdx, idxArr, data, curEleSIndex)}}/>
          <DeleteForeverOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>{if(handleDelete) handleDelete(eleIdx, idxArr, curEleSIndex)}}/>
        </span>
      ):(
        <></>
      )

    )
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const onMouseLeaveFromGrid = (ev:any) => {
    ev.stopPropagation();
    removeAllHover();    
  }
  const onMouseLeaveFromElement = (ev:any) => {
    ev.stopPropagation();
    setContentAction({...contentAction, tooltipEnableString:""});
    removeAllHover();    
  }
  const onMouseOverFromGrid = (ev:any, pointer:string, tooltipStr:string) => {
    ev.stopPropagation();
    removeAllHover();
    if(isMytemplate || isMyOverlay) return;

    setContentAction({...contentAction, tooltipEnableString:tooltipStr});
    if(ENV.isViewReadOnly === false){
      gridRefs?.current[pointer]?.classList.add('drag-over');
    }
  }
  const onMouseOverFromGridRow = (ev:any, pointer:string, tooltipStr:string) => {
    ev.stopPropagation();
    removeAllHover();
    if(isMytemplate || isMyOverlay) return;

    setContentAction({...contentAction, tooltipEnableString:tooltipStr});
    if(ENV.isViewReadOnly === false){
      gridRowRef?.current?.classList.add('drag-over');
    }
  }
  const onMouseOverFromElement = (ev:any, pointer:string, tooltipStr:string) => {
    ev.preventDefault();
    ev.stopPropagation();
    removeAllHover();
    if(isMytemplate || isMyOverlay) return;

    setContentAction({...contentAction, tooltipEnableString:tooltipStr});
    if(ENV.isViewReadOnly === false){
      gridEleRefs?.current[pointer]?.classList.add('drag-over');
    }
  }
  const removeAllHover = () => {
    
    const elements = document.querySelectorAll(".drag-over");
    if(elements.length > 0){
      for(let i=0;i<elements.length;i++){
        elements[i].classList.remove('drag-over');
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////


  const gridRefIdx = "gridrow_" + curEleSIndex + "_" + parentIdx + "_" + JSON.stringify(idxs); 
  const gridIndex = idxs && idxs?.length ? idxs[idxs?.length-1] : 0;

  /////////////////////////////////////////////////////////////////////////////
  const animationStyleStrGrid = eleData?.eleInfo?.props?.style?.animationStyle ? `animate__${eleData?.eleInfo?.props?.style?.animationStyle}` : "";
  const animationDelayStrGrid = eleData?.eleInfo?.props?.style?.animationDelay ? `animate__delay-${eleData?.eleInfo?.props?.style?.animationDelay}s` : "";
  const animationDurationStrGrid = eleData?.eleInfo?.props?.style?.animationDuration ? `animate__duration-${eleData?.eleInfo?.props?.style?.animationDuration}` : "";
  const animationIterationStrGrid = eleData?.eleInfo?.props?.style?.animationIteration ? `animate__repeat-${eleData?.eleInfo?.props?.style?.animationIteration}` : "";

  const animationStrGrid = `animate__animated ${animationStyleStrGrid} ${animationDelayStrGrid} ${animationDurationStrGrid} ${animationIterationStrGrid}`;
  /////////////////////////////////////////////////////////////////////////////

  if(viewState === "phone" && eleData?.eleInfo?.props?.mobileView && eleData.eleInfo.props.mobileView === "false") return <></>;

  const hAlignForGrid = eleData?.eleInfo?.props?.style?.horizontalAlign ? eleData?.eleInfo?.props?.style?.horizontalAlign : "";
  const vAlignForGrid = eleData?.eleInfo?.props?.style?.verticalAlign ? eleData?.eleInfo?.props?.style?.verticalAlign : "";

  const styleSelectorName = generateClassNameStr(eleData?.eleInfo?.props?.styleClasses);
  return <Fragment>
    {
      <div 
        style={{padding:"10px"}}
        ref={gridRowRef} 
        className={` ${styleSelectorName} row ${hAlignForGrid} ${vAlignForGrid} highlight ${styles.actionGridRowContainerParent} ${animationStrGrid}`} 
        draggable={(contentAction?.draggableEleIdx === gridIndex && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
        onDragStart={(ev:any)=>{if(onDragStartFromElement) onDragStartFromElement(ev, eleData?.eleInfo.type, idxs, eleData, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
        onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
        onMouseOver={(ev:any) => onMouseOverFromGridRow(ev, gridRefIdx, gridRefIdx)}
      >
        {contentAction?.tooltipEnableString === gridRefIdx && !isMytemplate && !isMyOverlay && actionGridRowComponent(eleData?.eleInfo.type, gridIndex, idxs, eleData, gridRefIdx)}
        {
          eleData?.elements?.length ? eleData?.elements?.map((grid:any, gIdx:any) => {

            /////////////////////////////////////////////////
            let gridRefIndex = "grid_" + curEleSIndex + "_" + parentIdx + "_" + gridIdx + "_" + gIdx;
            const gridIdxs = deepCloneArray(idxs);
            gridIdxs.push(gIdx);

            const eGRefStr = gridIdxs.join("_");
            if(eGRefStr) gridRefIndex = `${gridRefIndex}${eGRefStr}`;
            /////////////////////////////////////////////////

            if(viewState === "phone" && grid?.eleInfo?.props?.mobileView && grid.eleInfo.props.mobileView === "false") return <></>;
            
            const hAlignForCol = grid?.eleInfo?.props?.style?.horizontalAlign ? grid?.eleInfo?.props?.style?.horizontalAlign : "";
            const vAlignForCol = grid?.eleInfo?.props?.style?.verticalAlign ? grid?.eleInfo?.props?.style?.verticalAlign : "";

            const styleSelectorNameForCol = generateClassNameStr(grid?.eleInfo?.props?.styleClasses);
            return (
              <div 
                ref={(el:any) => (gridRefs.current[gridRefIndex] = el)} 
                key={gIdx} 
                className={`${styleSelectorNameForCol} ${vAlignForCol} ${grid.eleInfo?.props?.cssClass} ${styles.actionColumnContainerParent} act-clm-cnt-pnt-gb highlight`} 
                onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, gridRefIndex, grid.eleInfo.type, gridRefs, gridEleRefs)}} 
                onDragOver={(event) => { if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, gridIdxs, grid.eleInfo.type, gridRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                onMouseOver={(ev:any) => onMouseOverFromGrid(ev, gridRefIndex, gridRefIndex)}  
              >
                {contentAction?.tooltipEnableString === gridRefIndex && !isMytemplate && !isMyOverlay && actionColumnComponent(grid?.eleInfo.type, gIdx, gridIdxs, grid, gridRefIndex)}
                {
                  grid?.elements?.length ? 
                  grid?.elements.map((gEle:any, eIdx:number) => {

                    /////////////////////////////////////////////////
                    const eleIdxs = deepCloneArray(gridIdxs);
                    eleIdxs.push(eIdx);
                    let eleRefIndex = "gridele_" + curEleSIndex + "_" + parentIdx+ "_" + gridIdx + "_" + gIdx + "_" + eIdx;

                    const eRefStr = eleIdxs.join("_");
                    if(eRefStr) eleRefIndex = `${eleRefIndex}${eRefStr}`;
                    /////////////////////////////////////////////////

                    const animationStyleStr = gEle?.eleInfo?.props?.style?.animationStyle ? `animate__${gEle?.eleInfo?.props?.style?.animationStyle}` : "";
                    const animationDelayStr = gEle?.eleInfo?.props?.style?.animationDelay ? `animate__delay-${gEle?.eleInfo?.props?.style?.animationDelay}s` : "";
                    const animationDurationStr = gEle?.eleInfo?.props?.style?.animationDuration ? `animate__duration-${gEle?.eleInfo?.props?.style?.animationDuration}` : "";
                    const animationIterationStr = gEle?.eleInfo?.props?.style?.animationIteration ? `animate__repeat-${gEle?.eleInfo?.props?.style?.animationIteration}` : "";

                    const animationStr = `animate__animated ${animationStyleStr} ${animationDelayStr} ${animationDurationStr} ${animationIterationStr}`;

                    if(viewState === "phone" && gEle?.eleInfo?.props?.mobileView && gEle.eleInfo.props.mobileView === "false") return <></>;
                    switch(gEle?.eleInfo.type){
                      case 'Button':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={(contentAction?.draggableEleIdx === eIdx && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
                                onDragStart={(ev:any)=> {if(onDragStartFromElement) onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
                                onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type, gridRefs, gridEleRefs)}} 
                                onDragOver={(event) => { if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                                onMouseLeave={(ev:any) => onMouseLeaveFromElement(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            { !isMytemplate && !isMyOverlay && actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <ButtonUI refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Progress':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={(contentAction?.draggableEleIdx === eIdx && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
                                onDragStart={(ev:any)=> {if(onDragStartFromElement) onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
                                onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type, gridRefs, gridEleRefs)}} 
                                onDragOver={(event) => { if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            { !isMytemplate && !isMyOverlay && actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <ProgressUI refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'SocialIcon':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={(contentAction?.draggableEleIdx === eIdx && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
                                onDragStart={(ev:any)=> {if(onDragStartFromElement) onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
                                onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type, gridRefs, gridEleRefs)}} 
                                onDragOver={(event) => { if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            { !isMytemplate && !isMyOverlay && actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <SocialIconUI refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Separator':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={(contentAction?.draggableEleIdx === eIdx && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
                                onDragStart={(ev:any)=> {if(onDragStartFromElement) onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
                                onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type, gridRefs, gridEleRefs)}} 
                                onDragOver={(event) => { if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            { !isMytemplate && !isMyOverlay && actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <SeparatorUI refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Menu':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={(contentAction?.draggableEleIdx === eIdx && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
                                onDragStart={(ev:any)=> {if(onDragStartFromElement) onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
                                onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type, gridRefs, gridEleRefs)}} 
                                onDragOver={(event) => { if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            { !isMytemplate && !isMyOverlay && actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <MenuUI refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Timer':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={(contentAction?.draggableEleIdx === eIdx && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
                                onDragStart={(ev:any)=> {if(onDragStartFromElement) onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
                                onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type, gridRefs, gridEleRefs)}} 
                                onDragOver={(event) =>{ if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            { !isMytemplate && !isMyOverlay && actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <TimerUI refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Html':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={(contentAction?.draggableEleIdx === eIdx && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
                                onDragStart={(ev:any)=> {if(onDragStartFromElement) onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
                                onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type, gridRefs, gridEleRefs)}} 
                                onDragOver={(event) => { if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            { !isMytemplate && !isMyOverlay && actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <HtmlUI refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Image':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={(contentAction?.draggableEleIdx === eIdx && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
                                onDragStart={(ev:any)=> {if(onDragStartFromElement) onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
                                onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type, gridRefs, gridEleRefs)}} 
                                onDragOver={(event) => { if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            { !isMytemplate && !isMyOverlay && actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <ImageUI refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Video':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={(contentAction?.draggableEleIdx === eIdx && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
                                onDragStart={(ev:any)=> {if(onDragStartFromElement) onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
                                onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type, gridRefs, gridEleRefs)}} 
                                onDragOver={(event) => { if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            { !isMytemplate && !isMyOverlay && actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <VideoUI refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Form':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={(contentAction?.draggableEleIdx === eIdx && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
                                onDragStart={(ev:any)=> {if(onDragStartFromElement) onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
                                onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type, gridRefs, gridEleRefs)}} 
                                onDragOver={(event) => { if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            { !isMytemplate && !isMyOverlay && actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <FormUI refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Heading':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={(contentAction?.draggableEleIdx === eIdx && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
                                onDragStart={(ev:any)=> {if(onDragStartFromElement) onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
                                onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type, gridRefs, gridEleRefs)}} 
                                onDragOver={(event) => { if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            { !isMytemplate && !isMyOverlay && actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <HeadingUI isMyOverlay={isMyOverlay} isMytemplate={isMytemplate} curEleSIndex={curEleSIndex} gridIdxs={eleIdxs} headEleIdx={eleRefIndex} refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                      case 'Faq':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={(contentAction?.draggableEleIdx === eIdx && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
                                onDragStart={(ev:any)=> {if(onDragStartFromElement) onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
                                onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type, gridRefs, gridEleRefs)}} 
                                onDragOver={(event) => { if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            { !isMytemplate && !isMyOverlay && actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <FaqUI refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                        case 'Banner':
                          return <div 
                                  className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                  key={eIdx+1} 
                                  draggable={(contentAction?.draggableEleIdx === eIdx && (ENV.isViewReadOnly === false || !isMytemplate || !isMyOverlay)) ? "true" : "false"}
                                  onDragStart={(ev:any)=> {if(onDragStartFromElement) onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle, curEleSIndex, isMytemplate||false, isMyOverlay||false)}}
                                  onDragLeave={(event:any) => {if(onDragLeaveFromGrid) onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type, gridRefs, gridEleRefs)}} 
                                  onDragOver={(event) => { if(onDragOverFromGrid) onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex, isMytemplate||false, isMyOverlay||false, gridRefs, gridEleRefs)}}
                                  onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                  onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                                >
                            <Fragment>
                              { !isMytemplate && !isMyOverlay && actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                              <BannerUI eIdx={eIdx} refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                            </Fragment>                          
                          </div>
                          break;
                        case 'Grid':
                          const innerGridMatrix = (gridMatrix !== undefined) ? deepCloneArray(gridMatrix):[];
                          innerGridMatrix.push([gridEle, gIdx]);
                          return <span key={eIdx+1}> 
                            <div>
                              <GridUI 
                                gridIdx={eIdx} 
                                viewState={viewState} 
                                idxs={eleIdxs} 
                                eleData={gEle} 
                                curEleSIndex={curEleSIndex} 
                                parentIdx={parentIdx+1}
                                isMytemplate={isMytemplate}
                                isMyOverlay={isMyOverlay}
                                handleClone={handleClone}
                                handleDelete={handleDelete}
                                handleSaveElements={handleSaveElements}
                                onDragLeaveFromGrid={onDragLeaveFromGrid}
                                onDragOverFromGrid={onDragOverFromGrid}
                                onDragStartFromElement={onDragStartFromElement}
                              />
                            </div>
                          </span>
                          break;
                    }
                  })
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
              </div>
            )
          }):
          (
            ENV.isViewReadOnly === false &&
            (<div className={`${styles.dragndropimg}`}>
              <img src={`${ENV.serverPath}images/dragndrop.png`} />
            </div>)
          )  
        }
      </div>      
    }
  </Fragment>
}

export default GridUI;
