import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/MainPageSetting.module.css';
import { Text, TextArea } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { deepCloneStyle, deepCloneSection, deepCloneArray } from '../../../../../utils/functions';
import { usePagesCtx } from "../../../../../context/pagepreview/PagesContext";

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const CustomPageSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { pagesInfo, setPagesInfo } = usePagesCtx();

  const [ headTracking, setHeadTracking ] = useState<string>('');
  const [ bodyTracking, setBodyTracking ] = useState<string>('');

  useEffect(() => {

    if(pagesInfo?.isInfoUpdate) return;
    
    if(pagesInfo?.headTracking){
      setHeadTracking(pagesInfo?.headTracking);
    }else{
      setHeadTracking("");
    }

    if(pagesInfo?.bodyTracking){
      setBodyTracking(pagesInfo?.bodyTracking);
    }else{
      setBodyTracking("");
    }

  }, [pagesInfo])

  const handleHeadTracking = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.headTracking = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setHeadTracking(e.target.value);
  }

  const handleBodyTracking = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.bodyTracking = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setBodyTracking(e.target.value);
  }

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${styles.subSettingTitleLast} ${selectedSetting === "custcode_sub_page_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("custcode_sub_page_setting")}>
        Custom Code Settings
      </div>
      <div style={{ display:`${selectedSetting === "custcode_sub_page_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <TextArea label="Head Tracking" format={OutlinedFormat} defaultValue={headTracking} onBlurTextarea={(e:any)=>handleHeadTracking(e)} onChangeTextarea={(e:any)=>setHeadTracking(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <TextArea label="Body Tracking" format={OutlinedFormat} defaultValue={bodyTracking} onBlurTextarea={(e:any)=>handleBodyTracking(e)} onChangeTextarea={(e:any)=>setBodyTracking(e.target.value)} />
        </div>

      </div>

    </Fragment>
  );

}

export default CustomPageSetting;
