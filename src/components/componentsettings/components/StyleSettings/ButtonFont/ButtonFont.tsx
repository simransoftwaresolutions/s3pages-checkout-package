import React, { Fragment } from 'react';
import styles from './ButtonFont.module.css';
import { Range, Select } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { FontFamilyItems, FontStyleItems, TextAlignItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import FontDropdown from '../../StyleSettings/FontDropdown';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const ButtonFont = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { commonStyleSelector, queryData, gFonts, statesName, activeDevice } = usePagesCtx();

  const [buttonWidth, setButtonWidth] = useState<number>(0);
  
  const fontFamilyRef = useRef<any>(null);
  const fontStyleRef = useRef<any>(null);
  const btnWidthRef = useRef<any>(null);
  const textAlignRef = useRef<any>(null);
  const btnAlignRef = useRef<any>(null);

  const { pageAction, funnelPages } = usePagesCtx();
  const pageIdx = pageAction?.activePage ? pageAction?.activePage : 0;
  const _siteId = funnelPages[pageIdx]?.pageData?.site;

  const { 
    changeStyleOfElement,
  } = useContentCtx();

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();

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

    let _btnWidth = getStylesFromCtx("width");
    _btnWidth = _btnWidth?.replace("%","");
    if(btnWidthRef && btnWidthRef.current){
      if(_btnWidth){
        btnWidthRef.current.value = _btnWidth;
      }else{
        btnWidthRef.current.value = "100";
      }
    }

    const _btnAlign = tempStyleCtx?.btnAlign;
    if(btnAlignRef && btnAlignRef.current){
     if(_btnAlign){
      btnAlignRef.current.value = _btnAlign;
     }else{
      btnAlignRef.current.value = "left";
     }
    } 

  }, [changeStyleOfElement, commonStyleSelector, statesName, activeDevice])

  const setFont = (type:string, e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx  = getStyleOfElement();
    switch(type){
      case 'font_family':

        const ret1 = setStylesToCtx(["font-family"], [`${e}`]);
        tempStyleCtx = setClassesName(ret1, tempStyleCtx);
        break;
      case 'font_style':

        const ret2 = setStylesToCtx(["font-weight"], [`${e.target.value}`]);
        tempStyleCtx = setClassesName(ret2, tempStyleCtx);
        break;
      case 'text_align':

        const ret3 = setStylesToCtx(["text-align"], [`${e.target.value}`]);
        tempStyleCtx = setClassesName(ret3, tempStyleCtx);
        break;
    }

    setStyleOfElement(tempStyleCtx);

  }

  // const setWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  //   let tempStyleCtx  = getStyleOfElement();
  //   setButtonWidth(parseInt(e.target.value));

  //   const ret3 = setStylesToCtx(["width"], [`${e.target.value}%`]);
  //   tempStyleCtx = setClassesName(ret3, tempStyleCtx);
  //   setStyleOfElement(tempStyleCtx);

  // }

  const handleFamilyFont = (e:any) => {
    if(!e) return;
    setFont('font_family',e);   
  }

  const btnWidthItems = [
    {
      key:"100",
      label:"Full Width",
    },
    {
      key:"fit-content",
      label:"Fit Content",
    }
  ];

  const handleBtnWidth = (e:any) => { // Button Width
    const val = e.target.value === "100" ? "100%" : e.target.value;
    let tempStyleCtx  = getStyleOfElement();
    const ret = setStylesToCtx(["width"], [`${val}`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);
    setStyleOfElement(tempStyleCtx);
  }

  const handleButtonAlign = (e:any) => {
    const tempStyleCtx  = getStyleOfElement();
    tempStyleCtx.btnAlign = e.target.value;
    setStyleOfElement(tempStyleCtx);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "font_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("font_setting")}>
        Font Settings
      </div>
      <div style={{ display:`${selectedSetting === "font_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        <div className={`${styles.mainContainer} inner_setting`}>
          <FontDropdown setFontFamily={handleFamilyFont} />
          {/* <Select selRef={fontFamilyRef} format={OutlinedFormat} id="button_font-family" label="Font Family" items={gFonts} onChange={(e:any)=>setFont('font_family',e)} /> */}
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={fontStyleRef} format={OutlinedFormat} id="button_font-style" label="Font Style" items={FontStyleItems} onChange={(e:any)=>setFont('font_style',e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={textAlignRef} format={OutlinedFormat} id="button_text-align" label="Text Align" items={TextAlignItems} onChange={(e:any)=>setFont('text_align',e)} />
        </div>

        {/* <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={btnAlignRef} format={OutlinedFormat} label="Button Align" items={TextAlignItems} onChange={(e:any)=>handleButtonAlign(e)} />
        </div> */}

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={btnWidthRef} label="Button Width" items={btnWidthItems} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>handleBtnWidth(e)} />
        </div>

        {/* <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} id="button_width" label="Button Width" min={0} max={100} step={1} defaultValue={buttonWidth} onChange={(e:any)=>setWidth(e)} />
        </div> */}

      </div>

    </Fragment>
  );

}

export default ButtonFont;
