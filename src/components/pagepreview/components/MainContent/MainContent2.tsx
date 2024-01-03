import { Fragment } from 'react';
import { GridElements } from './MainSubElement';
import styles from '../../../../styles/pagepreview/MainContent.module.css';
import { useState, useEffect, useRef } from "react";
import {  
  getTemplateStyle,
  generateClassNameStr,
} from '../../../../utils/functions';
import ENV from '../../../../utils/env';
import { useContentCtx } from "../../../../context/pagepreview/ContentsContext";
import { toast } from 'react-toastify';
import MainMyComponent from './MainMyComponent';
import React, { ReactElement } from 'react';
import {
  EditSectionTopbarProps,
  PageTopbarProps
} from "./MainContentProps";
import { usePagesCtx } from "../../../../context/pagepreview/PagesContext";
import { usePushCtx } from "../../../../context/pagepreview/PushContext";

interface MainContentProps {
  secRefs:any;
  viewState?:string;
  topBar?: any;
  mainContentRef?: any;
  dropSection?: (ev:any) => void;
  onDragLeaveFromSection?: (ev:any, sIdx:number) => void;
  onDragOverFromSection?: (ev:any, sIdx:number) => void;
  dragSection?: (ev:any, data:any, sIdx:number) => void;
  onMouseLeaveFromSec?: (ev:any) => void;
  onMouseOverFromSec?: (ev:any, sIndex:number, tooltipStr:string) => void;
  actionSectionComponent?: any;
  selDragSection?:number;
  sectionHoverIdx?:number;
  extDivMinHeight?:number;
}

const MainContent2: React.FC<MainContentProps> = ({
  secRefs,
  viewState="desktop",
  topBar,
  mainContentRef,
  dropSection,
  onDragLeaveFromSection,
  onDragOverFromSection,
  dragSection,
  onMouseLeaveFromSec,
  onMouseOverFromSec,
  actionSectionComponent,
  selDragSection=-1,
  sectionHoverIdx=-1,
  extDivMinHeight=0,

}:MainContentProps) => {

  //////////////////////////////////////////////////////////////////////////////////////////
  const { sectionCtx, 
          myTemplatesCtx,
          myOverlayCtx,
        } = useContentCtx();

  // const { setIsProcessing } = usePushCtx();
  const { hideOverlayArr, setHideOverlayArr, funnelPages, setFunnelPages, updateSection, setUpdateSection, saveElementsData, activeDevice, setActiveDevice } = usePagesCtx();
  const { templateCss } = usePushCtx();
  ////////////////////////////////////////////////////////////////////////////////////////////

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
          topBar ? topBar() :<></>
        ):
        (<div></div>)
      }

      <div ref={mainContentRef && mainContentRef} className={`${deviceCls} ${ENV.isViewReadOnly === false ? styles.mainContentBox : ""} page-editor-wrapper ${styles.mainCntcls}`} style={{ transform: "none", transformOrigin: "left top 0px", margin:"0 auto", padding:ENV.isViewReadOnly === false ? "5px":"", ...getTemplateStyle(templateCss) }} onDrop={(event) => {if(dropSection) dropSection(event);}}>
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
              if(secDat?.eleInfo?.myComponentKey !== undefined){

                if(!secDat?.eleInfo?.myComponentKey) return <></>;

                return (
                  <section
                    key={sIndex+1} 
                    id={secDat?.eleInfo?.sectionId || ""}
                    className={`${styles.actionSectionContainerParent} highlight`} 
                    draggable={(selDragSection === sIndex && ENV.isViewReadOnly === false) ? "true":"false"} 
                    onDragLeave={(event:any) => {if(onDragLeaveFromSection) onDragLeaveFromSection(event, sIndex);}} 
                    onDragOver={(event) => {if(onDragOverFromSection) onDragOverFromSection(event, sIndex)}} 
                    onDragStart={(event:any) => {if(dragSection) dragSection(event, secDat, sIndex)}} 
                    ref={(el) => (secRefs.current[sIndex] = el)}
                    onMouseLeave={(ev:any) => {if(onMouseLeaveFromSec) onMouseLeaveFromSec(ev)}} 
                    onMouseOver={(ev:any) => {if(onMouseOverFromSec) onMouseOverFromSec(ev, sIndex, sectionTooltipStr)}}
                  >
                    {sectionHoverIdx && sectionHoverIdx === sIndex && actionSectionComponent && actionSectionComponent(sectionTooltipStr, secDat, sIndex, isMytemplate, isMyOverlay, true)}
                    <div className={`${styles.myCompContainer}`}>
                      <div className={`${styles.dragndropimg} ${styles.placehodlerMyComp}`}>
                        <h4 className={`${styles.myComph4}`}>Placeholder for "{secDat?.eleInfo?.myComponentName}"</h4>
                      </div>
                    </div>
                  </section>
                )
              }


              /////////////////////////////////////////////////////////////////////////////
              const animationStyleStrSec = sec?.eleInfo?.props?.style?.animationStyle ? `animate__${sec?.eleInfo?.props?.style?.animationStyle}` : "";
              const animationDelayStrSec = sec?.eleInfo?.props?.style?.animationDelay ? `animate__delay-${sec?.eleInfo?.props?.style?.animationDelay}s` : "";
              const animationDurationStrSec = sec?.eleInfo?.props?.style?.animationDuration ? `animate__duration-${sec?.eleInfo?.props?.style?.animationDuration}` : "";
              const animationIterationStrSec = sec?.eleInfo?.props?.style?.animationIteration ? `animate__repeat-${sec?.eleInfo?.props?.style?.animationIteration}` : "";

              const animationStrSec = `animate__animated ${animationStyleStrSec} ${animationDelayStrSec} ${animationDurationStrSec} ${animationIterationStrSec}`;
              const sectionStyleSelector = generateClassNameStr(sec?.eleInfo?.props?.styleClasses);

              const sectionHeightCls = sec?.eleInfo?.props?.isHeightClass ? styles.secHeight : "";

              /////////////////////////////////////////////////////////////////////////////


              if(viewState === "phone" && sec?.eleInfo?.props?.mobileView && sec.eleInfo.props.mobileView === "false") return <></>;

              return (
                  <section
                    key={sIndex+1} 
                    id={_sectionId}
                    className={`${overlaySecCss} ${overlaySecPosCss} ${overlayHide} ${ovTglCls} ${sectionStyleSelector} ${styles.actionSectionContainerParent} ${animationStrSec} ${sectionHeightCls} section-print highlight`} 
                    style={{...overlayMinWidth, ...overlayMinHeight}}
                    draggable={(selDragSection === sIndex && ENV.isViewReadOnly === false) ? "true":"false"} 
                    onDragLeave={(event:any) => {if(onDragLeaveFromSection) onDragLeaveFromSection(event, sIndex)}} 
                    onDragOver={(event) => {if(onDragOverFromSection) onDragOverFromSection(event, sIndex)}} 
                    onDragStart={(event:any) => {if(dragSection) dragSection(event, secDat, sIndex)}} 
                    ref={(el) => (secRefs.current[sIndex] = el)}
                    onMouseLeave={(ev:any) => {if(onMouseLeaveFromSec) onMouseLeaveFromSec(ev)}} 
                    onMouseOver={(ev:any) => {if(onMouseOverFromSec) onMouseOverFromSec(ev, sIndex, sectionTooltipStr)}}
                  >
                    
                    {
                      // overlay intent display function
                      overlayDisplay(isOverlay, sIndex, secDat?.eleInfo?.ovShowOn, secDat?.eleInfo?.ovShowDelay)
                    }

                    {sectionHoverIdx === sIndex && actionSectionComponent && actionSectionComponent(sectionTooltipStr, secDat, sIndex, isMytemplate, isMyOverlay)}

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
            (<div className={`${styles.sectionContainer} ${styles.dragndropimg} highlight`} onDragLeave={(event:any) => {if(onDragLeaveFromSection) onDragLeaveFromSection(event, 0)}} onDragOver={(event) => {if(onDragOverFromSection) onDragOverFromSection(event, 0)}} >
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
