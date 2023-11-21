import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/ColumnGenSettings.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { HorizontalAlignItems, VerticalAlignItems, TextAlignItems, ColumnWidthItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { deepCloneStyle, deepCloneSection, getColumnStrNumber, setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const ColumnGenSettings = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { activeDevice } = usePagesCtx();

  const { 
    changeStyleOfElement,
  } = useContentCtx();

  const columnRef = useRef<any>(null);
  const hAlignRef = useRef<any>(null);
  const vAlignRef = useRef<any>(null);

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();

    const columnStr = tempStyleCtx?.cssClass; // for Column width number (col-md-{num})
    // const columnNumber = getColumnStrNumber(columnStr);
    const colEle = columnRef?.current;
    // if(colEle && columnNumber) colEle.value = columnNumber;

    // const hAlign = tempStyleCtx?.style?.horizontalAlign;  // for horizontal align
    const hAlign = getStylesFromCtx("text-align");  // for horizontal align
    const hAlignEle = hAlignRef?.current;
    if(hAlignEle && hAlign) hAlignEle.value = hAlign;

    const vAlign = tempStyleCtx?.style?.verticalAlign;  // for vertical align
    const vAlignEle = vAlignRef?.current;
    if(vAlignEle && vAlign) vAlignEle.value = vAlign;

  }, [changeStyleOfElement, activeDevice]);
 
  
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
    setStyleOfElement(tempStyleCtx, 0, _col);

  }

  const setHorizonatalAlignSetting = (e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx = getStyleOfElement();
    const ret = setStylesToCtx(["text-align"], [`${e.target.value}`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);
    setStyleOfElement(tempStyleCtx);

  }

  const setVerticalAlignSetting = (e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.style.verticalAlign = e.target.value;
    setStyleOfElement(tempStyleCtx);

  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "columns_gen_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("columns_gen_setting")}>
        General Settings
      </div>
      <div style={{ display:`${selectedSetting === "columns_gen_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        {/* <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={columnRef} format={OutlinedFormat} label="Select Columns Width" items={ColumnWidthItems} onChange={(e:any)=>setcolumns(e)} />
        </div> */}

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={hAlignRef} format={OutlinedFormat} label="Horizontal Align" items={TextAlignItems} onChange={(e:any)=>setHorizonatalAlignSetting(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={vAlignRef} format={OutlinedFormat} label="Vertical Align" items={VerticalAlignItems} onChange={(e:any)=>setVerticalAlignSetting(e)} />
        </div>

      </div>

    </Fragment>
  );

}

export default ColumnGenSettings;
