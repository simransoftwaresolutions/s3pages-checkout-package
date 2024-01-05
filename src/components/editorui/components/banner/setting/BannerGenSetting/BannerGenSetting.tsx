import { Fragment, useState } from 'react';
import styles from '../../../../../../styles/editorui/BannerGenSetting.module.css';
import StyleSelectorSettings from '../../../commonsettings/StyleSelectorSettings';
import BannerSelectionSetting from '../BannerSelectionSetting';
import Border from '../../../commonsettings/Border';
import Background from '../../../commonsettings/Background';
import Padding from '../../../commonsettings/Padding';
import Margin from '../../../commonsettings/Margin';

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
