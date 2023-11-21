import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/SeparatorSettings.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { BorderTypeItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import ColorPickerBox from '../../Atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const SeparatorSettings = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { statesName, activeDevice } = usePagesCtx();

  const [sepWidth, setSepWidth] = useState<number>(1);
  const [sepHeight, setSepHeight] = useState<number>(1);
  const [sepColor, setSepColor] = useState<any>();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const styleRef = useRef<any>(null);

  useEffect(() => {

    const _sepColor = getStylesFromCtx("border-color", 0);
    if(_sepColor){
      setSepColor(_sepColor);
    }else{
      setSepColor("#fff");
    }

    let _sepWidth = getStylesFromCtx("margin-left", 0);
    _sepWidth = _sepWidth?.replace("%","");
    if(_sepWidth){
      setSepWidth(parseInt(_sepWidth));
    }else{
      setSepWidth(0);
    }
    

    let _sepHeight = getStylesFromCtx("border-width", 0);
    _sepHeight = _sepHeight?.replace("px", "");
    if(_sepHeight){
      setSepHeight(parseInt(_sepHeight));
    }else{
      setSepHeight(0);
    }
    

    const _sepStyle = getStylesFromCtx("border-style", 0);
    if(styleRef && styleRef.current){
      if(_sepStyle){
        styleRef.current.value = _sepStyle; 
      }else{
        styleRef.current.value = "none"; 
      }
    } 

  },[changeStyleOfElement, statesName, activeDevice]);
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  useEffect(()=>{
    let tempStyleCtx = getStyleOfElement();
    const ret = setStylesToCtx(["margin-right"], [`${sepWidth}%`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);
  }, [sepWidth])

  const setWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["margin-left"], [`${e.target.value}%`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

    setSepWidth(parseInt(e.target.value));

  }

  const setHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["border-width"], [`${e.target.value}px`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

    setSepHeight(parseInt(e.target.value));

  }

  const handleSepColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["border-color"], [`${color}`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);
    
    setSepColor(color);
  }
  
  const setSeparatorStyle = (e:React.ChangeEvent<HTMLSelectElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["border-style"], [`${e.target.value}`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "separator_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("separator_setting")}>
        Separator Settings
      </div>
      <div style={{ display:`${selectedSetting === "separator_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>


        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={styleRef} format={OutlinedFormat} label="Style" items={BorderTypeItems} onChange={(e:any)=>setSeparatorStyle(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} label="Width" min={1} max={100} step={1} defaultValue={sepWidth} onChange={(e:any)=>setWidth(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} label="Height" min={1} max={100} step={1} defaultValue={sepHeight} onChange={(e:any)=>setHeight(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <ColorPickerBox name="Separator Color" colorHex={sepColor} retColor={handleSepColorChange} />
        </div>

      </div>

    </Fragment>
  );

}

export default SeparatorSettings;
