import React, { Fragment } from 'react';
import styles from './ButtonSubText.module.css';
import { Text, Range, Select } from '../../Atoms/Input';
import { useState, useEffect } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import ColorPickerBox from '../../Atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const ButtonSubText = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { commonStyleSelector, statesName, activeDevice } = usePagesCtx();

  const { changeStyleOfElement } = useContentCtx();

  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState<any>();
  const [fontSizeVal, setFontSizeVal] = useState<number>(8);

  useEffect(() => {
    
    let tempStyleCtx  = getStyleOfElement();

    const fontColor = getStylesFromCtx("color", 0);

    if(fontColor){
      setTextColor(fontColor);
    }else{
      setTextColor("#ffffffff");
    }

    const text = tempStyleCtx?.subtext;
    setText(text);

    let textSize = getStylesFromCtx("font-size", 0);

    if(textSize){
      textSize = textSize?.replace("px", "");
      setFontSizeVal((parseInt(textSize)));
    }else{
      setFontSizeVal(0);
    }

  }, [changeStyleOfElement, commonStyleSelector, statesName, activeDevice])

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const setBtnText = (e:React.ChangeEvent<HTMLInputElement>) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.subtext = e.target.value;
    setStyleOfElement(tempStyleCtx);

    setText(e.target.value);
  }

  const handleTextColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();
    setTextColor(color);

    const ret = setStylesToCtx(["color"], [`${color}`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);
  }

  const setFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {

    let tempStyleCtx = getStyleOfElement();
    setFontSizeVal(parseInt(e.target.value));
    
    const ret = setStylesToCtx(["font-size"], [`${parseInt(e.target.value)}px`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);
  }


  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "sub_text_btn_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("sub_text_btn_setting")}>
        Sub Text Settings
      </div>
      <div style={{ display:`${selectedSetting === "sub_text_btn_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        <div className={`${styles.mainContainer} inner_setting`}>
          <Text format={OutlinedFormat} id="main_btn_sub_text" label="Text" defaultValue={text} type="text" onChange={(e:any)=>setBtnText(e)} />
        </div>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <ColorPickerBox name="Text Color" colorHex={textColor} retColor={handleTextColorChange} />
        </div>

        <div className={`inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} id="main_btn_sub_text_size" label="Font Size" min={8} max={200} step={1} defaultValue={fontSizeVal} onChange={(e:any)=>setFontSize(e)} />
        </div>  
      </div>
    </Fragment>
  );

}

export default ButtonSubText;
