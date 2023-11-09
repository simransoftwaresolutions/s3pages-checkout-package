import React, { Fragment } from 'react';
import styles from './GeneralText.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { FontFamilyItems, FontStyleItems, TextAlignItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import ColorPickerBox from '../../Atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import FontDropdown from '../../StyleSettings/FontDropdown';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const GeneralText = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { gFonts, statesName, activeDevice } = usePagesCtx();

  const [buttonWidth, setButtonWidth] = useState<number>(10);
  const [textColor, setTextColor] = useState<any>();
  const [fontSizeVal, setFontSizeVal] = useState<number>(8);
  const [lineHeightVal, setLineHeightVal] = useState<number>(8);

  const fontFamilyRef = useRef<any>(null);
  const fontStyleRef = useRef<any>(null);
  const textAlignRef = useRef<any>(null);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

    const fontColor = getStylesFromCtx("color");
    if(fontColor){
      setTextColor(fontColor);
    }else{
      setTextColor("#fff");
    }
    

    let bWidth = getStylesFromCtx("width");
    bWidth = bWidth?.replace("%","")
    if(bWidth){
      setButtonWidth(parseInt(bWidth));
    }else{
      setButtonWidth(0);
    }
    

    if(fontFamilyRef && fontFamilyRef?.current){
      const _fontFamily = getStylesFromCtx("font-family");
      if(_fontFamily){
        fontFamilyRef.current.value = _fontFamily;
      }else{
        fontFamilyRef.current.value = "play";
      }
    }

    if(fontStyleRef && fontStyleRef?.current){
      const _fontStyle = getStylesFromCtx("font-weight");
      if(_fontStyle){
        fontStyleRef.current.value = _fontStyle;
      }else{
        fontStyleRef.current.value = "normal";
      }
    }

    if(textAlignRef && textAlignRef?.current){
      const _textAlign = getStylesFromCtx("text-align");
      if(_textAlign){
        textAlignRef.current.value = _textAlign;
      }else{
        textAlignRef.current.value = "left";
      }
    }
    
    let textSize = getStylesFromCtx("font-size");

    if(textSize){
      textSize = textSize.replace("px", "");
      setFontSizeVal(textSize);
    }else{
      setFontSizeVal(0);
    }
    
    let _lineHeight = getStylesFromCtx("line-height");

    if(_lineHeight){
      _lineHeight = _lineHeight.replace("px", "");
      setLineHeightVal(_lineHeight);
    }else{
      setLineHeightVal(0);
    }

  }, [changeStyleOfElement, statesName, activeDevice]);
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const setFont = (type:string, e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx = getStyleOfElement();
    switch(type){
      case 'font_family':
        const ret = setStylesToCtx(["font-family"], [`${e}`]);
        tempStyleCtx = setClassesName(ret, tempStyleCtx);

        break;
      case 'font_style':
        const ret1 = setStylesToCtx(["font-weight"], [`${e.target.value}`]);
        tempStyleCtx = setClassesName(ret1, tempStyleCtx);

        break;
      case 'text_align':
        const ret2 = setStylesToCtx(["text-align"], [`${e.target.value}`]);
        tempStyleCtx = setClassesName(ret2, tempStyleCtx);
        break;
    }

    setStyleOfElement(tempStyleCtx);

  }

  const setWidth = (e: React.ChangeEvent<HTMLInputElement>) => {

    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["width"], [`${parseInt(e.target.value)}%`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);
    setStyleOfElement(tempStyleCtx);

    setButtonWidth(parseInt(e.target.value));
  }

  const handleTextColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["color"], [`${color}`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);

    setStyleOfElement(tempStyleCtx);
    
    setTextColor(color);
  }

  const handleFamilyFont = (e:any) => {
    if(!e) return;
    setFont('font_family',e);   
  }
  
  const setFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    let tempStyleCtx = getStyleOfElement();

    setFontSizeVal(parseInt(e.target.value));
    
    const ret = setStylesToCtx(["font-size"], [`${parseInt(e.target.value)}px`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);

    setStyleOfElement(tempStyleCtx);

  }
  
  const setLineHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    let tempStyleCtx = getStyleOfElement();

    setLineHeightVal(parseInt(e.target.value));
    
    const ret = setStylesToCtx(["line-height"], [`${parseInt(e.target.value)}px`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);

    setStyleOfElement(tempStyleCtx);

  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "gen_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("gen_setting")}>
        General Settings
      </div>
      <div style={{ display:`${selectedSetting === "gen_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        <div className={`${styles.mainContainer} inner_setting`}>
          <ColorPickerBox name="Text Color" colorHex={textColor} retColor={handleTextColorChange} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <FontDropdown setFontFamily={handleFamilyFont} />
          {/* <Select selRef={fontFamilyRef} format={OutlinedFormat} id="gen_font-family" label="Font Family" items={gFonts} onChange={(e:any)=>setFont('font_family',e)} /> */}
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={fontStyleRef} format={OutlinedFormat} id="gen_font-style" label="Font Style" items={FontStyleItems} onChange={(e:any)=>setFont('font_style',e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={textAlignRef} format={OutlinedFormat} id="gen_text-align" label="Text Align" items={TextAlignItems} onChange={(e:any)=>setFont('text_align',e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} id="gen_width" label="Width" min={0} max={100} step={1} defaultValue={buttonWidth} onChange={(e:any)=>setWidth(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} label="Font Size" min={8} max={200} step={1} defaultValue={fontSizeVal} onChange={(e:any)=>setFontSize(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} label="Line Height" min={8} max={200} step={1} defaultValue={lineHeightVal} onChange={(e:any)=>setLineHeight(e)} />
        </div>

      </div>

    </Fragment>
  );

}

export default GeneralText;
