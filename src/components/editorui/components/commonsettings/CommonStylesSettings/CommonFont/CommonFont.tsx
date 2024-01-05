import React, { Fragment } from 'react';
import styles from '../../../../../../styles/editorui/CommonFont.module.css';
import { Range, Select } from '../../../../atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { FontStyleItems } from '../../../../datas/commonComponentData';
import { useSettingsCtx } from "../../../../../../context/editorui/SettingsContext";
import { setClassesName } from '../../../../../../utils/functions';
import { useContentCtx } from "../../../../../../context/editorui/ContentsContext";
import ColorPickerBox from '../../../../atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../../context/editorui/PagesContext';
import FontDropdown from '../../FontDropdown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

interface FontProps {
  componentNumber:number;
  activeComponent:string; 
  setActiveComponent:any;
}

const CommonFont = ({componentNumber, activeComponent, setActiveComponent}:FontProps) => {

  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { statesName, activeDevice } = usePagesCtx();

  const [textColor, setTextColor] = useState<any>();
  const [fontSizeVal, setFontSizeVal] = useState<number>(8);
  const [lineHeightVal, setLineHeightVal] = useState<number>(8);

  const fontFamilyRef = useRef<any>(null);
  const fontStyleRef = useRef<any>(null);

  const { changeStyleOfElement } = useContentCtx();

  useEffect(() => {

    const fontColor = getStylesFromCtx("color", componentNumber);
    if(fontColor){
      setTextColor(fontColor);
    }else{
      setTextColor("#fff");
    }    

    if(fontFamilyRef && fontFamilyRef?.current){
      const _fontFamily = getStylesFromCtx("font-family", componentNumber);
      if(_fontFamily){
        fontFamilyRef.current.value = _fontFamily;
      }else{
        fontFamilyRef.current.value = "play";
      }
    }

    if(fontStyleRef && fontStyleRef?.current){
      const _fontStyle = getStylesFromCtx("font-weight", componentNumber);
      if(_fontStyle){
        fontStyleRef.current.value = _fontStyle;
      }else{
        fontStyleRef.current.value = "normal";
      }
    }
    
    let textSize = getStylesFromCtx("font-size", componentNumber);

    if(textSize){
      textSize = textSize.replace("px", "");
      setFontSizeVal(textSize);
    }else{
      setFontSizeVal(0);
    }
    
    let _lineHeight = getStylesFromCtx("line-height", componentNumber);

    if(_lineHeight){
      _lineHeight = _lineHeight.replace("px", "");
      setLineHeightVal(_lineHeight);
    }else{
      setLineHeightVal(0);
    }

  }, [changeStyleOfElement, statesName, activeDevice]);
  
  const setFont = (type:string, e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx = getStyleOfElement();
    switch(type){
      case 'font_family':
        const ret = setStylesToCtx(["font-family"], [`${e}`], componentNumber);
        tempStyleCtx = setClassesName(ret, tempStyleCtx, componentNumber);
        break;
      case 'font_style':
        const ret1 = setStylesToCtx(["font-weight"], [`${e.target.value}`], componentNumber);
        tempStyleCtx = setClassesName(ret1, tempStyleCtx, componentNumber);
        break;
    }
    setStyleOfElement(tempStyleCtx);

  }

  const handleTextColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["color"], [`${color}`], componentNumber);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, componentNumber);

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
    
    const ret = setStylesToCtx(["font-size"], [`${parseInt(e.target.value)}px`], componentNumber);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, componentNumber);

    setStyleOfElement(tempStyleCtx);

  }
  
  const setLineHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    let tempStyleCtx = getStyleOfElement();

    setLineHeightVal(parseInt(e.target.value));
    
    const ret = setStylesToCtx(["line-height"], [`${parseInt(e.target.value)}px`], componentNumber);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, componentNumber);

    setStyleOfElement(tempStyleCtx);

  }
  
  const [ open, setOpen] = useState<boolean>(false);
  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${open ? "active_common_settings" : ""}`} onClick={()=>setOpen(!open)}>
        Font Settings <span style={{ float:"right" }}>{open ? <KeyboardArrowUpIcon fontSize='medium'/> : <KeyboardArrowDownIcon fontSize='medium'/>}</span>
      </div>
      <div style={{ display:`${open ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        <div className={`${styles.mainContainer} inner_setting`}>
          <ColorPickerBox name="Font Color" colorHex={textColor} retColor={handleTextColorChange} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <FontDropdown setFontFamily={handleFamilyFont} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={fontStyleRef} format={OutlinedFormat} label="Font Style" items={FontStyleItems} onChange={(e:any)=>setFont('font_style',e)} />
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

export default CommonFont;
