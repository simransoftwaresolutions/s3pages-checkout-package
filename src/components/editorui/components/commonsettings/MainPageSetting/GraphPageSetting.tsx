import { Fragment } from 'react';
import styles from '../../../../../styles/editorui/MainPageSetting.module.css';
import { Text, TextArea } from '../../../atoms/Input';
import { useState, useEffect } from 'react';
import { useSettingsCtx } from "../../../../../context/editorui/SettingsContext";
import { deepCloneArray } from '../../../../../utils/functions';
import { usePagesCtx } from "../../../../../context/editorui/PagesContext";

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const GraphPageSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { pagesInfo, setPagesInfo } = usePagesCtx();

  const [ openGraphTitle, setOpenGraphTitle ] = useState<string>('');
  const [ openGraphDesc, setOpenGraphDesc ] = useState<string>('');
  const [ openGraphImage, setOpenGraphImage ] = useState<string>('');

  useEffect(() => {

    if(pagesInfo?.isInfoUpdate) return;
    
    if(pagesInfo?.openGraphTitle){
      setOpenGraphTitle(pagesInfo?.openGraphTitle);
    }else{
      setOpenGraphTitle("");
    }
    
    if(pagesInfo?.openGraphDesc){
      setOpenGraphDesc(pagesInfo?.openGraphDesc);
    }else{
      setOpenGraphDesc("");
    }

    if(pagesInfo?.openGraphImage){
      setOpenGraphImage(pagesInfo?.openGraphImage);
    }else{
      setOpenGraphImage("");
    }

  }, [pagesInfo])

  const handleOpenGraphTitle = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.openGraphTitle = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setOpenGraphTitle(e.target.value);
  }

  const handleOpenGraphDesc = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.openGraphDesc = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setOpenGraphDesc(e.target.value);
  }

  const handleOpenGraphImage = (e:any) => {
    const _pagesInfo = deepCloneArray(pagesInfo);
    _pagesInfo.openGraphImage = e.target.value;
    _pagesInfo.isInfoUpdate = true;
    setPagesInfo(_pagesInfo);
    setOpenGraphImage(e.target.value);
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
      <div className={`${styles.subSettingTitle} ${selectedSetting === "graph_sub_page_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("graph_sub_page_setting")}>
        Open Graph Setting
      </div>
      <div style={{ display:`${selectedSetting === "graph_sub_page_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Open Graph Title" defaultValue={openGraphTitle} type="text" onBlur={(e:any)=>handleOpenGraphTitle(e)} onChange={(e:any)=>setOpenGraphTitle(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <TextArea label="Open Graph Description" format={OutlinedFormat} defaultValue={openGraphDesc} onBlurTextarea={(e:any)=>handleOpenGraphDesc(e)} onChangeTextarea={(e:any)=>setOpenGraphDesc(e.target.value)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Open Graph Image" defaultValue={openGraphImage} type="text" onBlur={(e:any)=>handleOpenGraphImage(e)} onChange={(e:any)=>setOpenGraphImage(e.target.value)} />
        </div>

      </div>

    </Fragment>
  );

}

export default GraphPageSetting;
