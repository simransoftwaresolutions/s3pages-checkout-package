import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/HtmlSetting.module.css';
import { Range, Select, Text, TextArea } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { deepCloneStyle, deepCloneSection, deepCloneArray } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const HtmlSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { curEleCtx, setCurEleCtx } = usePushCtx();

  const [text, setText] = useState<string>('');

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();
    
    const _text = tempStyleCtx?.text;
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

    let tempStyleCtx  = getStyleOfElement();
    tempStyleCtx.text = e.target.value;
    setStyleOfElement(tempStyleCtx);
    
    setText(e.target.value);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "gen_html_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("gen_html_setting")}>
        General
      </div>
      <div style={{ display:`${selectedSetting === "gen_html_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        
        <div className={`${styles.mainContainer} html-set-main-cnt-gb inner_setting`}>
          <TextArea format={OutlinedFormat} defaultValue={text} onChangeTextarea={(e:any)=>handleText(e)} />
        </div>

      </div>

    </Fragment>
  );

}

export default HtmlSetting;
