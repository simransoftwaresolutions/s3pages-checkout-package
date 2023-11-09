import React, { Fragment } from 'react';
import styles from './GridGenSettings.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { HorizontalAlignItems, VerticalAlignItems, GridColumnItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const GridGenSettings = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const columnRef = useRef<any>(null);
  const hAlignRef = useRef<any>(null);
  const vAlignRef = useRef<any>(null);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();

    // const columnsNum = tempStyleCtx?.style?.columns;  // for columns
    // const cRef = columnRef?.current;
    // if(cRef && columnsNum) cRef.value = columnsNum;

    const hAlign = tempStyleCtx?.style?.horizontalAlign;  // for horizontal align
    const hAlignEle = hAlignRef?.current;
    if(hAlignEle && hAlign) hAlignEle.value = hAlign;

    const vAlign = tempStyleCtx?.style?.verticalAlign;  // for vertical align
    const vAlignEle = vAlignRef?.current;
    if(vAlignEle && vAlign) vAlignEle.value = vAlign;

  }, [changeStyleOfElement]);
 
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const setcolumns = (e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx = getStyleOfElement();
    const _col = parseInt(e.target.value);
    tempStyleCtx.style.columns = _col;
    setStyleOfElement(tempStyleCtx, _col);

  }

  const setHorizonatalAlignSetting = (e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.style.horizontalAlign = e.target.value;
    setStyleOfElement(tempStyleCtx);

  }

  const setVerticalAlignSetting = (e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.style.verticalAlign = e.target.value;
    setStyleOfElement(tempStyleCtx);

  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "grid_gen_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("grid_gen_setting")}>
        General Settings
      </div>
      <div style={{ display:`${selectedSetting === "grid_gen_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        {/* <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={columnRef} format={OutlinedFormat} label="Select Columns" items={GridColumnItems} onChange={(e:any)=>setcolumns(e)} />
        </div> */}

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={hAlignRef} format={OutlinedFormat} label="Horizontal Align" items={HorizontalAlignItems} onChange={(e:any)=>setHorizonatalAlignSetting(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={vAlignRef} format={OutlinedFormat} label="Vertical Align" items={VerticalAlignItems} onChange={(e:any)=>setVerticalAlignSetting(e)} />
        </div>

      </div>

    </Fragment>
  );

}

export default GridGenSettings;
