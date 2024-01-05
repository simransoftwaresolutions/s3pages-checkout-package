import React, { Fragment } from 'react';
import styles from '../../../../../../styles/editorui/SectionGenSettings.module.css';
import { Select, Text } from '../../../../atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { SectionLayoutItems, TextAlignItems } from '../../../../datas/commonComponentData';
import { useSettingsCtx } from "../../../../../../context/editorui/SettingsContext";
import { useContentCtx } from "../../../../../../context/editorui/ContentsContext";

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const heightItems = [
  {
    key:"auto",
    label:"Auto"
  },
  {
    key:"full_screen",
    label:"Full Screen"
  },
]

const SectionGenSettings = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const contWidthRef = useRef<any>(null);
  const secheightRef = useRef<any>(null);
  const hAlignRef = useRef<any>(null);
  const vAlignRef = useRef<any>(null);
  const [ sectionId, setSectionId ] = useState<string>("");

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();

    const cWidth = tempStyleCtx?.style?.contentWidth; // for container or container-fluid
    const contWidthEle = contWidthRef.current;
    if(contWidthEle && cWidth) contWidthEle.value = cWidth;
    
    const _isHeightClass = tempStyleCtx?.isHeightClass; // for section height
    if(secheightRef && secheightRef?.current) secheightRef.current.value = _isHeightClass ? "full_screen" : "auto";

    const hAlign = tempStyleCtx?.style?.horizontalAlign;  // for horizontal align
    const hAlignEle = hAlignRef?.current;
    if(hAlignEle && hAlign) hAlignEle.value = hAlign;

    const vAlign = tempStyleCtx?.style?.verticalAlign;  // for vertical align
    const vAlignEle = vAlignRef?.current;
    if(vAlignEle && vAlign) vAlignEle.value = vAlign;

    const _sectionId = tempStyleCtx?.sectionId;  // for ID
    setSectionId(_sectionId || "");

  }, [changeStyleOfElement]);
 
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const setWidthSettings = (e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.style.contentWidth = e.target.value;
    setStyleOfElement(tempStyleCtx);

  }

  const handleSectionHeight = (e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.isHeightClass = e.target.value === "full_screen" ? true : false;
    setStyleOfElement(tempStyleCtx);

  }

  const setHorizonatalAlignSetting = (e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.style.horizontalAlign = e.target.value;
    setStyleOfElement(tempStyleCtx);

  }

  const setVerticalAlignSetting = (e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.style.verticalAlign = e.target.value;
    setStyleOfElement(tempStyleCtx);

  }

  const handleSectionId = (e:any) => {

    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.sectionId = e.target.value;
    setStyleOfElement(tempStyleCtx);

    setSectionId(e.target.value);

  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "section_gen_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("section_gen_setting")}>
        General Settings
      </div>
      <div style={{ display:`${selectedSetting === "section_gen_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={contWidthRef} format={OutlinedFormat} label="Content width" items={SectionLayoutItems} onChange={(e:any)=>setWidthSettings(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={secheightRef} format={OutlinedFormat} label="Height" items={heightItems} onChange={(e:any)=>handleSectionHeight(e)} />
        </div>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={hAlignRef} format={OutlinedFormat} label="Horizontal Align" items={TextAlignItems} onChange={(e:any)=>setHorizonatalAlignSetting(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={vAlignRef} format={OutlinedFormat} label="Vertical Align" items={TextAlignItems} onChange={(e:any)=>setVerticalAlignSetting(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text format={OutlinedFormat} label="Section ID" defaultValue={sectionId} type="string" onChange={(e:any)=>handleSectionId(e)} />
        </div>

      </div>

    </Fragment>
  );

}

export default SectionGenSettings;