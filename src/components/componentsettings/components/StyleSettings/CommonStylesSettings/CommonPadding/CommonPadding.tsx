import { Fragment } from 'react';
import styles from './CommonPadding.module.css';
import { Range } from '../../../Atoms/Input';
import { useState, useEffect } from 'react';
import { useSettingsCtx } from "../../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../../context/pagepreview/PushContext";
import { setClassesName } from '../../../../../../utils/functions';
import { useContentCtx } from "../../../../../../context/pagepreview/ContentsContext";
import { usePagesCtx } from '../../../../../../context/pagepreview/PagesContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

interface PaddingProps {
  componentNumber:number;
  activeComponent:string; 
  setActiveComponent:any;
}

const CommonPadding = ({componentNumber, activeComponent, setActiveComponent}:PaddingProps) => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { commonStyleSelector, statesName, activeDevice } = usePagesCtx();

  const [openPadding, setOpenPadding] = useState(false);
  
  const [paddingVal, setPaddingVal] = useState<number>(10);
  const [paddingTopVal, setPaddingTopVal] = useState<number>(10);
  const [paddingRightVal, setPaddingRightVal] = useState<number>(10);
  const [paddingBottomVal, setPaddingBottomVal] = useState<number>(10);
  const [paddingLeftVal, setPaddingLeftVal] = useState<number>(10);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const strToPX = (str:string) => {
    const _str = str.replace("px", "");
    return parseInt(_str);
  }  

  useEffect(() => {

    const padding = getStylesFromCtx("padding", componentNumber);

    if(padding){
      const paddingData = padding.split(" ");

      if(paddingData[0] === paddingData[1] && paddingData[0] === paddingData[2] && paddingData[0] === paddingData[3]){
        setPaddingVal(strToPX(paddingData[0]));
        setOpenPadding(false);
      }else{
        setPaddingVal(0);
        setOpenPadding(true);
      }

      setPaddingTopVal(strToPX(paddingData[0]));
      setPaddingRightVal(strToPX(paddingData[1]));
      setPaddingBottomVal(strToPX(paddingData[2]));
      setPaddingLeftVal(strToPX(paddingData[3]));
    }else{
      setPaddingVal(0);
      setPaddingTopVal(0);
      setPaddingRightVal(0);
      setPaddingBottomVal(0);
      setPaddingLeftVal(0);
    }

  },[changeStyleOfElement, commonStyleSelector, statesName, activeDevice]);

  const displayPadding = () => {
    setOpenPadding(!openPadding);
  }
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const setPadding = (position:string, e: React.ChangeEvent<HTMLInputElement>) => {

    let tempStyleCtx = getStyleOfElement();

    let paddingData:any = [];
    const padding = getStylesFromCtx("padding", componentNumber);

    if(padding){
      paddingData = padding.split(" ");
    }else{
      paddingData[0] = "0px";
      paddingData[1] = "0px";
      paddingData[2] = "0px";
      paddingData[3] = "0px";
    }

    
    switch(position){
      case "padding":
   
        const paddingStr = parseInt(e.target.value) + 'px ' + parseInt(e.target.value) + 'px ' + parseInt(e.target.value) + 'px ' + parseInt(e.target.value) + 'px';

        setPaddingVal(parseInt(e.target.value));
        setPaddingTopVal(parseInt(e.target.value));
        setPaddingRightVal(parseInt(e.target.value));
        setPaddingBottomVal(parseInt(e.target.value));
        setPaddingLeftVal(parseInt(e.target.value));

        const ret = setStylesToCtx(["padding"], [paddingStr], componentNumber);
        tempStyleCtx = setClassesName(ret, tempStyleCtx, componentNumber);
        setStyleOfElement(tempStyleCtx);

        break;
      case "top":
        
        const topPaddingStr = parseInt(e.target.value) + 'px ' + paddingData[1] + ' ' + paddingData[2] + ' ' + paddingData[3];
        
        setPaddingTopVal(parseInt(e.target.value));

        const retTop = setStylesToCtx(["padding"], [topPaddingStr], componentNumber);
        tempStyleCtx = setClassesName(retTop, tempStyleCtx, componentNumber);
        setStyleOfElement(tempStyleCtx);
        break;
      case "right":
                
        const rightPaddingStr = paddingData[0] + ' ' + parseInt(e.target.value) + 'px ' + paddingData[2] + ' ' + paddingData[3];
        
        setPaddingRightVal(parseInt(e.target.value));

        const retRight = setStylesToCtx(["padding"], [rightPaddingStr], componentNumber);
        tempStyleCtx = setClassesName(retRight, tempStyleCtx, componentNumber);
        setStyleOfElement(tempStyleCtx);
        break;
      case "bottom":
                        
        const bottomPaddingStr = paddingData[0] + ' ' + paddingData[1] + ' ' + parseInt(e.target.value) + 'px ' + paddingData[3];
        
        setPaddingBottomVal(parseInt(e.target.value));

        const retBottom = setStylesToCtx(["padding"], [bottomPaddingStr], componentNumber);
        tempStyleCtx = setClassesName(retBottom, tempStyleCtx, componentNumber);
        setStyleOfElement(tempStyleCtx);
        break;
      case "left":
                                
        const leftPaddingStr = paddingData[0] + ' ' + paddingData[1] + ' ' + paddingData[2] + ' ' + parseInt(e.target.value) + 'px';

        setPaddingLeftVal(parseInt(e.target.value));

        const retLeft = setStylesToCtx(["padding"], [leftPaddingStr], componentNumber);
        tempStyleCtx = setClassesName(retLeft, tempStyleCtx, componentNumber);
        setStyleOfElement(tempStyleCtx);
        break;
      default:
        break;
    }
  }

  const [ open, setOpen] = useState<boolean>(false);
  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${open ? "active_common_settings" : ""}`} onClick={()=>setOpen(!open)}>
        Padding Settings <span style={{ float:"right" }}>{open ? <KeyboardArrowUpIcon fontSize='medium'/> : <KeyboardArrowDownIcon fontSize='medium'/>}</span>
      </div>
      <div style={{ display:`${open ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} id="padding" label="Padding" min={-50} max={400} step={1} defaultValue={paddingVal} onChange={(e:any)=>setPadding('padding', e)} />
          <div className={`${styles.advSet}`} onClick={displayPadding}>Advanced Settings</div>
          <div style={{ display:`${openPadding === true ? "block" : "none"}` }} className={`${styles.stMrgPdg}`}>
            <Range displayValue={true} format={OutlinedFormat} id="padding_top" label="Top" min={-50} max={400} step={1} defaultValue={paddingTopVal} onChange={(e:any)=>setPadding('top', e)} />
            <Range displayValue={true} format={OutlinedFormat} id="padding_right" label="Right" min={-50} max={400} step={1} defaultValue={paddingRightVal} onChange={(e:any)=>setPadding('right', e)} />
            <Range displayValue={true} format={OutlinedFormat} id="padding_bottom" label="Bottom" min={-50} max={400} step={1} defaultValue={paddingBottomVal} onChange={(e:any)=>setPadding('bottom', e)} />
            <Range displayValue={true} format={OutlinedFormat} id="padding_left" label="Left" min={-50} max={400} step={1} defaultValue={paddingLeftVal} onChange={(e:any)=>setPadding('left', e)} />
          </div>
        </div>
      </div>
    </Fragment>
  );

}

export default CommonPadding;
