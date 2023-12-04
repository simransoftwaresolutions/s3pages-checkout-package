import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/FunnelSetting.module.css';
import { Text, TextArea } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { deepCloneArray } from '../../../../../utils/functions';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const FunnelSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { curEleCtx, setCurEleCtx } = usePushCtx();

  const [ title, setTitle ] = useState<string>('');
  const [ metaTitle, setMetaTitle ] = useState<string>('');
  const [ headTracking, setHeadTracking ] = useState<string>('');
  const [ redirectUrl, setRedirectUrl ] = useState<string>('');
  const [ url, setUrl ] = useState<string>('');
  const [ metaDesc, setMetaDesc ] = useState<string>('');
  const [ bodyTracking, setBodyTracking ] = useState<string>('');
  
  const handleTitle = (e:any) => {
    setTitle(e.target.value);
  }

  const handleMetaTitle = (e:any) => {
    setMetaTitle(e.target.value);
  }

  const handleHeadTracking = (e:any) => {
    setHeadTracking(e.target.value);
  }

  const handleRedirectUrl = (e:any) => {
    setRedirectUrl(e.target.value);
  }

  const handleUrl = (e:any) => {
    setUrl(e.target.value);
  }

  const handleMetaDesc = (e:any) => {
    setMetaDesc(e.target.value);
  }
  
  const handleBodyTracking = (e:any) => {
    setBodyTracking(e.target.value);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} active_subsetting`}>
        Settings
      </div>
      <div style={{ backgroundColor:"#0e0e0e" }}>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Title" defaultValue={title} type="text" onChange={(e:any)=>handleTitle(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Meta Title" defaultValue={metaTitle} type="text" onChange={(e:any)=>handleMetaTitle(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <TextArea label="Head Tracking" format={OutlinedFormat} defaultValue={headTracking} onChangeTextarea={(e:any)=>handleHeadTracking(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Redirect Override Url" defaultValue={redirectUrl} type="text" onChange={(e:any)=>handleRedirectUrl(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Url" defaultValue={url} type="text" onChange={(e:any)=>handleUrl(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text label="Meta Description" defaultValue={metaDesc} type="text" onChange={(e:any)=>handleMetaDesc(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <TextArea label="Body Tracking" format={OutlinedFormat} defaultValue={bodyTracking} onChangeTextarea={(e:any)=>handleBodyTracking(e)} />
        </div>

      </div>

    </Fragment>
  );

}

export default FunnelSetting;
