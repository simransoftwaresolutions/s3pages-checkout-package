import React, { Fragment } from 'react';
import styles from './TimerGeneralSetting.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { CounterTypeItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { deepCloneArray } from '../../../../../utils/functions';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment, { Moment } from "moment/moment.d";
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext'; 
import UrlAtom from '../../Atoms/ElementsAtoms/UrlAtom';
const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const TimerGeneralSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();

  const [datetime, setDatetime] = useState<string | Moment>(new Date().toDateString());
  const timerRef = useRef<any>(null);
  const [endMinutes, setEndMinutes] = useState<number>(0);
  const [countdownType, setCountdownType] = useState<string>('normal');
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const { statesName, activeDevice } = usePagesCtx();
  const [urlType, setUrlType] = useState<string>("");

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();

    const _datetime = tempStyleCtx?.timerGeneralData?.endDate;
    if(_datetime) setDatetime(_datetime);
    
    const _timerRef = tempStyleCtx?.timerGeneralData?.countdownType;
    if(timerRef && timerRef.current) timerRef.current.value = _timerRef;
    setCountdownType(_timerRef);
    
    const _endMinutes = tempStyleCtx?.timerGeneralData?.endMinutes;
    setEndMinutes(_endMinutes);
    
    const _redirectUrl = tempStyleCtx?.timerGeneralData?.redirectUrl;
    setRedirectUrl(_redirectUrl);

    const _urlType = tempStyleCtx?.timerGeneralData?.urlType;
    setUrlType(_urlType);
    
  },[changeStyleOfElement, statesName, activeDevice]);
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }


  const onChageDatetime = (date:string | Moment) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.timerGeneralData.endDate = date.valueOf();
    setStyleOfElement(tempStyleCtx);

    setDatetime(date);

  }

  
  // countdown type
  const setCounterType = (e:React.ChangeEvent<HTMLSelectElement>) => {
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.timerGeneralData.countdownType = e.target.value;
    setStyleOfElement(tempStyleCtx);

    setCountdownType(e.target.value);
  }

  
  // end date
  const handleEndMinutes = (e:any) => {

    let min = Number.isNaN(e.target.value) ? 0 : parseInt(e.target.value);
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.timerGeneralData.endMinutes = min;
    tempStyleCtx.timerGeneralData.endMinutesDate = (Date.now() + (min * 60 * 1000));
    setStyleOfElement(tempStyleCtx);
    setEndMinutes(e.target.value);
  }
  
  // redirect Url
  const handleRedirectUrl = (val:string) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.timerGeneralData.redirectUrl = val;
    setStyleOfElement(tempStyleCtx);
    
    setRedirectUrl(val);
  }

  // redirect Url Type
  const handleUrlType = (val:string) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.timerGeneralData.urlType = val;
    setStyleOfElement(tempStyleCtx);
    
    setUrlType(val);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "gen_timer_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("gen_timer_setting")}>
        General
      </div>
      <div style={{ display:`${selectedSetting === "gen_timer_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={timerRef} format={OutlinedFormat} label="Counter Type" items={CounterTypeItems} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setCounterType(e)} />
        </div>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          {
            countdownType === 'evergreen' ? 
            (
              <div style={{color:"#000"}}>
                <span style={{color:"#fff"}}>End Date</span>
                <Datetime
                  value={datetime}
                  onChange={(date:string | Moment) => onChageDatetime(date)}
                  inputProps={{ placeholder: "Datetime Picker Here" }}
                />
              </div>
            ):(
              <div>
                <Text format={OutlinedFormat} label="Minutes" defaultValue={endMinutes} type="number" onChange={(e:any)=>handleEndMinutes(e)} />
              </div>
            )
          }
        </div>

        <div className={`${styles.mainContainer} url-atom-element`}>
          <UrlAtom getUrl={handleRedirectUrl} getUrlType={handleUrlType} urlTypeVal={urlType} menuUrlVal={redirectUrl} label="Redirect URL"/>
        </div>

      </div>

    </Fragment>
  );

}

export default TimerGeneralSetting;
