import React, { Fragment } from 'react';
import styles from './MyTemplatesSettings.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { setClassesName, deepCloneArray } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import DefaultImage from '../../Atoms/DefaultImage';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const MyTemplatesSettings = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { sectionCtx, setSectionCtx, myTemplatesNameCtx } = useContentCtx();
  const { changeStyleOfElement } = useContentCtx();
  const [ sectionId, setSectionId ] = useState<string>("");

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  useEffect(()=>{
    const _temp = deepCloneArray(sectionCtx);
    const _sectionId = _temp[changeStyleOfElement.sectionIdx]?.eleInfo?.sectionId;
    setSectionId(_sectionId || "");
    
  }, [changeStyleOfElement]);

  const handleTemplate = (id:any) => {
    const _temp = deepCloneArray(sectionCtx);
    if(changeStyleOfElement.sectionIdx !== undefined){
      _temp[changeStyleOfElement.sectionIdx].eleInfo.myTemplateId = id;
    }
    setSectionCtx(_temp);
  }

  const handleSectionId = (e:any) => {
    const _temp = deepCloneArray(sectionCtx);
    if(changeStyleOfElement.sectionIdx !== undefined){
      _temp[changeStyleOfElement.sectionIdx].eleInfo.sectionId = e.target.value;
    }
    setSectionCtx(_temp);
    setSectionId(e.target.value);
  }
  
  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "mytemp_setting" ? "" : ""}`} onClick={()=>displaySubSetting("mytemp_setting")}>
        My Templates Settings
      </div>
      <div style={{ display:`${selectedSetting === "mytemp_setting" ? "block" : "block"}`, backgroundColor:"#0e0e0e" }}>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text format={OutlinedFormat} label="Template ID" defaultValue={sectionId} type="string" onChange={(e:any)=>handleSectionId(e)} />
        </div>

        <div>
          {
            myTemplatesNameCtx?.map((ele:any, key:number) =>{
              return (
                <div className={styles.imgContainer} key={key}>
                  {ele?.img ? <img src={ele?.img} onClick={()=>handleTemplate(ele?.id)}/> : <DefaultImage />}
                </div>
              )
            })
          }          
        </div>
      </div>

    </Fragment>
  );

}

export default MyTemplatesSettings;
