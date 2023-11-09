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

const SiteSearchPageSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { pagesInfo, setPagesInfo } = usePagesCtx();

  const [ searchTitle, setSearchTitle ] = useState<string>('');
  const [ searchDesc, setSearchDesc ] = useState<string>('');
  const [ searchImage, setSearchImage ] = useState<string>('');

  useEffect(() => {

    if(pagesInfo?.isInfoUpdate) return;
    
    if(pagesInfo?.searchTitle){
      setSearchTitle(pagesInfo?.searchTitle);
    }else{
      setSearchTitle("");
    }
    
    if(pagesInfo?.searchDesc){
      setSearchDesc(pagesInfo?.searchDesc);
    }else{
      setSearchDesc("");
    }

    if(pagesInfo?.searchImage){
      setSearchImage(pagesInfo?.searchImage);
    }else{
      setSearchImage("");
    }

  }, [pagesInfo])

  const handleSearchTitle = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.searchTitle = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setSearchTitle(e.target.value);
  }

  const handleSearchDesc = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.searchDesc = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setSearchDesc(e.target.value);
  }

  const handleSearchImage = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.searchImage = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setSearchImage(e.target.value);
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
      <div className={`${styles.subSettingTitle} ${selectedSetting === "site_sub_page_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("site_sub_page_setting")}>
        Site Search Settings
      </div>
      <div style={{ display:`${selectedSetting === "site_sub_page_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Search Title" defaultValue={searchTitle} type="text" onBlur={(e:any)=>handleSearchTitle(e)} onChange={(e:any)=>setSearchTitle(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <TextArea label="Search Description" format={OutlinedFormat} defaultValue={searchDesc} onBlurTextarea={(e:any)=>handleSearchDesc(e)} onChangeTextarea={(e:any)=>setSearchDesc(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label=" Search Image" defaultValue={searchImage} type="text" onBlur={(e:any)=>handleSearchImage(e)} onChange={(e:any)=>setSearchImage(e.target.value)} />
        </div>

      </div>

    </Fragment>
  );

}

export default SiteSearchPageSetting;
