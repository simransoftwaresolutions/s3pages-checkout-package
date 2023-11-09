import React, { Fragment, useState } from 'react';
import styles from './FaqRowSetting.module.css';
import FaqStyleSelectorSetting from '../../StyleSettings/FaqStyleSelectorSetting';
import FaqSetting from '../../StyleSettings/FaqSetting';
import RowPadding from '../../StyleSettings/RowPadding';
import RowMargin from '../../StyleSettings/RowMargin';
import RowBackground from '../../StyleSettings/RowBackground';
import RowBorder from '../../StyleSettings/RowBorder';
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
