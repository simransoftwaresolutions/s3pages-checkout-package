import { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/Mobile.module.css';
import { Select } from '../../Atoms/Input';
import { useState, useRef, useEffect } from 'react';
import { MobileStyleItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const Mobile = () => {
  
  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const mobileRef = useRef<any>(null);

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  
  useEffect(() => {

    let tempStyleCtx  = getStyleOfElement();
    if(mobileRef && mobileRef?.current){
      if(tempStyleCtx.mobileView){
        mobileRef.current.value = tempStyleCtx.mobileView;
      }else{
        mobileRef.current.value = true;
      }
    } 

  },[changeStyleOfElement]);

  const setMobile = (e:any) => {
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.mobileView = e.target.value
    setStyleOfElement(tempStyleCtx);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "mobile_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("mobile_setting")}>
        Mobile Settings
      </div>
      <div style={{ display:`${selectedSetting === "mobile_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={mobileRef} format={OutlinedFormat} id="mobile_display" label="Mobile Display" items={MobileStyleItems} onChange={(e:any)=>setMobile(e)} />
        </div>
      </div>

    </Fragment>
  );

}

export default Mobile;
