import React, { Fragment } from 'react';
import styles from './MainPageSetting.module.css';
import { Text, TextArea, Select } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { deepCloneArray } from '../../../../../utils/functions';
import { usePagesCtx } from "../../../../../context/pagepreview/PagesContext";

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const isDefaultItems = [
  {
    key: 1,
    label: "Yes"
  },
  {
    key: 0,
    label: "No"
  }
];

const SeoPageSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { pagesInfo, setPagesInfo } = usePagesCtx();

  const [ metaTitle, setMetaTitle ] = useState<string>('');
  const [ metaDesc, setMetaDesc ] = useState<string>('');
  const [ url, setUrl ] = useState<string>('');

  const isDefaultRef = useRef<any>(null);

  useEffect(() => {

    if(pagesInfo?.isInfoUpdate) return;
    
    if(pagesInfo?.metaTitle){
      setMetaTitle(pagesInfo?.metaTitle);
    }else{
      setMetaTitle("");
    }

    if(pagesInfo?.metaDesc){
      setMetaDesc(pagesInfo?.metaDesc);
    }else{
      setMetaDesc("");
    }

    if(pagesInfo?.url){
      setUrl(pagesInfo?.url);
    }else{
      setUrl("");
    }

    if(isDefaultRef?.current){
      if(pagesInfo?.isDefault){
        isDefaultRef.current.value = pagesInfo?.isDefault;
      }else{
        isDefaultRef.current.value = 0;
      }
    }

  }, [pagesInfo])

  const handleMetaTitle = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.metaTitle = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setMetaTitle(e.target.value);
  }

  const handleMetaDesc = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.metaDesc = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setMetaDesc(e.target.value);
  }

  const handleUrl = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.url = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setUrl(e.target.value);
  }

  const handleDefault = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.isDefault = parseInt(e.target.value);
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
  }

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "seo_sub_page_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("seo_sub_page_setting")}>
        SEO Settings
      </div>
      <div style={{ display:`${selectedSetting === "seo_sub_page_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Meta Title" defaultValue={metaTitle} type="text" onBlur={(e:any)=>handleMetaTitle(e)} onChange={(e:any)=>setMetaTitle(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Meta Description" defaultValue={metaDesc} type="text" onBlur={(e:any)=>handleMetaDesc(e)} onChange={(e:any)=>setMetaDesc(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="URL" defaultValue={url} type="text" onBlur={(e:any)=>handleUrl(e)} onChange={(e:any)=>setUrl(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={isDefaultRef} format={OutlinedFormat} label="Is Defalut" items={isDefaultItems} onChange={(e:any)=>handleDefault(e)} />
        </div>

      </div>

    </Fragment>
  );

}

export default SeoPageSetting;
