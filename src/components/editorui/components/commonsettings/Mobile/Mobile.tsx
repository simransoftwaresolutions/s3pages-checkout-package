import { Fragment } from 'react';
import styles from '../../../../../styles/editorui/Mobile.module.css';
import { Select } from '../../../atoms/Input';
import { useRef, useEffect } from 'react';
import { MobileStyleItems } from '../../../datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/editorui/SettingsContext";
import { useContentCtx } from "../../../../../context/editorui/ContentsContext";

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
