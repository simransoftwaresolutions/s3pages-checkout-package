import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/FaqSetting.module.css';
import { Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { deepCloneArray, setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import { GetAllCollectionData } from "../../../../../service/pagepreview/PagesServices";
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import ColorPickerBox from '../../Atoms/ColorPickerBox';
const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const FaqSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement, setFaqCollectionId } = useSettingsCtx();
  const { getStylesFromCtxForFaq, setStylesToCtxForFaq } = useSettingsCtx();
  const { queryData } = usePagesCtx();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const [ collSelctData, setCollSelctData] = useState<any[]>([]);
  const [ arrowColor, setArrowColor] = useState<string>("#555");

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
      setFaqCollectionId(tempStyleCtx?.collectionId);
    } 

    const arrowColor = getStylesFromCtxForFaq("color", 'faqarw', 0);

    if(arrowColor){
      setArrowColor(arrowColor);
    }else{
      setArrowColor("#555");
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

    setFaqCollectionId(e.target.value);
    // populateCollectionData(e.target.value);
  }

  const handleArrowColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();
    setArrowColor(color);

    const ret = setStylesToCtxForFaq(["color"], [`${color}`], 'faqarw',0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "faq_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("faq_setting")}>
        General
      </div>
      <div style={{ display:`${selectedSetting === "faq_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={collRef} format={OutlinedFormat} label="Select Collection" items={collSelctData} onChange={(e:any)=>handleCollectionName(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <ColorPickerBox name="Toggle Icon Color" colorHex={arrowColor} retColor={handleArrowColorChange} />
        </div>

      </div>

    </Fragment>
  );

}

export default FaqSetting;
