import { Fragment } from 'react';
import styles from '../../../../../../styles/editorui/HtmlSetting.module.css';
import { TextArea } from '../../../../atoms/Input';
import { useState, useEffect } from 'react';
import { useSettingsCtx } from "../../../../../../context/editorui/SettingsContext";
import { useContentCtx } from "../../../../../../context/editorui/ContentsContext";

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const HtmlSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();

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
