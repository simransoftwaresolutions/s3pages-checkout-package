import { Fragment, useState } from 'react';
import styles from '../../../../../../styles/editorui/FaqRowSetting.module.css';
import RowPadding from '../RowPadding';
import RowMargin from '../RowMargin';
import RowBackground from '../RowBackground';
import RowBorder from '../RowBorder';
import FaqRowStyleSelectorSetting from '../FaqRowStyleSelectorSetting';
const FaqRowSetting = () => {

  const [ openSetting, setOpenSetting ] = useState<boolean>(false);

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle}`} onClick={()=>setOpenSetting(!openSetting)}>
        Row Settings
      </div>
      <div style={{ display:`${openSetting ? "block" : "none"}`, backgroundColor:"#1d1d1d", padding:"10px 10px 10px 10px", border:"1px solid #fff" }}>
        <FaqRowStyleSelectorSetting />
        <RowPadding />
        <RowMargin />
        <RowBorder />
        <RowBackground />
      </div>

    </Fragment>
  );

}

export default FaqRowSetting;
