import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/OverlaySectionSettings.module.css';
import { Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import { deepCloneArray } from "../../../../../utils/functions";
import DefaultImage from "../../Atoms/DefaultImage";

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const ovPostion:any = [
  {
    key:"top",
    label:"Top"
  },
  {
    key:"bottom",
    label:"Bottom"
  },
  {
    key:"left",
    label:"Left"
  },
  {
    key:"right",
    label:"Right"
  },
  {
    key:"top-left",
    label:"Top Left"
  },
  {
    key:"top-right",
    label:"Top Right"
  },
  {
    key:"bottom-left",
    label:"Bottom Left"
  },
  {
    key:"bottom-right",
    label:"Bottom Right"
  },
  {
    key:"center",
    label:"Center"
  },
  {
    key:"full-screen",
    label:"Full Screen"
  },
];


const OverlaySectionSettings = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { statesName, activeDevice } = usePagesCtx();
  const { sectionCtx, setSectionCtx, myOverlayNameCtx } = useContentCtx();

  const ovPosRef = useRef<any>(null);

  const { changeStyleOfElement } = useContentCtx();
  const [ sectionId, setSectionId ] = useState<string>("");
  
  useEffect(()=>{
    const _temp = deepCloneArray(sectionCtx);
    const _sectionId = _temp[changeStyleOfElement.sectionIdx]?.eleInfo?.sectionId;
    setSectionId(_sectionId || "");

    const _ovPos = _temp[changeStyleOfElement.sectionIdx]?.eleInfo?.ovPosition; // for container or container-fluid
    if(ovPosRef?.current) ovPosRef.current.value = _ovPos || "top";
    
  }, [changeStyleOfElement]);

  const handleOverlay = (id:any) => {
    const _temp = deepCloneArray(sectionCtx);
    if(changeStyleOfElement.sectionIdx !== undefined){
      _temp[changeStyleOfElement.sectionIdx].eleInfo.myOverlayId = id;
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

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const handleOvPosition = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const _temp = deepCloneArray(sectionCtx);
    if(changeStyleOfElement.sectionIdx !== undefined){
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPosition = e.target.value;
    }
    setSectionCtx(_temp);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "overlaysec_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("overlaysec_setting")}>
        Overlay Settings
      </div>
      <div style={{ display:`${selectedSetting === "overlaysec_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Select selRef={ovPosRef} format={OutlinedFormat} label="Position" items={ovPostion} onChange={(e:any)=>handleOvPosition(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text format={OutlinedFormat} label="Template ID" defaultValue={sectionId} type="string" onChange={(e:any)=>handleSectionId(e)} />
        </div>

        <div>
          {
            myOverlayNameCtx?.map((ele:any, key:number) =>{
              return (
                <div className={styles.imgContainer} key={key}>
                  {ele?.img ? <img src={ele?.img} onClick={()=>handleOverlay(ele?.id)}/> : <DefaultImage />}
                </div>
              )
            })
          }          
        </div>

      </div>

    </Fragment>
  );

}

export default OverlaySectionSettings;
