import React, { Fragment } from 'react';
import styles from './MainPageSetting.module.css';
import { Text, TextArea } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { deepCloneStyle, deepCloneSection, deepCloneArray } from '../../../../../utils/functions';
import { usePagesCtx } from "../../../../../context/pagepreview/PagesContext";

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const MainPageSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { curEleCtx, setCurEleCtx } = usePushCtx();
  const { pagesInfo, setPagesInfo } = usePagesCtx();

  const [ title, setTitle ] = useState<string>('');
  const [ metaTitle, setMetaTitle ] = useState<string>('');
  const [ headTracking, setHeadTracking ] = useState<string>('');
  const [ redirectUrl, setRedirectUrl ] = useState<string>('');
  const [ url, setUrl ] = useState<string>('');
  const [ metaDesc, setMetaDesc ] = useState<string>('');
  const [ bodyTracking, setBodyTracking ] = useState<string>('');

  useEffect(() => {

    if(pagesInfo?.isInfoUpdate) return;
    
    if(pagesInfo?.title){
      setTitle(pagesInfo?.title);
    }else{
      setTitle("");
    }

    if(pagesInfo?.metaTitle){
      setMetaTitle(pagesInfo?.metaTitle);
    }else{
      setMetaTitle("");
    }

    if(pagesInfo?.headTracking){
      setHeadTracking(pagesInfo?.headTracking);
    }else{
      setHeadTracking("");
    }

    if(pagesInfo?.redirectUrl){
      setRedirectUrl(pagesInfo?.redirectUrl);
    }else{
      setRedirectUrl("");
    }

    if(pagesInfo?.url){
      setUrl(pagesInfo?.url);
    }else{
      setUrl("");
    }

    if(pagesInfo?.metaDesc){
      setMetaDesc(pagesInfo?.metaDesc);
    }else{
      setMetaDesc("");
    }

    if(pagesInfo?.bodyTracking){
      setBodyTracking(pagesInfo?.bodyTracking);
    }else{
      setBodyTracking("");
    }

  }, [pagesInfo])

  const handleTitle = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.title = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setTitle(e.target.value);
  }

  const handleMetaTitle = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.metaTitle = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setMetaTitle(e.target.value);
  }

  const handleHeadTracking = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.headTracking = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setHeadTracking(e.target.value);
  }

  const handleRedirectUrl = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.redirectUrl = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setRedirectUrl(e.target.value);
  }

  const handleUrl = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.url = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setUrl(e.target.value);
  }

  const handleMetaDesc = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.metaDesc = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setMetaDesc(e.target.value);
  }
  
  const handleBodyTracking = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.bodyTracking = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setBodyTracking(e.target.value);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} active_subsetting`}>
        Page Settings
      </div>
      <div style={{ backgroundColor:"#0e0e0e" }}>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Title" defaultValue={title} type="text" onBlur={(e:any)=>handleTitle(e)} onChange={(e:any)=>setTitle(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Meta Title" defaultValue={metaTitle} type="text" onBlur={(e:any)=>handleMetaTitle(e)} onChange={(e:any)=>setMetaTitle(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <TextArea label="Head Tracking" format={OutlinedFormat} defaultValue={headTracking} onBlurTextarea={(e:any)=>handleHeadTracking(e)} onChangeTextarea={(e:any)=>setHeadTracking(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Redirect Override URL" defaultValue={redirectUrl} type="text" onBlur={(e:any)=>handleRedirectUrl(e)} onChange={(e:any)=>setRedirectUrl(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="URL" defaultValue={url} type="text" onBlur={(e:any)=>handleUrl(e)} onChange={(e:any)=>setUrl(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Meta Description" defaultValue={metaDesc} type="text" onBlur={(e:any)=>handleMetaDesc(e)} onChange={(e:any)=>setMetaDesc(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <TextArea label="Body Tracking" format={OutlinedFormat} defaultValue={bodyTracking} onBlurTextarea={(e:any)=>handleBodyTracking(e)} onChangeTextarea={(e:any)=>setBodyTracking(e.target.value)} />
        </div>

      </div>

    </Fragment>
  );

}

export default MainPageSetting;
