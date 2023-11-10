import React, { Fragment, useState } from 'react';
import styles from '../../../../../styles/componentsettings/FaqGenSetting.module.css';
import FaqStyleSelectorSetting from '../../StyleSettings/FaqStyleSelectorSetting';
import FaqSetting from '../../StyleSettings/FaqSetting';
import Border from '../../StyleSettings/Border';
import Background from '../../StyleSettings/Background';
import Padding from '../../StyleSettings/Padding';
import Margin from '../../StyleSettings/Margin';

const FaqGenSetting = () => {

  const [ openSetting, setOpenSetting ] = useState<boolean>(true);

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle}`} onClick={()=>setOpenSetting(!openSetting)}>
        General Settings
      </div>
      <div style={{ display:`${openSetting ? "block" : "none"}`, backgroundColor:"#1d1d1d", padding:"10px 10px 10px 10px", border:"1px solid #fff" }}>
        <FaqStyleSelectorSetting />
        <FaqSetting />
        <Border />
        <Background />
        <Padding />
        <Margin />
      </div>

    </Fragment>
  );

}

export default FaqGenSetting;
