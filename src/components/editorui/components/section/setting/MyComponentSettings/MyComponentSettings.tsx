import { Fragment } from 'react';
import styles from '../../../../../../styles/editorui/MyComponentSettings.module.css';
import { Select, Text } from '../../../../atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../../context/editorui/SettingsContext";
import { deepCloneArray } from '../../../../../../utils/functions';
import { useContentCtx } from "../../../../../../context/editorui/ContentsContext";
import { usePagesCtx } from '../../../../../../context/editorui/PagesContext';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const MyComponentSettings = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { sectionCtx, setSectionCtx, myComponentCtx } = useContentCtx();
  const { changeStyleOfElement } = useContentCtx();
  const { statesName, activeDevice } = usePagesCtx();
  const [ sectionId, setSectionId ] = useState<string>("");

  const myCompRef = useRef<any>(null);

  useEffect(()=>{
    const _temp = deepCloneArray(sectionCtx);

    const _key = _temp[changeStyleOfElement.sectionIdx]?.eleInfo?.myComponentKey;

    if(myCompRef && myCompRef?.current){
      myCompRef.current.value = _key || "";
    }

    const _sectionId = _temp[changeStyleOfElement.sectionIdx]?.eleInfo?.sectionId;
    setSectionId(_sectionId || "");

  }, [changeStyleOfElement, statesName, activeDevice]);

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const handleComponent = (e:any) => {
    const _temp = deepCloneArray(sectionCtx);
    const _labelObj = myComponentCtx.find(item => item.key === e.target.value);
    if(changeStyleOfElement.sectionIdx !== undefined){
      _temp[changeStyleOfElement.sectionIdx].eleInfo.myComponentKey = e.target.value;
      _temp[changeStyleOfElement.sectionIdx].eleInfo.myComponentName = _labelObj?.label;
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
      <div className={`${styles.subSettingTitle} ${selectedSetting === "mycomp_setting" ? "" : ""}`} onClick={()=>displaySubSetting("mycomp_setting")}>
        My Component Settings
      </div>
      <div style={{ display:`${selectedSetting === "mycomp_setting" ? "block" : "block"}`, backgroundColor:"#0e0e0e" }}>
        <div>
          <Select selRef={myCompRef} format={OutlinedFormat} label="Select Component" items={myComponentCtx} onChange={(e:any)=>handleComponent(e)} />
        </div>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Text format={OutlinedFormat} label="Component ID" defaultValue={sectionId} type="string" onChange={(e:any)=>handleSectionId(e)} />
        </div>
      </div>

    </Fragment>
  );

}

export default MyComponentSettings;
