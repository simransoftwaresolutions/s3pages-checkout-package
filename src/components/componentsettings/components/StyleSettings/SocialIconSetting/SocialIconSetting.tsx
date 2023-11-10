import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/SocialIconSetting.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { FontsNameItems, TextAlignItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { setClassesName, deepCloneArray } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import ColorPickerBox from '../../Atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext'; 
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const SocialIconSetting = () => {

  const [icons, setIcons] = useState<any[]>();

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { statesName, activeDevice } = usePagesCtx();

  const [iconColorSel, setIconColorSel] = useState<string[]>();
  const [iconColor, setIconColor] = useState<any[]>();
  const [iconUrl, setIconUrl] = useState<string[]>();
  const [iconName, setIconName] = useState<string[]>();
  const iconNameRefs = useRef<any>([]);
  const [fontSizeVal, setFontSizeVal] = useState<number>(8);
  const [bgSizeVal, setBgSizeVal] = useState<number>(8);
  const [iconGapVal, setIconGapVal] = useState<number>(8);
  const [radiusVal, setRadiusVal] = useState<number>(0);
  const [bgColorSel, setBgColorSel] = useState<string>("off");
  const [bgColor, setBgColor] = useState<any>();
  const alignRef = useRef<any>(null);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    let tempStyleCtx = getStyleOfElement();
    const tempIcons = tempStyleCtx?.icons;
    setIcons(tempIcons);

    let textSize = getStylesFromCtx("font-size", 1);
    textSize = textSize?.replace("px","");
    if(textSize){
      setFontSizeVal(parseInt(textSize));
    }else{
      setFontSizeVal(0);
    }

    let _bgSize = getStylesFromCtx("padding", 0);
    _bgSize = _bgSize?.replace("px","");
    if(_bgSize){
      setBgSizeVal(parseInt(_bgSize));
    }else{
      setBgSizeVal(0);
    }

    let _iconGap = getStylesFromCtx("margin-right", 0);
    _iconGap = _iconGap?.replace("px","");
    if(_iconGap){
      setIconGapVal(parseInt(_iconGap));
    }else{
      setIconGapVal(0);
    }

    let _radius = getStylesFromCtx("border-radius", 0);
    _radius = _radius?.replace("%","");
    if(_radius){
      setRadiusVal(parseInt(_radius));
    }else{
      setRadiusVal(0);
    }

    const _bgColor = getStylesFromCtx("background", 0);
    if(_bgColor){
      setBgColor(_bgColor);
    }else{
      setBgColor("#ffffffff");
    }

    const _alignRef = getStylesFromCtx("text-align");
    if(alignRef && alignRef.current){
      if(_alignRef){
        alignRef.current.value = _alignRef; 
      }else{
        alignRef.current.value = "left"; 
      }
    }

  }, [changeStyleOfElement, statesName, activeDevice]);

  useEffect(() => {

    if(icons){
      const tempI = [];
      const tempIconColorSel = [];
      const tempIconUrl = [];
      for(let i=0; i<icons.length;i++){
        tempI.push(icons[i]?.iconColor);
        tempIconColorSel.push("off");
        tempIconUrl.push(icons[i]?.url);
        if(iconNameRefs && iconNameRefs.current[i]) iconNameRefs.current[i].value = icons[i]?.iconName; 
      }
      setIconColor(tempI);
      setIconColorSel(tempIconColorSel);
      setIconUrl(tempIconUrl);
    }

  }, [icons]);
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const handleTextColorChange = (color:any, iIdx:any) => {

    let tempStyleCtx = getStyleOfElement();
    if(tempStyleCtx.icons.length && tempStyleCtx.icons[iIdx]) tempStyleCtx.icons[iIdx].iconColor = color;
    setStyleOfElement(tempStyleCtx);
    
    const iColorTemp = deepCloneArray(iconColor);
    if(iColorTemp)iColorTemp[iIdx] = color;
    setIconColor(iColorTemp);
  }

  const handleBgColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["background"], [`${color}`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);
    
    setBgColor(color);
  }

  const handleUrl = (e:any, iIdx:number) => {

    let tempStyleCtx = getStyleOfElement();
    if(tempStyleCtx.icons.length && tempStyleCtx.icons[iIdx]) tempStyleCtx.icons[iIdx].url = e.target.value;
    setStyleOfElement(tempStyleCtx);
    
    const tempIconUrl = deepCloneArray(iconUrl);
    if(tempIconUrl)tempIconUrl[iIdx] = e.target.value;
    setIconUrl(tempIconUrl);
  }

  const setFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["font-size"], [`${e.target.value}px`], 1);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 1);
    setStyleOfElement(tempStyleCtx);

    setFontSizeVal(parseInt(e.target.value));
  }

  const setBackgroundSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["padding"], [`${parseInt(e.target.value)}px`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

    setBgSizeVal(parseInt(e.target.value));
  }

  const setIconGap = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["margin-right"], [`${parseInt(e.target.value)}px`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

    setIconGapVal(parseInt(e.target.value));
  }

  const setRadius = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["border-radius"], [`${parseInt(e.target.value)}%`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

    setRadiusVal(parseInt(e.target.value));
  }

  const handleIcons = (e:any, iIdx:number) => {

    let tempStyleCtx = getStyleOfElement();
    if(tempStyleCtx.icons.length && tempStyleCtx.icons[iIdx]) tempStyleCtx.icons[iIdx].iconName = e.target.value;
    setStyleOfElement(tempStyleCtx);
    
  }

  const handleColorToggle = (iIdx:number, value:string) => {
    const tempIconColorSel = deepCloneArray(iconColorSel);
    if(tempIconColorSel && tempIconColorSel[iIdx]) tempIconColorSel[iIdx] = value;
    setIconColorSel(tempIconColorSel);
  }

  const handleBgColorToggle = (value:string) => {
    setBgColorSel(value);
  }

  const addNewIcon = () => {
    const newIcon = {
      url:"https://www.google.com",
      iconName:"Facebook",
      iconColor:"#000",
    }

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.icons.push(newIcon);
    setStyleOfElement(tempStyleCtx);

    // const tempIcons = deepCloneArray(icons);
    // tempIcons.push(newIcon);
    // setIcons(tempIcons);

  }

  const deleteIcon = (iIdx:number) => {
    const tempIcons = deepCloneArray(icons);

    let tempStyleCtx = getStyleOfElement();
    tempIcons.splice(iIdx, 1);

    tempStyleCtx.icons = tempIcons;
    setStyleOfElement(tempStyleCtx);

    setIcons(tempIcons);
  }

  const handleAlignment = (e:React.ChangeEvent<HTMLSelectElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["text-align"], [`${e.target.value}`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);
    
    setStyleOfElement(tempStyleCtx);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "social_icon_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("social_icon_setting")}>
        Social Icons
      </div>
      <div style={{ display:`${selectedSetting === "social_icon_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        <div className={`${styles.mainContainer} ${styles.iconContainer}`}>

          <div className={`inner_setting inner_range_setting`}>
            <Range displayValue={true} format={OutlinedFormat} label="Font Size" min={8} max={200} step={1} defaultValue={fontSizeVal} onChange={(e:any)=>setFontSize(e)} />
          </div>

          <div className={`inner_setting inner_range_setting`}>
            <Range displayValue={true} format={OutlinedFormat} label="Background Size" min={8} max={80} step={1} defaultValue={bgSizeVal} onChange={(e:any)=>setBackgroundSize(e)} />
          </div>

          <div className={`inner_setting inner_range_setting`}>
            <Range displayValue={true} format={OutlinedFormat} label="Icon Gap" min={8} max={64} step={1} defaultValue={iconGapVal} onChange={(e:any)=>setIconGap(e)} />
          </div>

          <div className={`inner_setting inner_range_setting`}>
            <Range displayValue={true} format={OutlinedFormat} label="Border Radius" min={0} max={100} step={1} defaultValue={radiusVal} onChange={(e:any)=>setRadius(e)} />
          </div>

          <div className={`inner_setting inner_range_setting`}>
            <Select selRef={alignRef} format={OutlinedFormat} label="Alignment" items={TextAlignItems} onChange={(e:any)=>handleAlignment(e)} />
          </div>

          <div className={`inner_setting`}>
            <ColorPickerBox name="Background Color" colorHex={bgColor} retColor={handleBgColorChange} />
          </div>

        </div>

        <div>
          {
            icons && (
              icons?.map((icon, iIdx) => {

                const iColor = iconColor && iconColor[iIdx] ? iconColor[iIdx] : "#000";
                const iUrl = iconUrl && iconUrl[iIdx] ? iconUrl[iIdx] : "";
                return (
                  <div key={iIdx} className={`${styles.mainContainer} ${styles.iconContainer}`}>
                    <div className={`inner_setting`}>
                      <div>
                        <DeleteForeverOutlinedIcon fontSize='medium' onClick={()=>deleteIcon(iIdx)} />
                      </div>
                      <ColorPickerBox name="Icon Color" colorHex={iColor} retColor={(e:any) => handleTextColorChange(e,iIdx)} />
                    </div>

                    <div className={`inner_setting`}>
                      <Text format={OutlinedFormat} label="Url" defaultValue={iUrl} type="text" onChange={(e:any)=>handleUrl(e, iIdx)} />
                    </div>

                    <div className={`inner_setting`}>
                      <Select selRef={(el:any) => (iconNameRefs.current[iIdx] = el)} format={OutlinedFormat} label="Icon" items={FontsNameItems} onChange={(e:any)=>handleIcons(e, iIdx)} />
                    </div>

                  </div>
        
                )
              })
            )
          }
          <div className={`${styles.mainContainer}`}>
            <span onClick={addNewIcon} className={styles.addNewIcon}>Add New Icon</span>
          </div>
        </div>

      </div>

    </Fragment>
  );

}

export default SocialIconSetting;
