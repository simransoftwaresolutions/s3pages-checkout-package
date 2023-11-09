import { Fragment } from 'react';
import styles from './BannerSetting.module.css';
import { Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { AnimationStyleItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { filebrowserCallback, deepCloneArray } from '../../../../../utils/functions';
import Filebrowser from '../../Atoms/Filebrowser';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const BannerSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  
  const [bannerImage, setBannerImage] = useState<string[]>([' ']);
  const [bannerNum, setBannerNum] = useState<number>(0);
  const [bannerImageRefs, setBannerImageRefs] = useState<any>([]);


  const bannerImageRef = useRef<any>([]);
  const bannerImageRefHdn = useRef<any>([]);
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  useEffect(()=>{

    if(bannerImage && bannerImage[bannerNum]){
      console.log(bannerImage[bannerNum]);
    }

  }, [bannerImage]);

  const handleBanner = (e:any, bIdx:number) => {
    const tempBannerImage = deepCloneArray(bannerImage);
    tempBannerImage[bIdx] = e.target.value;
    setBannerImage(tempBannerImage);
    setBannerNum(bIdx);
  }

  const addBannerImage = () => {
    const tempBannerImage = deepCloneArray(bannerImage);
    const bannerLength = bannerImage.length;
    tempBannerImage[bannerLength] = ' ';
    setBannerImage(tempBannerImage);
    setBannerNum(bannerLength);
  }

  const delBannerImage = (bIdx:number) => {
    const tempBannerImage = deepCloneArray(bannerImage);
    tempBannerImage.splice(bIdx, 1);
    setBannerImage(tempBannerImage);
    setBannerNum(0);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "banner_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("banner_setting")}>
        Banner Settings
      </div>
      <div style={{ display:`${selectedSetting === "banner_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        <div style={{padding:"10px"}}>
          <div className="btn btn-primary" key={"add"} onClick={()=>addBannerImage()}>Add</div>
            {
              bannerImage.map((bImg:any, bIdx) => {
                return (
                  <Fragment key={bIdx}>
                    <div className={`${styles.mainContainer}`}>
                      <Text refText={(el:any) => (bannerImageRef.current[bIdx] = el)} format={OutlinedFormat} label={`Banner Image${bIdx+1}`} defaultValue={bannerImage[bIdx]} type="text" onChange={ (e:any) => handleBanner(e, bIdx) }/>
                      <span className="btn btn-danger" onClick={()=>delBannerImage(bIdx)}>Delete</span>
                      <input ref={(el:any) => (bannerImageRefHdn.current[bIdx] = el)} value={bannerImage[bIdx]} type="hidden" onClick={(e:any)=>handleBanner(e, bIdx)} />
                      <span className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#fileBorwserModal" onClick={()=>setBannerImageRefs([bannerImageRef.current[bIdx], bannerImageRefHdn.current[bIdx]])}>Browse/Upload</span>
                    </div>
                  </Fragment>
                  )
              })
            }
        </div>

      </div>
      <Filebrowser setImageUrl={(url:string) => filebrowserCallback(url, bannerImageRefs)} />
    </Fragment>
  );

}

export default BannerSetting;
