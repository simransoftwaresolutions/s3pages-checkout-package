import { Fragment, useEffect } from 'react';
import styles from '../../../../../styles/componentsettings/BoxShadowSetting.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useRef } from 'react';
import { AnimationStyleItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import ColorPickerBox from '../../Atoms/ColorPickerBox';
import { setClassesName } from '../../../../../utils/functions';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';

const BoxShadowSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { activeDevice } = usePagesCtx();
  
  const [ hShadow, setHShadow ] = useState<number>(0);
  const [ vShadow, setVShadow ] = useState<number>(0);
  const [ blurRad, setBlurRad ] = useState<number>(0);
  const [ spreadRad, setSpreadRad ] = useState<number>(0);
  const [shadowColor, setShadowColor] = useState<any>();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

    const _boxShadow = getStylesFromCtx("box-shadow");

    const _bShadowArr = _boxShadow.split(" ");

    if(_bShadowArr && _bShadowArr[0]){
      setHShadow(parseInt(_bShadowArr[0].replace("px","")));
    }else{
      setHShadow(0);
    }

    if(_bShadowArr && _bShadowArr[1]){
      setVShadow(parseInt(_bShadowArr[1].replace("px","")));
    }else{
      setVShadow(0);
    }

    if(_bShadowArr && _bShadowArr[2]){
      setBlurRad(parseInt(_bShadowArr[2].replace("px","")));
    }else{
      setBlurRad(0);
    }

    if(_bShadowArr && _bShadowArr[3]){
      setSpreadRad(parseInt(_bShadowArr[3].replace("px","")));
    }else{
      setSpreadRad(0);
    }

    if(_bShadowArr && _bShadowArr[4]){
      setShadowColor(_bShadowArr[4]);
    }else{
      setShadowColor("#fff");
    }

  }, [changeStyleOfElement, activeDevice]);

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const saveBoxShadow = (hShadowVal:number, vShadowVal:number, blurRadVal:number, spreadRadVal:number, shadowColorVal:any) => {

    let value = `${hShadowVal}px ${vShadowVal}px ${blurRadVal}px ${spreadRadVal}px ${shadowColorVal}`;
    let tempStyleCtx  = getStyleOfElement();
    const ret = setStylesToCtx(["box-shadow"], [`${value}`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);
    setStyleOfElement(tempStyleCtx);

  }

  const handleHShadow = (e:any) => {
    setHShadow(parseInt(e.target.value));
    saveBoxShadow(parseInt(e.target.value), vShadow, blurRad, spreadRad, shadowColor);
  }

  const handleVShadow = (e:any) => {
    setVShadow(parseInt(e.target.value));
    saveBoxShadow(hShadow, parseInt(e.target.value), blurRad, spreadRad, shadowColor);
  }

  const handleBlurRad = (e:any) => {
    setBlurRad(parseInt(e.target.value));
    saveBoxShadow(hShadow, vShadow, parseInt(e.target.value), spreadRad, shadowColor);
  }

  const handleSpreadRad = (e:any) => {
    setSpreadRad(parseInt(e.target.value));
    saveBoxShadow(hShadow, vShadow, blurRad, parseInt(e.target.value), shadowColor);
  }

  const handleShadowColor = (color:any) => {
    setShadowColor(color);
    saveBoxShadow(hShadow, vShadow, blurRad, spreadRad, color);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "box_shadow_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("box_shadow_setting")}>
        Box Shadow Settings
      </div>
      <div style={{ display:`${selectedSetting === "box_shadow_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Range displayValue={true} label="H shadow" min={0} max={100} step={1} defaultValue={hShadow} onChange={(e:any)=>handleHShadow(e)} />
        </div>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Range displayValue={true} label="V shadow" min={0} max={100} step={1} defaultValue={vShadow} onChange={(e:any)=>handleVShadow(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Range displayValue={true} label="Blur" min={0} max={100} step={1} defaultValue={blurRad} onChange={(e:any)=>handleBlurRad(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Range displayValue={true} label="Spread" min={0} max={100} step={1} defaultValue={spreadRad} onChange={(e:any)=>handleSpreadRad(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <ColorPickerBox name="Color" colorHex={shadowColor} retColor={handleShadowColor} />
        </div>
      </div>
    </Fragment>
  );

}

export default BoxShadowSetting;
