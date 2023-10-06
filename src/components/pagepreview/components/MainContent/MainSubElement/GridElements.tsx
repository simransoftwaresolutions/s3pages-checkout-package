// import type { NextPage } from 'next'
import { Fragment } from 'react'
import { useState, useEffect, useRef } from "react";
import { 
  ButtonElements, 
  HeadingElements, 
  ProgressElements,
  SocialIconElements, 
  SeparatorElements, 
  MenuElements, 
  TimerElements, 
  HtmlElements, 
  ImageElements,
  VideoElements, 
  FormElements, 
  FaqElements, 
  BannerElements, 
} from './index';
import {  getElementName, 
          deepCloneArray, 
          getHoveredElement, 
          getDraggedElement, 
          getChangeStyleOfElement,
          generateClassNameStr,
        } from '../../../../../utils/functions';
import styles from '../../../../../styles/pagepreview/MainContent.module.css';
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
// import SaveElement from 'services/SaveElement';
import ENV from '../../../../../utils/env';
// import * as htmlToImage from 'html-to-image';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';

interface Prop {
  type?:string;
  props?:any;
  gridData?:any;
  parentIdx:number;
  width?:number;
  gridEle?:number;
  gridMatrix?:[];
  curEleSIndex:number;
  curEleCIndex?:number;
  refBtn?:any;
  columns?:any;
  eleData?:any;
  viewState?:any;
  idxs?:number[];
  gridIdx?:number;
  // onClick:()=>void;
}

const GridElements = ({ gridIdx, viewState, idxs, eleData, columns, type, props, gridData, parentIdx, width, gridEle, gridMatrix, curEleSIndex, curEleCIndex = 0, refBtn}:Prop) => {

  const gridEleRefs = useRef<any>([]);
  const gridRefs = useRef<any>([]);
  const gridRowRef = useRef<any>(null);
  const { selectedMainTools, setSelectedMainTools, setIsSettingsOpen } = useSettingsCtx();
  const { saveElementsData, setSaveElementsData, queryData } = usePagesCtx();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    draggedElement, 
    setDraggedElement, 
    hoveredElement, 
    setHoveredElement,
    contentAction,
    setContentAction,
    sectionCtx,
    setSectionCtx,
    changeStyleOfElement,
    setChangeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    
    if(ENV.isViewReadOnly === true){
      // setSelGridDragEle(-1);
    }

  }, [ENV.isViewReadOnly]);

  const enableDrag = (idx:number) => {
    setContentAction({...contentAction, draggableEleIdx:idx});
  }

  const handleDelete = (idx:number, idxArr:[]) => {
    const _delSectionsCtx = deepCloneArray(sectionCtx);
    const _delArrLength = idxArr.length-1;
    let delTemp = [];
    let _delTemp = _delSectionsCtx[curEleSIndex];
    delTemp.push(_delTemp);
    for(let i=0; i<_delArrLength; i++){ // loop for pointing Element
      delTemp[i+1] = delTemp[i].elements[idxArr[i]];
    }
    delTemp[delTemp.length-1].elements.splice(idx, 1);
    setSectionCtx(_delSectionsCtx);
    if(JSON.stringify(changeStyleOfElement.elementIdxs) === JSON.stringify(idxArr)){ // close setting popup if element is deleted
      setChangeStyleOfElement({...changeStyleOfElement, ...getChangeStyleOfElement});
      setIsSettingsOpen(false);
    }
  }

  const handleClone = (idx:number, idxArr:[], data:any) => {
    const _cloneSectionsCtx = deepCloneArray(sectionCtx);
    const _cloneArrLength = idxArr.length-1;
    let cloneTemp = [];
    let _cloneTemp = _cloneSectionsCtx[curEleSIndex];
    cloneTemp.push(_cloneTemp);
    for(let i=0; i<_cloneArrLength; i++){ // loop for pointing Element
      cloneTemp[i+1] = cloneTemp[i].elements[idxArr[i]];
    }
    cloneTemp[cloneTemp.length-1].elements.push(data);
    setSectionCtx(_cloneSectionsCtx);
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

  const handleSaveElements = (type:string, data:any) => {
    const siteId = queryData?.funnelId;
    const themeId = queryData?.funnelId;
    setSaveElementsData({...saveElementsData, action:"create", data:data, siteId:siteId, themeId:themeId, type:type, tags:type});
  }

  const actionElementComponent = (type:string, eleIdx:number, idxArr:[], data:any, tooltipStr:string) => {

    let showTooltip:boolean = true;
    if(contentAction.tooltipEnableString !== tooltipStr) showTooltip = false;

    if(ENV.isViewReadOnly === false && queryData?.siteType === "themesite" && saveElementsData?.showElement){
      return (
        <span className={`${styles.actionGridContainerChild} ${styles.noBorder}`}>
        <span className={styles.heading}><b>{getElementName(type)}</b></span>
        <SettingsOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>openSettings(type, idxArr, data)}/>
        <SaveOutlinedIcon fontSize="medium" data-bs-toggle="modal" data-bs-target="#saveElesModal" onClick={()=>handleSaveElements(type, data)} />
      </span>
      )      
    }

    if(ENV.isViewReadOnly === false && queryData?.siteType === "themesite"){
      return (
        <span className={`${styles.actionGridContainerChild} ${styles.noBorder}`}>
        <span className={styles.heading}><b>{getElementName(type)}</b></span>
        <OpenWithOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onMouseDown={()=>enableDrag(eleIdx)} />
        <SettingsOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>openSettings(type, idxArr, data)}/>
        <FileCopyOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>handleClone(eleIdx, idxArr, data)}/>
        <SaveOutlinedIcon fontSize="medium" data-bs-toggle="modal" data-bs-target="#saveElesModal" onClick={()=>handleSaveElements(type, data)} />
        <DeleteForeverOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>handleDelete(eleIdx, idxArr)}/>
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
          <FileCopyOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>handleClone(eleIdx, idxArr, data)}/>
          <DeleteForeverOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>handleDelete(eleIdx, idxArr)}/>
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
          <FileCopyOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>handleClone(eleIdx, idxArr, data)}/>
          <DeleteForeverOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>handleDelete(eleIdx, idxArr)}/>
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
          <FileCopyOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>handleClone(eleIdx, idxArr, data)}/>
          <DeleteForeverOutlinedIcon className={`${styles.noBorder}`} fontSize="medium" onClick={()=>handleDelete(eleIdx, idxArr)}/>
        </span>
      ):(
        <></>
      )

    )
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  const onDragLeaveFromGrid = (ev:any, elePointer:string, type:string) => {
    if(draggedElement.type === "Section") return;
    ev.preventDefault();
    ev.stopPropagation();

    if(ENV.isViewReadOnly === false){
      if(type === "Column") gridRefs?.current[elePointer]?.classList.remove('drag-highlight');
      if(type !== "Column" && type !== "Grid") gridEleRefs?.current[elePointer]?.classList.remove('drag-highlight');
    }

    setHoveredElement({...hoveredElement, ...getHoveredElement});

  }
  const onDragOverFromGrid = (ev:any, sIdx:number, gridIdxs:[], type:string, elePointer:string) => {

    if(draggedElement.type === "Section") return;
    ev.preventDefault();
    ev.stopPropagation();

    if(ENV.isViewReadOnly === false){
      if(type === "Column") gridRefs?.current[elePointer]?.classList.add('drag-highlight');
      if(type !== "Column" && type !== "Grid") gridEleRefs?.current[elePointer]?.classList.add('drag-highlight');
    }

    const _hoveredElement = {
      sectionIdx:sIdx,
      elementIdxs:gridIdxs,
      type:type,
    }

    setHoveredElement({...hoveredElement, ..._hoveredElement});
  }

  const onDragStartFromElement = (ev:any, type:string, eleIdxs:any, data:any) => {
    ev.stopPropagation();
    const _element = {
      from:"main_content",
      data:data,
      sectionIdx:curEleSIndex,
      elementIdxs:eleIdxs,
      type:type,
    }

    setDraggedElement({...draggedElement, ..._element});
  }
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

    setContentAction({...contentAction, tooltipEnableString:tooltipStr});
    if(ENV.isViewReadOnly === false){
      gridRefs?.current[pointer]?.classList.add('drag-over');
    }
  }
  const onMouseOverFromGridRow = (ev:any, pointer:string, tooltipStr:string) => {
    ev.stopPropagation();
    removeAllHover();

    setContentAction({...contentAction, tooltipEnableString:tooltipStr});
    if(ENV.isViewReadOnly === false){
      gridRowRef?.current?.classList.add('drag-over');
    }
  }
  const onMouseOverFromElement = (ev:any, pointer:string, tooltipStr:string) => {
    ev.preventDefault();
    ev.stopPropagation();
    removeAllHover();

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
        // style={{...generateGridStyle(eleData.eleInfo.props), padding:"10px"}}
        ref={gridRowRef} 
        className={` ${styleSelectorName} row ${hAlignForGrid} ${vAlignForGrid} highlight ${styles.actionGridRowContainerParent} ${animationStrGrid}`} 
        draggable={contentAction?.draggableEleIdx === gridIndex ? "true" : "false"}
        onDragStart={(ev:any)=>onDragStartFromElement(ev, eleData?.eleInfo.type, idxs, eleData)}
        onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
        onMouseOver={(ev:any) => onMouseOverFromGridRow(ev, gridRefIdx, gridRefIdx)}
      >
        {contentAction?.tooltipEnableString === gridRefIdx && actionGridRowComponent(eleData?.eleInfo.type, gridIndex, idxs, eleData, gridRefIdx)}
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
                className={`${styleSelectorNameForCol} ${vAlignForCol} ${grid.eleInfo?.props?.cssClass} ${styles.actionColumnContainerParent} highlight`} 
                onDragLeave={(event:any) => onDragLeaveFromGrid(event, gridRefIndex, grid.eleInfo.type)} 
                onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, gridIdxs, grid.eleInfo.type, gridRefIndex)}
                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                onMouseOver={(ev:any) => onMouseOverFromGrid(ev, gridRefIndex, gridRefIndex)}  
              >
                {contentAction?.tooltipEnableString === gridRefIndex && actionColumnComponent(grid?.eleInfo.type, gIdx, gridIdxs, grid, gridRefIndex)}
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
                                draggable={contentAction?.draggableEleIdx === eIdx ? "true" : "false"}
                                onDragStart={(ev:any)=>onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle)}
                                onDragLeave={(event:any) => onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type)} 
                                onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex)}
                                onMouseLeave={(ev:any) => onMouseLeaveFromElement(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            {actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <ButtonElements refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Progress':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={contentAction?.draggableEleIdx === eIdx ? "true" : "false"}
                                onDragStart={(ev:any)=>onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle)}
                                onDragLeave={(event:any) => onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type)} 
                                onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex)}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            {actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <ProgressElements refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'SocialIcon':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={contentAction?.draggableEleIdx === eIdx ? "true" : "false"}
                                onDragStart={(ev:any)=>onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle)}
                                onDragLeave={(event:any) => onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type)} 
                                onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex)}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            {actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <SocialIconElements refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Separator':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={contentAction?.draggableEleIdx === eIdx ? "true" : "false"}
                                onDragStart={(ev:any)=>onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle)}
                                onDragLeave={(event:any) => onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type)} 
                                onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex)}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            {actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <SeparatorElements refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Menu':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={contentAction?.draggableEleIdx === eIdx ? "true" : "false"}
                                onDragStart={(ev:any)=>onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle)}
                                onDragLeave={(event:any) => onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type)} 
                                onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex)}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            {actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <MenuElements refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Timer':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={contentAction?.draggableEleIdx === eIdx ? "true" : "false"}
                                onDragStart={(ev:any)=>onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle)}
                                onDragLeave={(event:any) => onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type)} 
                                onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex)}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            {actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <TimerElements refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Html':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={contentAction?.draggableEleIdx === eIdx ? "true" : "false"}
                                onDragStart={(ev:any)=>onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle)}
                                onDragLeave={(event:any) => onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type)} 
                                onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex)}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            {actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <HtmlElements refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Image':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={contentAction?.draggableEleIdx === eIdx ? "true" : "false"}
                                onDragStart={(ev:any)=>onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle)}
                                onDragLeave={(event:any) => onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type)} 
                                onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex)}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            {actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <ImageElements refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Video':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={contentAction?.draggableEleIdx === eIdx ? "true" : "false"}
                                onDragStart={(ev:any)=>onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle)}
                                onDragLeave={(event:any) => onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type)} 
                                onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex)}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            {actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <VideoElements refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Form':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={contentAction?.draggableEleIdx === eIdx ? "true" : "false"}
                                onDragStart={(ev:any)=>onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle)}
                                onDragLeave={(event:any) => onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type)} 
                                onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex)}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            {actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <FormElements refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                      case 'Heading':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={contentAction?.draggableEleIdx === eIdx ? "true" : "false"}
                                onDragStart={(ev:any)=>onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle)}
                                onDragLeave={(event:any) => onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type)} 
                                onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex)}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            {actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <HeadingElements curEleSIndex={curEleSIndex} gridIdxs={eleIdxs} headEleIdx={eleRefIndex} refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                      case 'Faq':
                        return <div 
                                className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                key={eIdx+1} 
                                draggable={contentAction?.draggableEleIdx === eIdx ? "true" : "false"}
                                onDragStart={(ev:any)=>onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle)}
                                onDragLeave={(event:any) => onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type)} 
                                onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex)}
                                onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                              >
                          <Fragment>
                            {actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                            <FaqElements refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                          </Fragment>                          
                        </div>
                        break;
                        case 'Banner':
                          return <div 
                                  className={`${styles.actionGridContainerParent} ${animationStr}`} 
                                  key={eIdx+1} 
                                  draggable={contentAction?.draggableEleIdx === eIdx ? "true" : "false"}
                                  onDragStart={(ev:any)=>onDragStartFromElement(ev, gEle?.eleInfo.type, eleIdxs, gEle)}
                                  onDragLeave={(event:any) => onDragLeaveFromGrid(event, eleRefIndex, gEle.eleInfo.type)} 
                                  onDragOver={(event) => onDragOverFromGrid(event, curEleSIndex, eleIdxs, gEle.eleInfo.type, eleRefIndex)}
                                  onMouseLeave={(ev:any) => onMouseLeaveFromGrid(ev)} 
                                  onMouseOver={(ev:any) => onMouseOverFromElement(ev, eleRefIndex, eleRefIndex)}
                                >
                            <Fragment>
                              {actionElementComponent(gEle?.eleInfo.type, eIdx, eleIdxs, gEle, eleRefIndex)}
                              <BannerElements eIdx={eIdx} refBtn={(el:any) => (gridEleRefs.current[eleRefIndex] = el)} type={gEle?.eleInfo.type} props={gEle.eleInfo.props} />
                            </Fragment>                          
                          </div>
                          break;
                        case 'Grid':
                          const innerGridMatrix = (gridMatrix !== undefined) ? deepCloneArray(gridMatrix):[];
                          innerGridMatrix.push([gridEle, gIdx]);
                          return <span key={eIdx+1}> 
                            <div>
                              <GridElements gridIdx={eIdx} viewState={viewState} idxs={eleIdxs} eleData={gEle} curEleSIndex={curEleSIndex} parentIdx={parentIdx+1}/>
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

export default GridElements;
