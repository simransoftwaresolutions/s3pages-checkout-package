import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/ProBarSettings.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { ProStyleItems, ProStripeItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import ColorPickerBox from '../../Atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const ProBarSettings = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const [text, setText] = useState('');
  const [height, setHeight] = useState<number>(0);
  const [textPer, setTextPer] = useState('');
  const proStyle = useRef<any>(null);
  const proStripe = useRef<any>(null);
  const [barColor, setBarColor] = useState<any>();
  const { activeDevice } = usePagesCtx();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();
    const styleType = tempStyleCtx?.styleType;
    const stripe = tempStyleCtx?.stripe;
    
    const styleEle = proStyle.current;
    const stripeEle = proStripe.current;

    const text = tempStyleCtx?.text;
    const progress = tempStyleCtx?.progress;

    setText(text);
    setTextPer(progress);

    if(styleEle){
      styleEle.value = styleType;
    }

    if(stripeEle){
      stripeEle.value = stripe;
    }

    const _barColor = getStylesFromCtx("background-color", 0);
    if(_barColor){
      setBarColor(_barColor);
    }else{
      setBarColor("#fff");
    }

    let _height = getStylesFromCtx("height", 1);
    _height = _height?.replace("px", "");
    if(_height){
      setHeight(parseInt(_height));
    }else{
      setHeight(0);
    }

  }, [changeStyleOfElement, activeDevice]);
 
  const handleBarColorChange = (color:any) => {

    let tempStyleCtx  = getStyleOfElement();

    const ret = setStylesToCtx(["background-color"], [`${color}`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);
    
    setBarColor(color);
  }
 
  const handleHeight = (e:any) => {
    let tempStyleCtx  = getStyleOfElement();

    const ret = setStylesToCtx(["height"], [`${e.target.value}px`], 1);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 1);
    setStyleOfElement(tempStyleCtx);
    
    setHeight(parseInt(e.target.value));
  }
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const setProSettings = (type:string, e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx = getStyleOfElement();
    switch(type){
      case 'style':
        tempStyleCtx.styleType = e.target.value;
        break;
      case 'stripe':
        tempStyleCtx.stripe = e.target.value;
        break;
    }

    setStyleOfElement(tempStyleCtx);

  }

  const setBtnText = (e:React.ChangeEvent<HTMLInputElement>) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.text = e.target.value;
    setStyleOfElement(tempStyleCtx);

    setText(e.target.value);
  }

  const setBtnTextPer = (e:React.ChangeEvent<HTMLInputElement>) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.progress = e.target.value;
    setStyleOfElement(tempStyleCtx);

    setTextPer(e.target.value);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "pro_gen_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("pro_gen_setting")}>
        General Settings
      </div>
      <div style={{ display:`${selectedSetting === "pro_gen_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text format={OutlinedFormat} id="pro_gen_per" label="Progress %" defaultValue={textPer} type="text" onChange={(e:any)=>setBtnTextPer(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text format={OutlinedFormat} id="pro_gen_text" label="Progress Text" defaultValue={text} type="text" onChange={(e:any)=>setBtnText(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Range displayValue={true} format={OutlinedFormat} label="Height" min={8} max={200} step={1} defaultValue={height} onChange={(e:any)=>handleHeight(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={proStripe} format={OutlinedFormat} id="pro_gen_stripe" label="Stripe" items={ProStripeItems} onChange={(e:any)=>setProSettings('stripe',e)} />
        </div>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <ColorPickerBox name="Icon Color" colorHex={barColor} retColor={handleBarColorChange} />
        </div>

      </div>

    </Fragment>
  );

}

export default ProBarSettings;
