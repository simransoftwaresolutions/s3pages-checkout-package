import React, { Fragment } from 'react';
import styles from '../../../../../../styles/editorui/CommonBorder.module.css';
import { Range, Select } from '../../../../atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { BorderTypeItems } from '../../../../datas/commonComponentData';
import { useSettingsCtx } from "../../../../../../context/editorui/SettingsContext";
import { setClassesName  } from '../../../../../../utils/functions';
import { useContentCtx } from "../../../../../../context/editorui/ContentsContext";
import ColorPickerBox from '../../../../atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../../context/editorui/PagesContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

interface BorderProps {
  componentNumber:number;
  activeComponent:string; 
  setActiveComponent:any;
}

const CommonBorder = ({componentNumber, activeComponent, setActiveComponent}:BorderProps) => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { commonStyleSelector, queryData, statesName, activeDevice } = usePagesCtx();

  const [openBorder, setOpenBorder] = useState(false);
  
  const [borderRadius, setBorderRadius] = useState<number>(0);
  
  const [borderVal, setBorderVal] = useState<number>(0);
  const [borderTopVal, setBorderTopVal] = useState<number>(0);
  const [borderRightVal, setBorderRightVal] = useState<number>(0);
  const [borderBottomVal, setBorderBottomVal] = useState<number>(0);
  const [borderLeftVal, setBorderLeftVal] = useState<number>(0);

  const [borderColor, setBorderColor] = useState<any>();

  const borderTypeRef = useRef<any>(null);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const setBorderStyle = (border:string) => {
    let borderWidth = '';
    let borderColor = '';
    let borderStyle = '';

    const borderData = border.split(" ");

    if(borderData !== undefined){
        borderWidth = borderData[0] + ' ' + borderData[1] + ' ' + borderData[2] + ' ' + borderData[3];
        borderStyle = borderData[4];
        borderColor = borderData[5];
    }

    const styleNameArr = ["border-width", "border-style", "border-color"];
    const styleValArr = [borderWidth, borderStyle, borderColor];
    const ret = setStylesToCtx(styleNameArr, styleValArr, componentNumber);
    return ret;
  }

  const handleChange = (color:any) => {

    let tempStyleCtx  = getStyleOfElement();

    const borderWidth = getStylesFromCtx("border-width", componentNumber);
    let bStyle = getStylesFromCtx("border-style", componentNumber);
    if(!bStyle) bStyle = "none";

    if(borderWidth){

      const borderData = borderWidth?.split(" ");
      const borderStr = borderData[0] + ' ' + borderData[1] + ' ' + borderData[2] + ' ' + borderData[3] + ' ' +  bStyle + ' ' + color;
      
      const ret = setBorderStyle(borderStr);
      tempStyleCtx = setClassesName(ret, tempStyleCtx, componentNumber);
      setStyleOfElement(tempStyleCtx);
      
      setBorderColor(color);
    }

  }

  const displayBorder = () => {
    setOpenBorder(!openBorder);
  }

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  useEffect(() => {
    if(borderTypeRef && borderTypeRef?.current){
      borderTypeRef.current.value = "none";
    }
  }, [])

  useEffect(() => {

    let borderWidth = getStylesFromCtx("border-width", componentNumber);

    if(borderWidth){
      const borderData = borderWidth.split(" ");

      if(borderData[0] === borderData[1] && borderData[0] === borderData[2] && borderData[0] === borderData[3]){
        setBorderVal(strToPX(borderData[0]));
        setOpenBorder(false);
      }else{
        setBorderVal(0);
        setOpenBorder(true);
      }
      setBorderTopVal(strToPX(borderData[0]));
      setBorderRightVal(strToPX(borderData[1]));
      setBorderBottomVal(strToPX(borderData[2]));
      setBorderLeftVal(strToPX(borderData[3]));
    }else{
      setBorderVal(0);
      setBorderTopVal(0);
      setBorderRightVal(0);
      setBorderBottomVal(0);
      setBorderLeftVal(0);
    }

    const borderColor = getStylesFromCtx("border-color", componentNumber);
    if(borderColor){
      setBorderColor(borderColor);
    }else{
      setBorderColor("#ffffffff");
    }

    
    const bStyle = getStylesFromCtx("border-style", componentNumber);
    if(borderTypeRef && borderTypeRef?.current && bStyle){
      if(bStyle){
        borderTypeRef.current.value = bStyle;
      }else{
        borderTypeRef.current.value = "none";
      }
    }

    let _radius = getStylesFromCtx("border-radius", componentNumber);
    _radius = _radius?.replace("px","");
    _radius = _radius?.replace("%","");
    if(_radius){
      setBorderRadius(parseInt(_radius));
    }else{
      setBorderRadius(0);
    } 

  },[changeStyleOfElement, commonStyleSelector, statesName, activeDevice]);

  const strToPX = (str:string) => {
    const _str = str.replace("px", "");
    return parseInt(_str);
  }  

  const setBorderType = (e:React.ChangeEvent<HTMLSelectElement>) => {

    if(e.target.value !== 'None'){
      let tempStyleCtx = getStyleOfElement();

      let borderWidth = getStylesFromCtx("border-width", componentNumber);
      if(!borderWidth) borderWidth = "0px 0px 0px 0px";

      let bColor = getStylesFromCtx("border-color", componentNumber);
      if(!bColor) bColor = "#ffffffff";
    
      const borderData = borderWidth.split(" ");
      const borderStr = borderData[0] + ' ' + borderData[1] + ' ' + borderData[2] + ' ' + borderData[3] + ' ' +  e.target.value + ' ' + bColor;
  
      const ret = setBorderStyle(borderStr);
      tempStyleCtx = setClassesName(ret, tempStyleCtx, componentNumber);

      setStyleOfElement(tempStyleCtx);
    }

  }

  const setBorder = (position:string, e: React.ChangeEvent<HTMLInputElement>) => {
    
    let tempStyleCtx  = getStyleOfElement();

    let borderWidth = getStylesFromCtx("border-width", componentNumber);
    if(!borderWidth) borderWidth = "0px 0px 0px 0px";

    let bColor = getStylesFromCtx("border-color", componentNumber);
    if(!bColor) bColor = "#ffffffff";
    
    let bStyle = getStylesFromCtx("border-style", componentNumber);
    if(!bStyle) bStyle = "none";

    const borderData = borderWidth.split(" ");
    
    switch(position){
      case "Border":
        
        const borderStr = parseInt(e.target.value) + 'px ' + parseInt(e.target.value) + 'px ' + parseInt(e.target.value) + 'px ' + parseInt(e.target.value) + 'px ' + bStyle + ' ' +   bColor;

        setBorderVal(parseInt(e.target.value));
        setBorderTopVal(parseInt(e.target.value));
        setBorderRightVal(parseInt(e.target.value));
        setBorderBottomVal(parseInt(e.target.value));
        setBorderLeftVal(parseInt(e.target.value));

        const ret = setBorderStyle(borderStr);
        tempStyleCtx = setClassesName(ret, tempStyleCtx, componentNumber);
        setStyleOfElement(tempStyleCtx);
  
        break;
      case "top":

        const topBorderStr = parseInt(e.target.value) + 'px ' + borderData[1] + ' ' + borderData[2] + ' ' + borderData[3] + ' ' +  bStyle + ' ' +   bColor;
        setBorderTopVal(parseInt(e.target.value));
        const retTop = setBorderStyle(topBorderStr);
        tempStyleCtx = setClassesName(retTop, tempStyleCtx, componentNumber);
        setStyleOfElement(tempStyleCtx);

        break;
      case "right":

        const rightBorderStr =  borderData[0] + ' ' + parseInt(e.target.value) + 'px ' + borderData[2] + ' ' + borderData[3] + ' ' +  bStyle + ' ' +   bColor;
        setBorderRightVal(parseInt(e.target.value));
        const retRight = setBorderStyle(rightBorderStr);
        tempStyleCtx = setClassesName(retRight, tempStyleCtx, componentNumber);
        setStyleOfElement(tempStyleCtx);

        break;
      case "bottom":

        const bottomBorderStr =  borderData[0] + ' ' + borderData[1] + ' ' + parseInt(e.target.value) + 'px ' + borderData[3] + ' ' +  bStyle + ' ' +   bColor;

        setBorderBottomVal(parseInt(e.target.value));

        const retBottom = setBorderStyle(bottomBorderStr);
        tempStyleCtx = setClassesName(retBottom, tempStyleCtx, componentNumber);
        setStyleOfElement(tempStyleCtx);

        break;
      case "left":

        const leftBorderStr =  borderData[0] + ' ' + borderData[1] + ' ' + borderData[2] + ' ' + parseInt(e.target.value) + 'px '+  bStyle + ' ' +   bColor;

        setBorderLeftVal(parseInt(e.target.value));

        const retLeft = setBorderStyle(leftBorderStr);
        tempStyleCtx = setClassesName(retLeft, tempStyleCtx, componentNumber);
        setStyleOfElement(tempStyleCtx);

        break;
      case "radius":
        setBorderRadius(parseInt(e.target.value));
        const retRad = setStylesToCtx(["border-radius"], [`${parseInt(e.target.value)}px`], componentNumber);
        tempStyleCtx = setClassesName(retRad, tempStyleCtx, componentNumber);

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
        Border Settings <span style={{ float:"right" }}>{open ? <KeyboardArrowUpIcon fontSize='medium'/> : <KeyboardArrowDownIcon fontSize='medium'/>}</span>
      </div>
      <div style={{ display:`${open ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} id="border" label="Border" min={0} max={64} step={1} defaultValue={borderVal} onChange={(e:any)=>setBorder('Border', e)} />
          <div className={`${styles.advSet}`} onClick={displayBorder}>Advanced Settings</div>
          <div style={{ display:`${openBorder === true ? "block" : "none"}` }} className={`${styles.stMrgPdg}`}>
            <Range displayValue={true} format={OutlinedFormat} id="border_top" label="Top" min={0} max={64} step={1} defaultValue={borderTopVal} onChange={(e:any)=>setBorder('top', e)} />
            <Range displayValue={true} format={OutlinedFormat} id="border_right" label="Right" min={0} max={64} step={1} defaultValue={borderRightVal} onChange={(e:any)=>setBorder('right', e)} />
            <Range displayValue={true} format={OutlinedFormat} id="border_bottom" label="Bottom" min={0} max={64} step={1} defaultValue={borderBottomVal} onChange={(e:any)=>setBorder('bottom', e)} />
            <Range displayValue={true} format={OutlinedFormat} id="border_left" label="Left" min={0} max={64} step={1} defaultValue={borderLeftVal} onChange={(e:any)=>setBorder('left', e)} />
          </div>
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={borderTypeRef} format={OutlinedFormat} id="border_type" label="Border Type" items={BorderTypeItems} onChange={(e:any)=>setBorderType(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <ColorPickerBox name="Border Color" colorHex={borderColor} retColor={handleChange} />
        </div>

        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} label="Border Radius" min={0} max={100} step={1} defaultValue={borderRadius} onChange={(e:any)=>setBorder('radius', e)} />
        </div>
      </div>

    </Fragment>
  );

}

export default CommonBorder;
