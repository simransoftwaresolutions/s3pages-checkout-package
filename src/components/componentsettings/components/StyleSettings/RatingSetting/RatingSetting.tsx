import React, { Fragment } from 'react';
import styles from './RatingSetting.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { setClassesName, deepCloneArray } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import ColorPickerBox from '../../Atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext'; 

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const RatingSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { statesName, activeDevice } = usePagesCtx();

  const [iconSizeVal, setIconSizeVal] = useState<number>(24);
  const [color, setColor] = useState<any>();
  const [ starArr, setStarArr ] = useState<[]>([]);
  const [ rate, setRate ] = useState<string>("");
  
  const starRefs = useRef<any>([]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();

    const _rate = tempStyleCtx?.rate;
    if(_rate){
      setRate(_rate);
    }else{
      setRate("");
    }

    const _starArr = tempStyleCtx?.stars;
    if(_starArr && _starArr?.length){
      setStarArr(_starArr);

      setTimeout(()=>{
        if(starRefs && starRefs.current[0]) starRefs.current[0].value = _starArr[0];
        if(starRefs && starRefs.current[1]) starRefs.current[1].value = _starArr[1];
        if(starRefs && starRefs.current[2]) starRefs.current[2].value = _starArr[2];
        if(starRefs && starRefs.current[3]) starRefs.current[3].value = _starArr[3];
        if(starRefs && starRefs.current[4]) starRefs.current[4].value = _starArr[4];
      }, 500);
    }else{
      setStarArr([]);
    }

    let _fSize = getStylesFromCtx("font-size", 0);
    _fSize = _fSize?.replace("px","");
    if(_fSize){
      setIconSizeVal(_fSize);
    }else{
      setIconSizeVal(24);
    }

    const _color = getStylesFromCtx("color", 0);
    if(_color){
      setColor(_color);
    }else{
      setColor("#ffffffff");
    }

  }, [changeStyleOfElement, statesName, activeDevice]);
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const handleColorChange = (colorVal:any) => {

    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["color"], [`${colorVal}`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);
    
    setColor(color);
  }

  const setIconSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["font-size"], [`${parseInt(e.target.value)}px`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

    setIconSizeVal(parseInt(e.target.value));
  }

  const starItems = [ // dropdown of stars
    {
      key:"Star",
      label:"Star"
    },
    {
      key:"StarBorder",
      label:"Star Border"
    },
    {
      key:"StarHalf",
      label:"Star Half"
    },
  ];

  const handleStarArr = (e:any, sIdx:number) => { // star changing handler
    const _starArr = deepCloneArray(starArr);
    _starArr[sIdx] = e.target.value;

    // set to ctx
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.stars = _starArr;
    setStyleOfElement(tempStyleCtx);

    // set to starArr
    setStarArr(_starArr);
  }

  const drawStar = (star:string, sIdx:number) => { // draw star select dropdown
    return (
      <div className={`${styles.mainContainer} inner_setting`}>
        <Select selRef={(el:any) => (starRefs.current[sIdx] = el)} format={OutlinedFormat} label={`Star ${sIdx+1}`} items={starItems} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>handleStarArr(e, sIdx)} />
      </div>
    )
  }

  const setRatingText = (e:any) => {
    // set to ctx
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.rate = e.target.value;
    setStyleOfElement(tempStyleCtx);

    setRate(e.target.value);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "rating_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("rating_setting")}>
        Rating Settings
      </div>
      <div style={{ display:`${selectedSetting === "rating_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        <div className={`${styles.mainContainer} inner_setting`}>
          <Range displayValue={true} format={OutlinedFormat} label="Icon Size" min={8} max={200} step={1} defaultValue={iconSizeVal} onChange={(e:any)=>setIconSize(e)} />
        </div>
        <div className={`${styles.mainContainer} inner_setting`}>
          <ColorPickerBox name="Color" colorHex={color} retColor={handleColorChange} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text format={OutlinedFormat} label="Rating Text" defaultValue={rate} type="text" onChange={(e:any)=>setRatingText(e)} />
        </div>

        <div>
          {
            starArr?.map((star:string, sIdx:number) => {
              return <Fragment key={sIdx}>{drawStar(star, sIdx)}</Fragment>
            })
          }
        </div>
      </div>
    </Fragment>
  );

}

export default RatingSetting;
