import { Fragment } from 'react';
import styles from '../../../../../../styles/editorui/BannerSelectionSetting.module.css';
import { Select } from '../../../../atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../../context/editorui/SettingsContext";
import { useContentCtx } from "../../../../../../context/editorui/ContentsContext";
import { GetAllCollectionData } from "../../../../../../service/editorui/PagesServices";
import { usePagesCtx } from '../../../../../../context/editorui/PagesContext';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const BannerSelectionSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement, setBannerCollectionId } = useSettingsCtx();
  const { queryData } = usePagesCtx();
  const { changeStyleOfElement } = useContentCtx();
  const [ collSelctData, setCollSelctData] = useState<any[]>([]);
  const collRef = useRef<any>(null);

  useEffect(()=>{

    const getCollectionData = async() => {
      const collData = await GetAllCollectionData(queryData.funnelId);
      if(collData?.status && collData?.data?.length ){
        
        let _collSelctData:any[] = [{
          key:0,
          label:"Select Collection",
        }];
        for(let i=0; i<collData?.data?.length;i++){
          const _collSelctAtom = {
            key:collData?.data[i]?.id,
            label:collData?.data[i]?.name,
          }
          _collSelctData.push(_collSelctAtom);
        }
        setCollSelctData(_collSelctData);
      }
    }

    getCollectionData();
  }, [changeStyleOfElement])

  useEffect(() => {

    const init = async() => {
      let tempStyleCtx = getStyleOfElement();
      if(collRef && collRef?.current && tempStyleCtx.collectionId !== undefined) collRef.current.value = tempStyleCtx?.collectionId;
    }

    init();
    
  },[changeStyleOfElement, collSelctData]);

  useEffect(() => {
    let tempStyleCtx = getStyleOfElement();
    if(collRef && collRef?.current && tempStyleCtx.collectionId !== undefined){
      collRef.current.value = tempStyleCtx?.collectionId;
      setBannerCollectionId(tempStyleCtx?.collectionId);
    } 
  },[changeStyleOfElement]);
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }
  

  const handleCollectionName = async(e:any) => {
    if(!e.target.value) return;

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.collectionId = e.target.value;
    setStyleOfElement(tempStyleCtx);

    setBannerCollectionId(e.target.value);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "banner_selection_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("banner_selection_setting")}>
        General
      </div>
      <div style={{ display:`${selectedSetting === "banner_selection_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={collRef} format={OutlinedFormat} label="Select Collection" items={collSelctData} onChange={(e:any)=>handleCollectionName(e)} />
        </div>

      </div>

    </Fragment>
  );

}

export default BannerSelectionSetting;
