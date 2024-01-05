import { Fragment } from 'react';
import styles from '../../../../../styles/editorui/MainPageSetting.module.css';
import { Text } from '../../../atoms/Input';
import { useState, useEffect } from 'react';
import { useSettingsCtx } from "../../../../../context/editorui/SettingsContext";
import { deepCloneArray } from '../../../../../utils/functions';
import { usePagesCtx } from "../../../../../context/editorui/PagesContext";

const GeneralPageSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { pagesInfo, setPagesInfo } = usePagesCtx();

  const [ title, setTitle ] = useState<string>('');

  useEffect(() => {

    if(pagesInfo?.isInfoUpdate) return;
    
    if(pagesInfo?.title){
      setTitle(pagesInfo?.title);
    }else{
      setTitle("");
    }

  }, [pagesInfo])

  const handleTitle = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.title = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setTitle(e.target.value);
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
      <div className={`${styles.subSettingTitle} ${styles.subSettingTitleFirst} ${selectedSetting === "gen_sub_page_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("gen_sub_page_setting")}>
        General Settings
      </div>
      <div style={{ display:`${selectedSetting === "gen_sub_page_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Title" defaultValue={title} type="text" onBlur={(e:any)=>handleTitle(e)} onChange={(e:any)=>setTitle(e.target.value)} />
        </div>

      </div>

    </Fragment>
  );

}

export default GeneralPageSetting;
