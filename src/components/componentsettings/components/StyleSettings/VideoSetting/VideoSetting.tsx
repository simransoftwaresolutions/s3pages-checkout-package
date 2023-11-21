import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/VideoSetting.module.css';
import { TextArea } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { deepCloneArray } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const VideoSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const [text, setText] = useState<string>('');

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();
    
    const _text = tempStyleCtx?.embedCode;
    setText(_text);
    
  },[changeStyleOfElement]);
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }
  
  // text
  const handleText = (e:any) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.embedCode = e.target.value;
    setStyleOfElement(tempStyleCtx);
    
    setText(e.target.value);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "gen_video_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("gen_video_setting")}>
        General
      </div>
      <div style={{ display:`${selectedSetting === "gen_video_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        
        <div className={`${styles.mainContainer} video-main-cnt-gb inner_setting`}>
          <TextArea format={OutlinedFormat} defaultValue={text} onChangeTextarea={(e:any)=>handleText(e)} />
        </div>

      </div>

    </Fragment>
  );

}

export default VideoSetting;
