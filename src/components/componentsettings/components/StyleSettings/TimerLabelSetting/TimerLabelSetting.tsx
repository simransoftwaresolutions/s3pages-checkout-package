import React, { Fragment } from 'react';
import styles from './TimerLabelSetting.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { FontFamilyItems, FontStyleItems, TextAlignItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { deepCloneArray, setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import ColorPickerBox from '../../Atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import FontDropdown from '../../StyleSettings/FontDropdown';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const TimerLabelSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const [fontColor, setFontColor] = useState<any>();
  const [fontSizeVal, setFontSizeVal] = useState<number>(8);
  const fontFamilyRef = useRef<any>(null);
  const [daysLabel, setDaysLabel] = useState<string>('');
  const [hoursLabel, setHoursLabel] = useState<string>('');
  const [minutesLabel, setMinutesLabel] = useState<string>('');
  const [secondsLabel, setSecondsLabel] = useState<string>('');
  const { gFonts, statesName, activeDevice } = usePagesCtx();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();

    const _fontColor = getStylesFromCtx("color", 2);
    
    if(_fontColor){
      setFontColor(_fontColor);
    }else{
      setFontColor("#ffffffff");
    }

    const _fontFamilyRef = getStylesFromCtx("font-family", 2);
    if(fontFamilyRef && fontFamilyRef.current){
      if(_fontFamilyRef){
        fontFamilyRef.current.value = _fontFamilyRef;
      }else{
        fontFamilyRef.current.value = "play";
      }
    } 
    
    let _fontSizeVal = getStylesFromCtx("font-size", 2);
    _fontSizeVal = _fontSizeVal?.replace("px", "");
    if(_fontSizeVal){
      setFontSizeVal(parseInt(_fontSizeVal));
    }else{
      setFontSizeVal(0);
    }
    
    const _daysLabel = tempStyleCtx?.timerLabel?.daysLabel;
    setDaysLabel(_daysLabel);
    
    const _hoursLabel = tempStyleCtx?.timerLabel?.hoursLabel;
    setHoursLabel(_hoursLabel);
    
    const _minutesLabel = tempStyleCtx?.timerLabel?.minutesLabel;
    setMinutesLabel(_minutesLabel);
    
    const _secondsLabel = tempStyleCtx?.timerLabel?.secondsLabel;
    setSecondsLabel(_secondsLabel);
    
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

    const ret = setStylesToCtx(["color"], [color], 2);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 2);

    setStyleOfElement(tempStyleCtx);
    
    setFontColor(color);
  }
  
  // font family
  const setFontFamily = (e:any) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["font-family"], [e], 2);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 2);

    setStyleOfElement(tempStyleCtx);
  }

  // font size
  const setFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["font-size"], [`${parseInt(e.target.value)}px`], 2);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 2);

    setStyleOfElement(tempStyleCtx);

    setFontSizeVal(parseInt(e.target.value));
  }

  // days label
  const handleDaysLabel = (e:any) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.timerLabel.daysLabel = e.target.value;
    setStyleOfElement(tempStyleCtx);
    
    setDaysLabel(e.target.value);
  }

  // hours label
  const handleHoursLabel = (e:any) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.timerLabel.hoursLabel = e.target.value;
    setStyleOfElement(tempStyleCtx);
    
    setHoursLabel(e.target.value);
  }

  // minutes label
  const handleMinutesLabel = (e:any) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.timerLabel.minutesLabel = e.target.value;
    setStyleOfElement(tempStyleCtx);
    
    setMinutesLabel(e.target.value);
  }

  // seconds label
  const handleSecondsLabel = (e:any) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.timerLabel.secondsLabel = e.target.value;
    setStyleOfElement(tempStyleCtx);
    
    setSecondsLabel(e.target.value);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "label_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("label_setting")}>
        Label
      </div>
      <div style={{ display:`${selectedSetting === "label_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
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

          <div className={`inner_setting`}>
            <Text format={OutlinedFormat} label="Days Label" defaultValue={daysLabel} type="text" onChange={(e:any)=>handleDaysLabel(e)} />
          </div>

          <div className={`inner_setting`}>
            <Text format={OutlinedFormat} label="Hours Label" defaultValue={hoursLabel} type="text" onChange={(e:any)=>handleHoursLabel(e)} />
          </div>

          <div className={`inner_setting`}>
            <Text format={OutlinedFormat} label="Minutes Label" defaultValue={minutesLabel} type="text" onChange={(e:any)=>handleMinutesLabel(e)} />
          </div>

          <div className={`inner_setting`}>
            <Text format={OutlinedFormat} label="Seconds Label" defaultValue={secondsLabel} type="text" onChange={(e:any)=>handleSecondsLabel(e)} />
          </div>

        </div>
      </div>

    </Fragment>
  );

}

export default TimerLabelSetting;
