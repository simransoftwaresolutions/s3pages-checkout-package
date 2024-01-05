import { Fragment, useState } from 'react';
import styles from '../../../../../../styles/editorui/FaqGenSetting.module.css';
import FaqStyleSelectorSetting from '../FaqStyleSelectorSetting';
import FaqSetting from '../FaqSetting';
import Border from '../../../commonsettings/Border';
import Background from '../../../commonsettings/Background';
import Padding from '../../../commonsettings/Padding';
import Margin from '../../../commonsettings/Margin';

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
