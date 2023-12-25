import { Fragment, useEffect } from 'react';
import styles from '../../../../../styles/componentsettings/CommonStylesSettings.module.css';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CommonStyleSelectorSetting from './CommonStyleSelectorSetting';
import CommonPadding from './CommonPadding';
import CommonMargin from './CommonMargin';
import CommonBorder from './CommonBorder';
import CommonBackground from './CommonBackground';
import CommonFont from './CommonFont';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface CommonProps {
  componentName:string;
  componentNumber:number;
}

const CommonStylesSettings = ({
  componentName,
  componentNumber,
}:CommonProps) => {

  const [ open, setOpen] = useState<boolean>(false);
  const [ activeComponent, setActiveComponent] = useState<string>("");
  const [ showCommnSettings, setShowCommnSettings] = useState<boolean>(false);
 
  return (
    <Fragment>
        <div className={`${styles.subSettingTitle} ${open ? "active_subsetting" : ""}`} onClick={()=>setOpen(!open)}>
          {componentName} Settings <span style={{ float:"right" }}>{open ? <KeyboardArrowUpIcon fontSize='medium'/> : <KeyboardArrowDownIcon fontSize='medium'/>}</span>
        </div>
        <div style={{ display:`${open ? "block" : "none"}`, backgroundColor:"#0e0e0e", padding:"10px 0px 10px 0px" }}>
          <CommonStyleSelectorSetting componentNumber={componentNumber} activeComponent={activeComponent} setActiveComponent={setActiveComponent} showCommnSettings={showCommnSettings} setShowCommnSettings={setShowCommnSettings} />
          {
            showCommnSettings &&
            (
              <>
                <CommonFont componentNumber={componentNumber} activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
                <CommonPadding componentNumber={componentNumber} activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
                <CommonMargin componentNumber={componentNumber} activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
                <CommonBorder componentNumber={componentNumber} activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
                <CommonBackground componentNumber={componentNumber} activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
              </>
            )
          }

        </div>
    </Fragment>
  );

}

export default CommonStylesSettings;
