import React, { Fragment } from 'react';
import styles from './BannerContentSetting.module.css';
import { Text, Range, Select } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { deepCloneArray, setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import { GetCollectionData } from "../../../../../service/pagepreview/PagesServices";

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const BannerContentSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement, bannerCollectionId } = useSettingsCtx();
  const { commonStyleSelector, statesName } = usePagesCtx();
  const [ fieldSelctData, setFieldSelctData] = useState<any[]>([]);
  const [ collectionData, setCollectionData] = useState<any>({});
  const qfieldRef = useRef<any>(null);

  const { changeStyleOfElement } = useContentCtx();

  useEffect(() => {

    const init = async() => {
      if(bannerCollectionId !== undefined){
        await populateCollectionData(bannerCollectionId);
        let tempStyleCtx = getStyleOfElement();
        if(qfieldRef && qfieldRef?.current && bannerCollectionId !== undefined) qfieldRef.current.value = tempStyleCtx?.contentIdx;
      }
    }

    init();
    
  },[changeStyleOfElement, bannerCollectionId]);

  const populateCollectionData = async(val:any) => {
    const collData = await GetCollectionData(val);

    if(collData?.status){
      setCollectionData(collData?.data || {});

      if(collData?.data?.fields?.length){
        const _fData = [{
          key:-1,
          label:"Select Field",
        }];

        for(let i=0; i<collData?.data?.fields?.length; i++){
          if(collData?.data?.fields[i]?.type !== "name" && collData?.data?.fields[i]?.type !== "slug" ){
            const _fSelctAtom = {
              key:collData?.data?.fields[i]?.index,
              label:collData?.data?.fields[i]?.name,
            }
            _fData.push(_fSelctAtom);
          }

        }
        setFieldSelctData(_fData);
      }
    }    
  }

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }


  const handleFieldName = (val:any) => {
    if(val === -1) return;

    if(collectionData?.collection_data?.length){
      
      let tempStyleCtx = getStyleOfElement();
      const _dataLimit = collectionData.collection_data.length;
      let que = [];

      for(let i=0; i<_dataLimit; i++){
        for(let j=0; j<collectionData?.collection_data[i]?.fields?.length; j++){
          if(collectionData?.collection_data[i]?.fields[j]?.index === val){
            que.push(collectionData?.collection_data[i]?.fields[j]?.value || "");
          }
        }
      }

      tempStyleCtx.bannerData.content = que;

      tempStyleCtx.contentIdx = val;
      setStyleOfElement(tempStyleCtx);
    }

  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "banner_content_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("banner_content_setting")}>
        Content Settings
      </div>
      <div style={{ display:`${selectedSetting === "banner_content_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        
        {
          (fieldSelctData?.length && fieldSelctData.length-1) ?
          (
            <Fragment>
              <div className={`${styles.mainContainer} inner_setting`}>
                <Select selRef={qfieldRef} format={OutlinedFormat} label="Content Field" items={fieldSelctData} onChange={(e:any)=>handleFieldName(parseInt(e.target.value))} />
              </div>
            </Fragment>
          ):(<></>)
        }

      </div>
    </Fragment>
  );

}

export default BannerContentSetting;
