import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/TimerFormatSetting.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { FontFamilyItems, FontStyleItems, TextAlignItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { deepCloneArray, setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import ColorPickerBox from '../../Atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import FontDropdown from '../../StyleSettings/FontDropdown';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const TimerFormatSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { gFonts, statesName, activeDevice } = usePagesCtx();

  const [fontColorSel, setFontColorSel] = useState<string>("off");
  const [fontColor, setFontColor] = useState<any>();
  const [bgColorSel, setBgColorSel] = useState<string>("off");
  const [bgColor, setBgColor] = useState<any>();
  const [boxShadowColorSel, setBoxShadowColorSel] = useState<string>("off");
  const [boxShadowColor, setBoxShadowColor] = useState<any>();
  const [fontSizeVal, setFontSizeVal] = useState<number>(8);
  const [bgSizeVal, setBgSizeVal] = useState<number>(85);
  const [borderRadius, setBorderRadius] = useState<number>(5);
  const [iconGap, setIconGap] = useState<number>(5);
  const fontFamilyRef = useRef<any>(null);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

    const _fontColor = getStylesFromCtx("color", 1);
    if(_fontColor){
      setFontColor(_fontColor);
    }else{
      setFontColor("#ffffffff");
    }
    

    const _bgColor = getStylesFromCtx("color", 0);
    if(_bgColor){
      setBgColor(_bgColor);
    }else{
      setBgColor("#ffffffff");
    }


    let _boxShadowColor =  getStylesFromCtx("box-shadow", 0);
    _boxShadowColor = _boxShadowColor?.split(" ");
    _boxShadowColor = _boxShadowColor ? _boxShadowColor[0] : "";
    if(_boxShadowColor){
      setBoxShadowColor(_boxShadowColor);
    }else{
      setBoxShadowColor("#000");
    }
    
    const _fontFamilyRef = getStylesFromCtx("font-family", 1);
    if(_fontFamilyRef){
      if(fontFamilyRef && fontFamilyRef.current) fontFamilyRef.current.value = _fontFamilyRef;
    }else{
      if(fontFamilyRef && fontFamilyRef.current) fontFamilyRef.current.value = "play";
    }
    
    let _fontSizeVal = getStylesFromCtx("font-size", 1);
    _fontSizeVal = _fontSizeVal?.replace("px", "");
    if(_fontSizeVal){
      setFontSizeVal(parseInt(_fontSizeVal));
    }else{
      setFontSizeVal(0);
    }
    
    
    let _bgSizeVal = getStylesFromCtx("min-height", 0);
    _bgSizeVal = _bgSizeVal?.replace("px", "");
    if(_bgSizeVal){
      setBgSizeVal(parseInt(_bgSizeVal));
    }else{
      setBgSizeVal(0);
    }
    
    
    let _borderRadius = getStylesFromCtx("border-radius", 0);
    _borderRadius = _borderRadius?.replace("%", "");
    if(_borderRadius){
      setBorderRadius(parseInt(_borderRadius));
    }else{
      setBorderRadius(0);
    }
    
    let _iconGap = getStylesFromCtx("margin-right", 0);
    _iconGap = _iconGap?.replace("px", "");
    if(_iconGap){
      setIconGap(parseInt(_iconGap));
    }else{
      setIconGap(0);
    }
    

  },[changeStyleOfElement, statesName, activeDevice]);
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  // font color
  const handleFontColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["color"], [`${color}`], 1);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 1);
    setStyleOfElement(tempStyleCtx);
    
    setFontColor(color);
  }
  
  const handleFontColorToggle = (value:string) => {
    setFontColorSel(value);
  }

  // Background color
  const handleBgColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["background"], [`${color}`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);
    
    setBgColor(color);
  }
  
  const handleBgColorToggle = (value:string) => {
    setBgColorSel(value);
  }

  // BoxShadow color
  const handleBoxShadowColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["box-shadow"], [`${color} 0px -5px 0px 0px inset`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);
    
    setBoxShadowColor(color);
  }
  
  const handleBoxShadowColorToggle = (value:string) => {
    setBoxShadowColorSel(value);
  }

  // font family
  const setFontFamily = (e:any) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["font-family"], [`${e}`], 1);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 1);

    setStyleOfElement(tempStyleCtx);
  }

  // font size
  const setFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["font-size"], [`${e.target.value}px`], 1);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 1);

    setStyleOfElement(tempStyleCtx);

    setFontSizeVal(parseInt(e.target.value));
  }

  // background size
  const setBackgroundSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["min-height"], [`${e.target.value}px`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

    setBgSizeVal(parseInt(e.target.value));
  }

  useEffect(()=>{
    let tempStyleCtx = getStyleOfElement();
    const ret = setStylesToCtx(["min-width"], [`${bgSizeVal}px`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);
  }, [bgSizeVal])

  // border radius
  const setBorderRadiusSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["border-radius"], [`${e.target.value}%`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

    setBorderRadius(parseInt(e.target.value));
  }

  // Icon Gap
  const setIconGapSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["margin-right"], [`${e.target.value}px`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

    setIconGap(parseInt(e.target.value));
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "format_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("format_setting")}>
        Format
      </div>
      <div style={{ display:`${selectedSetting === "format_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        <div>
          <div className={`inner_setting`}>
            <ColorPickerBox name="Font Color" colorHex={fontColor} retColor={handleFontColorChange} />
          </div>

          <div className={`${styles.mainContainer} inner_setting`}>
            <FontDropdown setFontFamily={(e:any)=>setFontFamily(e)} />
            {/* <Select selRef={fontFamilyRef} format={OutlinedFormat} label="Font Family" items={gFonts} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setFontFamily(e)} /> */}
          </div>

          <div className={`inner_setting inner_range_setting`}>
            <Range displayValue={true} format={OutlinedFormat} label="Font Size" min={8} max={200} step={1} defaultValue={fontSizeVal} onChange={(e:any)=>setFontSize(e)} />
          </div>

          <div className={`inner_setting inner_range_setting`}>
            <Range displayValue={true} format={OutlinedFormat} label="Background Size" min={8} max={300} step={1} defaultValue={bgSizeVal} onChange={(e:any)=>setBackgroundSize(e)} />
          </div>

          <div className={`inner_setting inner_range_setting`}>
            <Range displayValue={true} format={OutlinedFormat} label="Border Radius" min={1} max={100} step={1} defaultValue={borderRadius} onChange={(e:any)=>setBorderRadiusSize(e)} />
          </div>

          <div className={`inner_setting inner_range_setting`}>
            <Range displayValue={true} format={OutlinedFormat} label="Icon Gap" min={1} max={200} step={1} defaultValue={iconGap} onChange={(e:any)=>setIconGapSize(e)} />
          </div>

          <div className={`inner_setting`}>
            <ColorPickerBox name="Background Color" colorHex={bgColor} retColor={handleBgColorChange} />
          </div>

          <div className={`inner_setting`}>
            <ColorPickerBox name="Box Shadow" colorHex={boxShadowColor} retColor={handleBoxShadowColorChange} />
          </div>

        </div>
      </div>

    </Fragment>
  );

}

export default TimerFormatSetting;
