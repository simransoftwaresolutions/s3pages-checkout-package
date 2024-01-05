import React, { Fragment } from 'react';
import styles from '../../../../../../styles/editorui/ImageGeneralSetting.module.css';
import { Range, Select, Text } from '../../../../atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { PreIconsItems } from '../../../../datas/commonComponentData';
import { useSettingsCtx } from "../../../../../../context/editorui/SettingsContext";
import { usePushCtx } from "../../../../../../context/editorui/PushContext";
import { setClassesName } from '../../../../../../utils/functions';
import { useContentCtx } from "../../../../../../context/editorui/ContentsContext";
import ColorPickerBox from '../../../../atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../../context/editorui/PagesContext';
import UrlAtom from '../../../../atoms/UrlAtom';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const ImageGeneralSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { statesName, activeDevice } = usePagesCtx();

  const imageRef = useRef<any>(null);
  const imageRefHdn = useRef<any>(null);

  const [imgWidth, setImgWidth] = useState<number>(100);
  const [fontSize, setFontSize] = useState<number>(24);

  const [image, setImage] = useState<string>('');
  const [iType, setIType] = useState<string>('Image');

  const [colorSel, setColorSel] = useState<string>("off");
  const [color, setColor] = useState<any>();

  const [link, setLink] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const alignRef = useRef<any>(null);
  const iconRef = useRef<any>(null);
  const [urlType, setUrlType] = useState<string>("");

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    const { 
      changeStyleOfElement,
    } = useContentCtx();
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

  // let [fileBrowserRef, setFileBrowserRef] = useState<any>([]);
  const { fileBrowserRef, setFileBrowserRef } = usePushCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();

    const _image = tempStyleCtx?.imageUrl;
    if(_image){
      setImage(_image);
    }else{
      setImage('');
    }

    let _imgWidth = getStylesFromCtx("width");
    _imgWidth = _imgWidth?.replace("%","");
    if(_imgWidth){
      setImgWidth(parseInt(_imgWidth));
    }else{
      setImgWidth(0);
    }

    let _fontSize = getStylesFromCtx("font-size");
    _fontSize = _fontSize?.replace("px", "");
    if(_fontSize){
      setFontSize(_fontSize);
    }else{
      setFontSize(0);
    }

    const _iType = tempStyleCtx?.iType;
    if(_iType){
      setIType(_iType);
    }

    const _link = tempStyleCtx?.link;
    if(_link){
      setLink(_link);
    }

    const _iconUrl = tempStyleCtx?.iconUrl;
    if(_iconUrl){
      setIconUrl(_iconUrl);
    }else{
      setIconUrl("");
    }

    const _urlType = tempStyleCtx?.urlType;
    setUrlType(_urlType);

    const _iconRef = tempStyleCtx?.iconName;
    if(iconRef && iconRef.current) iconRef.current.value = _iconRef;

    const _color = getStylesFromCtx("color");
    if(_color){
      setColor(_color);
    }else{
      setColor("#fff");
    }

  }, [changeStyleOfElement, statesName, activeDevice]);
  
  useEffect(()=>{
    if(image !== ''){
      let tempStyleCtx = getStyleOfElement();
      tempStyleCtx.imageUrl = image;
      setStyleOfElement(tempStyleCtx);
    }
  },[image]);

  // color
  const handleColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();
    
    const ret = setStylesToCtx(["color"], [`${color}`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);

    setStyleOfElement(tempStyleCtx);
    
    setColor(color);
  }

  const handleColorToggle = (value:string) => {
    setColorSel(value);
  }

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const selImage = (e:any) => {
    setImage(e.target.value);
  }

  const setWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();
    // tempStyleCtx.style.width = e.target.value;
    const ret = setStylesToCtx(["width"], [`${e.target.value}%`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);
    setStyleOfElement(tempStyleCtx);

    setImgWidth(parseInt(e.target.value));
  }

  const handelFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();
    const ret = setStylesToCtx(["font-size"], [`${e.target.value}px`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);
    setStyleOfElement(tempStyleCtx);

    setFontSize(parseInt(e.target.value));
  }

  const handleLink = (val:string) => {
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.link = val;
    setStyleOfElement(tempStyleCtx);

    setLink(val);
  }

  const handleUrlType = (val:string) => {
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.urlType = val;
    setStyleOfElement(tempStyleCtx);

    setUrlType(val);
  }

  // const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let tempStyleCtx = getStyleOfElement();
  //   tempStyleCtx.link = e.target.value;
  //   setStyleOfElement(tempStyleCtx);

  //   setLink(e.target.value);
  // }

  const handleIconUrl = (val:string) => {
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.iconUrl = val;
    setStyleOfElement(tempStyleCtx);

    setIconUrl(val);
  }
  
  const handleIcon = (e:React.ChangeEvent<HTMLSelectElement>) => {
    let icon = e.target.value;
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.iconName = icon;
    setStyleOfElement(tempStyleCtx);
  }

  // const handleUrl = (url:any) => {
  //   console.log("=====>>>>", url);
  // }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "image_general_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("image_general_setting")}>
        General
      </div>
      <div style={{ display:`${selectedSetting === "image_general_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        {
          iType === 'Image' ? (
            <>
              <div className={`${styles.mainContainer} inner_setting`}>
                <Text refText={imageRef} format={OutlinedFormat} id="background_image" label="Background Image" defaultValue={image} type="text" onChange={(e:any)=>selImage(e)}/>
                <input ref={imageRefHdn} value={image} type="hidden" onClick={(e:any)=>setImage(e.target.value)} />
                <div className={`${styles.uploadImage}`} data-bs-toggle="modal" data-bs-target="#fileManagerModal" onClick={()=>setFileBrowserRef([imageRef.current, imageRefHdn.current])}>Browse/Upload</div>
              </div>

              {/* <div className={`${styles.mainContainer} inner_setting`}>
                <Text format={OutlinedFormat} label="Link" defaultValue={link} type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleLink(e)} />
              </div> */}

              <div className={`${styles.mainContainer} url-atom-element`}>
                <UrlAtom getUrl={handleLink} getUrlType={handleUrlType} urlTypeVal={urlType} menuUrlVal={link} />
              </div>

              <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
                <Range displayValue={true} format={OutlinedFormat} label="Width" min={0} max={100} step={1} defaultValue={imgWidth} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setWidth(e)} />
              </div>

            </>

          ):
          (
            <>
              <div className={`${styles.mainContainer} inner_setting`}>
                <Select selRef={iconRef} format={OutlinedFormat} label="Icon" items={PreIconsItems} onChange={(e:any)=>handleIcon(e)} />
              </div>
              
              <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
                <Range displayValue={true} format={OutlinedFormat} label="Font Size" min={0} max={200} step={1} defaultValue={fontSize} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>handelFontSize(e)} />
              </div>
              
              {/* <div className={`${styles.mainContainer} inner_setting`}>
                <Text format={OutlinedFormat} label="Icon URL" defaultValue={iconUrl} type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleIconUrl(e)} />
              </div> */}

              <div className={`${styles.mainContainer} url-atom-element`}>
                <UrlAtom getUrl={handleIconUrl} getUrlType={handleUrlType} urlTypeVal={urlType} menuUrlVal={iconUrl} />
              </div>
                            
              <div className={`${styles.mainContainer} inner_setting`}>
                  <ColorPickerBox name="Color" colorHex={color} retColor={handleColorChange} />
              </div>

            </>
          )
        }

      </div>
    </Fragment>
  );

}

export default ImageGeneralSetting;
