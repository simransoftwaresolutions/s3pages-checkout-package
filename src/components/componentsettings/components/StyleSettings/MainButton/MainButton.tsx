import React, { Fragment } from 'react';
import styles from './MainButton.module.css';
import { Text, Range, Select } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { PreIconsItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import ColorPickerBox from '../../Atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import UrlAtom from '../../Atoms/ElementsAtoms/UrlAtom';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const MainButton = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [textColor, setTextColor] = useState<any>();
  const [iconColor, setIconColor] = useState<any>();
  const [fontSizeVal, setFontSizeVal] = useState<number>(8);

  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { commonStyleSelector, statesName, activeDevice } = usePagesCtx();
  const [urlType, setUrlType] = useState<string>("");
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const preIconRef = useRef<any>(null);
  const postIconRef = useRef<any>(null);

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();

    const fontColor = getStylesFromCtx("color");
    if(fontColor){
      setTextColor(fontColor);
    }else{
      setTextColor("#fff");
    }

    const _iconColor = getStylesFromCtx("color", 1);
    if(_iconColor){
      setIconColor(_iconColor);
    }else{
      setIconColor("#fff");
    }

    let textSize = getStylesFromCtx("font-size");

    if(textSize){
      textSize = textSize.replace("px", "");
      setFontSizeVal(textSize);
    }else{
      setFontSizeVal(0);
    }

    const _text = tempStyleCtx?.text;
    if(_text){
      setText(_text);
    }else{
      setText("");
    }

    const _url = tempStyleCtx?.url;
    if(_url){
      setUrl(_url);
    }else{
      setUrl("");
    }

    const _preIcon = tempStyleCtx?.preChildren;
    if(_preIcon){
      if(preIconRef && preIconRef?.current) preIconRef.current.value = _preIcon;
    }else{
      if(preIconRef && preIconRef?.current) preIconRef.current.value = "none";
    }
    
    const _postIcon = tempStyleCtx?.postChildren;
    if(_postIcon){
      if(postIconRef && postIconRef?.current) postIconRef.current.value = _postIcon;
    }else{
      if(postIconRef && postIconRef?.current) postIconRef.current.value = "none";
    } 

    const _urlType = tempStyleCtx?.urlType;
    setUrlType(_urlType);
  }, [changeStyleOfElement, commonStyleSelector, statesName, activeDevice]);

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const setBtnText = (e:React.ChangeEvent<HTMLInputElement>) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.text = e.target.value;
    setStyleOfElement(tempStyleCtx);

    setText(e.target.value);
  }

  const setBtnUrl = (val:string) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.url = val;
    setStyleOfElement(tempStyleCtx);

    setUrl(val);
  }
  
  const handleUrlType = (val:string) => {
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.urlType = val;
    setStyleOfElement(tempStyleCtx);

    setUrlType(val);
  }

  const handleTextColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();
    setTextColor(color);

    const ret = setStylesToCtx(["color"], [`${color}`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);

    setStyleOfElement(tempStyleCtx);

  }

  const handleIconColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();
    setIconColor(color);

    const ret = setStylesToCtx(["color"], [`${color}`], 1);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 1);

    setStyleOfElement(tempStyleCtx);

  }

  const setFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    let tempStyleCtx = getStyleOfElement();

    setFontSizeVal(parseInt(e.target.value));
    
    const ret = setStylesToCtx(["font-size"], [`${parseInt(e.target.value)}px`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);

    setStyleOfElement(tempStyleCtx);

  }

  const setPreIcon = (e:React.ChangeEvent<HTMLSelectElement>) => {

      let icon = e.target.value;

      let tempStyleCtx = getStyleOfElement();
      tempStyleCtx.preChildren = icon;
      setStyleOfElement(tempStyleCtx);
  }

  const setPostIcon = (e:React.ChangeEvent<HTMLSelectElement>) => {

      let icon = e.target.value;

      let tempStyleCtx = getStyleOfElement();
      tempStyleCtx.postChildren = icon;
      setStyleOfElement(tempStyleCtx);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "main_btn_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("main_btn_setting")}>
        Main Button Settings
      </div>
      <div style={{ display:`${selectedSetting === "main_btn_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        <div className={`inner_setting`}>
          <Text format={OutlinedFormat} id="main_btn_text" label="Text" defaultValue={text} type="text" onChange={(e:any)=>setBtnText(e)} />
        </div>

        <div className={`${styles.mainContainer} url-atom-element`}>
          <UrlAtom getUrl={setBtnUrl} getUrlType={handleUrlType} urlTypeVal={urlType} menuUrlVal={url} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <ColorPickerBox name="Text Color" colorHex={textColor} retColor={handleTextColorChange} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <ColorPickerBox name="Icon Color" colorHex={iconColor} retColor={handleIconColorChange} />
        </div>

        <div className={`inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} id="main_btn_text_size" label="Font Size" min={8} max={200} step={1} defaultValue={fontSizeVal} onChange={(e:any)=>setFontSize(e)} />
        </div>

        <div className={`inner_setting`}>
          <Select selRef={preIconRef} format={OutlinedFormat} id="main_btn_pre_icon" label="Pre Icon" items={PreIconsItems} onChange={(e:any)=>setPreIcon(e)} />
        </div>

        <div className={`inner_setting`}>
          <Select selRef={postIconRef} format={OutlinedFormat} id="main_btn_post_icon" label="Post Icon" items={PreIconsItems} onChange={(e:any)=>setPostIcon(e)} />
        </div>
        
      </div>
    </Fragment>
  );

}

export default MainButton;
