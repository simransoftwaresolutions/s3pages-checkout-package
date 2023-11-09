import React, { Fragment, useState } from 'react';
import styles from './BannerGenSetting.module.css';
import StyleSelectorSettings from '../../StyleSettings/StyleSelectorSettings';
import BannerSelectionSetting from '../../StyleSettings/BannerSelectionSetting';
import Border from '../../StyleSettings/Border';
import Background from '../../StyleSettings/Background';
import Padding from '../../StyleSettings/Padding';
import Margin from '../../StyleSettings/Margin';

const BannerGenSetting = () => {

  const [ openSetting, setOpenSetting ] = useState<boolean>(true);

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle}`} onClick={()=>setOpenSetting(!openSetting)}>
        General Settings
      </div>
      <div style={{ display:`${openSetting ? "block" : "none"}`, backgroundColor:"#1d1d1d", padding:"10px 10px 10px 10px", border:"1px solid #fff" }}>
        <StyleSelectorSettings />
        <BannerSelectionSetting />
        <Border />
        <Background />
        <Padding />
        <Margin />
      </div>

    </Fragment>
  );

}

export default BannerGenSetting;
