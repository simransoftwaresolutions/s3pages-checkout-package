import { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/Background.module.css';
import { Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { BackgroundTypeItems, BackgroundPosItems, BackgroundSizeItems, BackgroundRepeatItems, BgGradientTypeItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import ColorPickerBox from '../../Atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const Background = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { commonStyleSelector, statesName, activeDevice } = usePagesCtx();

  const [bgType, setBgType] = useState<string>('Color');
  const [videoPath, setVideoPath] = useState<string>('');
  const [bgImage, setBgImage] = useState<string>('');
  const [colorImage, setColorImage] = useState<string>('');
  const [bgPosition, setBgPosition] = useState<string>('');
  const [biPosition, setBiPosition] = useState<string>('');
  const [biRepeat, setBiRepeat] = useState<string>('');
  const [bgDirection, setBgDirection] = useState<string>('to left');
  const [bgSize, setBgSize] = useState<string>('');
  const [biSize, setBiSize] = useState<string>('');
  const [xPosval, setXPosval] = useState<string>("");
  const [xPosBival, setXPosBival] = useState<string>("");
  const [yPosval, setYPosval] = useState<string>("");
  const [yPosBival, setYPosBival] = useState<string>("");
  const [xGradval, setXGradval] = useState<string>("1");
  const [xSizeval, setXSizeval] = useState<string>("");
  const [ySizeval, setYSizeval] = useState<string>("");
  const [xSizeBival, setXSizeBival] = useState<string>("");
  const [ySizeBival, setYSizeBival] = useState<string>("");

  const [bgColor, setBgColor] = useState<any>("ffffffff");
  const [colorImageColor, setColorImageColor] = useState<any>("ffffffff");

  const [bgGradirntStartColor, setBgGradirntStartColor] = useState<any>("#ffffffff");

  const [bgGradirntEndColor, setBgGradirntEndColor] = useState<any>("#ffffffff");
  
  const { setFileBrowserRef } = usePushCtx();

  const bgImageRef = useRef<any>(null);
  const bgImageRefHdn = useRef<any>(null);
  const colorImageRef = useRef<any>(null);
  const colorImageRefHdn = useRef<any>(null);
  const bgPosRef = useRef<any>(null);
  const biPosRef = useRef<any>(null);
  const bgSizeRef = useRef<any>(null);
  const biSizeRef = useRef<any>(null);
  const bgRepeatRef = useRef<any>(null);
  const biRepeatRef = useRef<any>(null);
  const bgTypeRef = useRef<any>(null);
  const bgGradRef = useRef<any>(null);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    const { 
      changeStyleOfElement,
    } = useContentCtx();
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

    const _backgroundImgClr = getStylesFromCtx("background-blend-mode");
    if(_backgroundImgClr && _backgroundImgClr === "multiply"){
      const _bgColorImageColor = getStylesFromCtx("background-color");
      if(_bgColorImageColor){
        setColorImageColor(_bgColorImageColor);
      }else{
        setColorImageColor("#fff");
      }

      const _bgColorImagePos = getStylesFromCtx("background-position");
      if(_bgColorImagePos){
        if(_bgColorImagePos.includes("px")){
          let _biStr = _bgColorImagePos.split(" ");
          if(biPosRef && biPosRef?.current) biPosRef.current.value = "pos";
          setBiPosition("pos");
          setXPosBival(getXValue(_biStr[0],"px"));
          setYPosBival(getXValue(_biStr[1],"px"));
        }else if(_bgColorImagePos.includes("%")){
          let _biStr = _bgColorImagePos.split(" ");
          if(biPosRef && biPosRef?.current) biPosRef.current.value = "percent";
          setBiPosition("percent");
          setXPosBival(getXValue(_biStr[0],"perc"));
          setYPosBival(getXValue(_biStr[1],"perc"));
        }else{
          if(biPosRef && biPosRef?.current) biPosRef.current.value = _bgColorImagePos;
          setBiPosition(_bgColorImagePos);
        }        
      }

      // fetch repeat for image+color
      const _bgColorImageRept = getStylesFromCtx("background-repeat");
      if(biRepeatRef && biRepeatRef?.current && _bgColorImageRept) biRepeatRef.current.value = _bgColorImageRept;

      const _bgColorImageSize = getStylesFromCtx("background-size");
      if(_bgColorImageSize.includes("px")){
        let _biSizeStr = _bgColorImageSize.split(" ");
        if(biSizeRef && biSizeRef?.current) biSizeRef.current.value = "length";
        setBiSize("length");
        setXSizeBival(getXValue(_biSizeStr[0],"px"));
        setYSizeBival(getXValue(_biSizeStr[1],"px"));
      }else if(_bgColorImageSize.includes("%")){
        let _biSizeStr = _bgColorImageSize.split(" ");
        if(biSizeRef && biSizeRef?.current) biSizeRef.current.value = "percent";
        setBiSize("percent");
        setXSizeBival(getXValue(_biSizeStr[0],"perc"));
        setYSizeBival(getXValue(_biSizeStr[1],"perc"));
      }else{
        if(biSizeRef && biSizeRef?.current) biSizeRef.current.value = _bgColorImageSize;
        setBiSize(_bgColorImageSize);
      }

      const _bgColorImage = getStylesFromCtx("background-image");
      if(_bgColorImage){
        let _bUrl = _bgColorImage.replace("url","");
        _bUrl = _bUrl.replace(`("`,"");
        _bUrl = _bUrl.replace(`")`,"");
        setColorImage(_bUrl);
      }else{
        setColorImage("");
      }
      return;
    }

    const _background = getStylesFromCtx("background");

    if(!_background){
      if(bgTypeRef?.current) bgTypeRef.current.value = "Color";
      setBgType("Color");
      setBgColor("#ffffffff");
      return;
    }

    if(_background.includes("linear-gradient")){

      let _bGrad = _background.replace("linear-gradient","");

      _bGrad = _bGrad.replace("(","");
      _bGrad = _bGrad.replace(")","");

      const gradArr = _bGrad.split(", ");

      if(bgGradRef && bgGradRef?.current) bgGradRef.current.value = gradArr[0];
      if(gradArr[1]) setBgGradirntStartColor(gradArr[1]);
      if(gradArr[2]) setBgGradirntEndColor(gradArr[2]);

    }else if(_background.includes("url")){
      let _bStr = _background.split(" ");
      console.log(_background);

      // fetch URL
      let _bUrl = _bStr[0].replace("url","");
      _bUrl = _bUrl.replace(`("`,"");
      _bUrl = _bUrl.replace(`")`,"");
      setBgImage(_bUrl);

      // fetch repeat
      if(bgRepeatRef && bgRepeatRef?.current && _bStr[1]) bgRepeatRef.current.value = _bStr[1]; 

      let _pos1 = `${_bStr[2]} ${_bStr[3]}`;

      if(_pos1.includes("px")){
        if(bgPosRef && bgPosRef?.current) bgPosRef.current.value = "pos";
        setBgPosition("pos");
        setXPosval(getXValue(_bStr[2],"px"));
        setYPosval(getXValue(_bStr[3],"px"));
      }else if(_pos1.includes("%")){
        if(bgPosRef && bgPosRef?.current) bgPosRef.current.value = "percent";
        setBgPosition("percent");
        setXPosval(getXValue(_bStr[2],"perc"));
        setYPosval(getXValue(_bStr[3],"perc"));
      }else{
        if(bgPosRef && bgPosRef?.current) bgPosRef.current.value = _pos1;
        setBgPosition(_pos1);
      }


      if(_bStr[5].includes("px")){
        if(bgSizeRef && bgSizeRef?.current) bgSizeRef.current.value = "length";
        setBgSize("length");
        setXSizeval(getXValue(_bStr[5],"px"));
        setYSizeval(getXValue(_bStr[6],"px"));
      }else if(_bStr[5].includes("%")){
        if(bgSizeRef && bgSizeRef?.current) bgSizeRef.current.value = "percent";
        setBgSize("percent");
        setXSizeval(getXValue(_bStr[5],"perc"));
        setYSizeval(getXValue(_bStr[6],"perc"));
      }else{
        if(bgSizeRef && bgSizeRef?.current) bgSizeRef.current.value = _bStr[5];
        setBgSize(_bStr[5]);
      }


    }else{
      setBgColor(_background);
    }

  },[changeStyleOfElement, commonStyleSelector, statesName, activeDevice]);


  useEffect(() => {

    const _backgroundImgClr = getStylesFromCtx("background-blend-mode");
    if(_backgroundImgClr && _backgroundImgClr === "multiply"){
      if(bgTypeRef?.current) bgTypeRef.current.value = "colorimage";
      setBgType("colorimage");
      return;
    }

    const _background = getStylesFromCtx("background");
    if(!_background){
      if(bgTypeRef?.current) bgTypeRef.current.value = "Color";
      setBgType("Color");
      setBgColor("#ffffffff");
      return;
    }

    if(_background.includes("linear-gradient")){
      setBgType("Gradient");
      if(bgTypeRef?.current) bgTypeRef.current.value = "Gradient";
    }else if(_background.includes("url")){
      setBgType("Image");
      if(bgTypeRef?.current) bgTypeRef.current.value = "Image";
    }else{
      if(bgTypeRef?.current) bgTypeRef.current.value = "Color";
      setBgType("Color");
    }

  },[changeStyleOfElement, commonStyleSelector, statesName, activeDevice]);

  useEffect(()=>{

    if(colorImage && colorImageColor){

      let tempStyleCtx = getStyleOfElement();

      let _pos:string = biPosition;

      switch(_pos){
        case "percent":
          _pos = `${xPosBival}% ${yPosBival}%`;
          break;
        case "pos":
          _pos = `${xPosBival}px ${yPosBival}px`;
          break;
      }

      let _biSize:string = biSize;

      switch(_biSize){
        case "percent":
          _biSize = `${xSizeBival}% ${ySizeBival}%`;
          break;
        case "length":
          _biSize = `${xSizeBival}px ${ySizeBival}px`;
          break;
      }

      const _colorImage = `url("${colorImage}")`;
      const styleNameArr = ["background-repeat", "background-size", "background-blend-mode", "background-position", "background-color", "background-image", "background"];
      const styleValArr = [biRepeat, _biSize, "multiply", _pos, colorImageColor, _colorImage, ""];
      const ret = setStylesToCtx(styleNameArr, styleValArr);
      tempStyleCtx = setClassesName(ret, tempStyleCtx);

      setStyleOfElement(tempStyleCtx);
    }

  }, [colorImage, colorImageColor, biPosition, xPosBival, yPosBival, xSizeBival, ySizeBival, biSize, biRepeat])

  const getXValue = (str:string, type:string) => {
    if(type === "perc"){
      return str.replace("%", "");
    }

    if(type === "px"){
      return str.replace("px", "");
    }
    return "";
  }

  const handleChange = (color:any) => {
    setBgColor(color);
    if(bgType === "Color"){
      setBackgroundColorStyle("color", color);
    }
  }

  const handleBgCIChange = (color:any) => {
    setColorImageColor(color);
  }

  const handleBgCImageChange = (e:any) => {
    setColorImage(e.target.value);
  }

  const handleChangeStart = (color:any) => {
    setBgGradirntStartColor(color);
    setBackgroundGradStyle("gradient", color, "start");
  }

  const handleChangeEnd = (color:any) => {
    setBgGradirntEndColor(color);
    setBackgroundGradStyle("gradient", color, "end");
  }

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const xyBox = () => {
    return (
      <>
        <br />
        <Text format={OutlinedFormat} label="X Value" defaultValue={xPosval} type="text" onChange={(e:any)=>handlexPos((e.target.value))}/>
        <br />
        <Text format={OutlinedFormat} label="Y Value" defaultValue={yPosval} type="text" onChange={(e:any)=>handleyPos((e.target.value))}/>
      </>
    )
  }

  const bixyBox = () => {
    return (
      <>
        <br />
        <Text format={OutlinedFormat} label="X Value" defaultValue={xPosBival} type="text" onChange={(e:any)=>handlexBiPos((e.target.value))}/>
        <br />
        <Text format={OutlinedFormat} label="Y Value" defaultValue={yPosBival} type="text" onChange={(e:any)=>handleyBiPos((e.target.value))}/>
      </>
    )
  }

  const handleGradient = (val:any) => {
    setXGradval(val);
    setBackgroundGradStyle("gradient", val, "xval");
  }

  const handlexSize = (val:any) => { // X size
    setXSizeval(val);
    setBackgroundImgStyle("image", val, "xsize");
  }

  const handleySize = (val:any) => { // Y size
    setYSizeval(val);
    setBackgroundImgStyle("image", val, "ysize");
  }

  const handlexPos = (val:any) => { // X position
    setXPosval(val);
    setBackgroundImgStyle("image", val, "xpos");
  }

  const handleyPos = (val:any) => { // Y position
    setYPosval(val);
    setBackgroundImgStyle("image", val, "ypos");
  }

  const handlexBiPos = (val:any) => { // X position
    setXPosBival(val);
  }

  const handleyBiPos = (val:any) => { // Y position
    setYPosBival(val);
  }

  const handleBiPos = (e:any) => {
    setBiPosition(e.target.value);
  }

  const handleBiSize = (e:any) => {
    setBiSize(e.target.value);
  }

  const xGradBox = () => {
    return (
      <>
        <br />
        <Text format={OutlinedFormat} label="X Value" defaultValue={xGradval} type="text" onChange={(e:any)=>handleGradient((e.target.value))}/>
      </>
    )
  }

  const xySizeBox = () => {
    return (
      <>
        <br />
        <Text format={OutlinedFormat} label="X Value" defaultValue={xSizeval} type="text" onChange={(e:any)=>handlexSize((e.target.value))}/>
        <br />
        <Text format={OutlinedFormat} label="Y Value" defaultValue={ySizeval} type="text" onChange={(e:any)=>handleySize((e.target.value))}/>
      </>
    )
  }

  const bixySizeBox = () => {
    return (
      <>
        <br />
        <Text format={OutlinedFormat} label="X Value" defaultValue={xSizeBival} type="text" onChange={(e:any)=>setXSizeBival((e.target.value))}/>
        <br />
        <Text format={OutlinedFormat} label="Y Value" defaultValue={ySizeBival} type="text" onChange={(e:any)=>setYSizeBival((e.target.value))}/>
      </>
    )
  }

  const setGradient = (e:any) => {
    setBgDirection(e.target.value);
    setBackgroundGradStyle("gradient");
  }

  const handleImage = (val:any) => {
    setBgImage(val);
    setBackgroundImgStyle("image", val, "bgimg");
  }

  const selBackground = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>, type:string) => {
    switch(type){
      case 'bg_type':
        setBgType(e.target.value);
        break;
      case 'bg_repeat':
        setBackgroundImgStyle("image");
        break;
      case 'bg_pos':
        setBgPosition(e.target.value);
        if(e.target.value !== "percent" && e.target.value !== "pos"){
          setBackgroundImgStyle("image");
        }
        break;
      case 'bg_size':
        setBgSize(e.target.value);
        if(e.target.value !== "percent" && e.target.value !== "length"){
          setBackgroundImgStyle("image");
        }
        break;
      case 'bg_image':
        setBgImage(e.target.value);
        setBackgroundImgStyle("image", e.target.value, "bgimg");
        break;
      case 'bg_video_path':
        setVideoPath(e.target.value);
        break;
    }
  }

  const setBackgroundColorStyle = (type:string, color:any="", colorType:string="") => {
    let tempStyleCtx = getStyleOfElement();
    let backgroundInfo = color;
    if(backgroundInfo){
      const ret = setStylesToCtx(["background-repeat", "background-size", "background-blend-mode", "background-position", "background-image", "background-color", "background"], ["", "", "normal", "", "", "", backgroundInfo]);
      tempStyleCtx = setClassesName(ret, tempStyleCtx);
    } 

    setStyleOfElement(tempStyleCtx);
  }

  const setBackgroundGradStyle = (type:string, val:any="", valType:string="") => {
    
    let tempStyleCtx = getStyleOfElement();

    let backgroundInfo = "";

    let _defaultDirect = "to left";
    let _x = valType === "xval" ? val : xGradval;

    if(bgGradRef && bgGradRef?.current && bgGradRef.current.value) _defaultDirect = bgGradRef.current.value;
    if(_defaultDirect === "deg") _defaultDirect =`${_x?_x:0}deg`;

    backgroundInfo = `linear-gradient(${_defaultDirect}, ${valType==="start" ? val : bgGradirntStartColor}, ${valType==="end" ? val : bgGradirntEndColor})`;

    if(backgroundInfo){
      const ret = setStylesToCtx(["background-repeat", "background-size", "background-blend-mode", "background-position", "background-image", "background-color", "background"], ["", "", "normal", "", "", "", backgroundInfo]);
      tempStyleCtx = setClassesName(ret, tempStyleCtx);
    }
    
    setStyleOfElement(tempStyleCtx);
  }

  const setBackgroundImgStyle = (type:string, val:any="", valType:string="") => {
    
    let tempStyleCtx = getStyleOfElement();

    let backgroundInfo = "";

    let _xpos = valType === "xpos" ? val : xPosval;
    let _ypos = valType === "ypos" ? val : yPosval;

    let _xsize = valType === "xsize" ? val : xSizeval;
    let _ysize = valType === "ysize" ? val : yPosval;

    let _defaultBgRepeat = "no-repeat";
    if(bgRepeatRef && bgRepeatRef?.current && bgRepeatRef.current.value) _defaultBgRepeat = bgRepeatRef.current.value;
    
    let _defaultPos = "0% 0%";
    if(bgPosRef && bgPosRef?.current && bgPosRef.current.value) _defaultPos = bgPosRef.current.value;
    if(_defaultPos === "percent" || _defaultPos === "pos"){
      if(bgPosition === "percent") _defaultPos = `${_xpos?_xpos:0}% ${_ypos?_ypos:0}%`;
      if(bgPosition === "pos") _defaultPos = `${_xpos?_xpos:0}px ${_ypos?_ypos:0}px`;
    }

    let _defaultSize = "100% 100%";
    if(bgSizeRef && bgSizeRef?.current && bgSizeRef.current.value) _defaultSize = bgSizeRef.current.value;
    if(_defaultSize === "percent" || _defaultSize === "length"){
      if( bgSize === "percent") _defaultSize = `${_xsize?_xsize:100}% ${_ysize?_ysize:100}%`;
      if( bgSize === "length") _defaultSize = `${_xsize?_xsize:100}px ${_ysize?_ysize:100}px`;
    }

    const _img = valType === "bgimg" ? val : bgImage;

    if(_img){
      backgroundInfo = `url("${_img}") ${_defaultBgRepeat} ${_defaultPos} / ${_defaultSize} transparent`;
    }
    if(backgroundInfo){
      const ret = setStylesToCtx(["background-repeat", "background-size", "background-blend-mode", "background-position", "background-image", "background-color", "background"], ["", "", "normal", "", "", "", backgroundInfo]);
      tempStyleCtx = setClassesName(ret, tempStyleCtx);
    }
    
    setStyleOfElement(tempStyleCtx);
  }


  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "bg_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("bg_setting")}>
        Background Settings
      </div>
      <div style={{ display:`${selectedSetting === "bg_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={bgTypeRef} format={OutlinedFormat} id="background_type" label="Background Type" items={BackgroundTypeItems} onChange={(e:any)=>selBackground(e, 'bg_type')} />
        </div>

        <div className={`${styles.mainContainer} inner_setting clr-cnt`} style={{ display:`${bgType === "Color" ? "block" : "none"}`}}>
          <ColorPickerBox name="Background Color" colorHex={bgColor} retColor={handleChange} />
        </div>

        {/* for image */}
        <div className={`${styles.mainContainer} inner_setting`} style={{ display:`${bgType === "Image" ? "block" : "none"}`}}>
          <Text refText={bgImageRef} format={OutlinedFormat} id="background_image" label="Background Image" defaultValue={bgImage} type="text" onChange={(e:any)=>selBackground(e, 'bg_image')}/>
          <input ref={bgImageRefHdn} value={bgImage} type="hidden" onClick={(e:any)=>handleImage(e.target.value)} />
          <div className={`${styles.uploadImage}`} data-bs-toggle="modal" data-bs-target="#fileManagerModal" onClick={()=>setFileBrowserRef([bgImageRef.current, bgImageRefHdn.current])}>Browse/Upload</div>
        </div>
        <div className={`${styles.mainContainer} inner_setting`} style={{ display:`${bgType === "Image" ? "block" : "none"}`}}>
          <Select selRef={bgPosRef} format={OutlinedFormat} id="background_position" label="Background Position" items={BackgroundPosItems} onChange={(e:any)=>selBackground(e, 'bg_pos')} />
          {(bgPosition === "percent" || bgPosition === "pos") && xyBox()}
        </div>
        <div className={`${styles.mainContainer} inner_setting`} style={{ display:`${bgType === "Image" ? "block" : "none"}`}}>
          <Select selRef={bgSizeRef} format={OutlinedFormat} id="background_size" label="Background Size" items={BackgroundSizeItems} onChange={(e:any)=>selBackground(e, 'bg_size')} />
          {(bgSize === "percent" || bgSize === "length") && xySizeBox()}
        </div>
        <div className={`${styles.mainContainer} inner_setting`} style={{ display:`${bgType === "Image" ? "block" : "none"}`}}>
          <Select selRef={bgRepeatRef} format={OutlinedFormat} label="Background Repeat" items={BackgroundRepeatItems} onChange={(e:any)=>selBackground(e, 'bg_repeat')} />
        </div>

        {/* for color + image */}
        <div className={`${styles.mainContainer} inner_setting clr-cnt`} style={{ display:`${bgType === "colorimage" ? "block" : "none"}`}}>
          <ColorPickerBox name="Background Color" colorHex={colorImageColor} retColor={handleBgCIChange} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`} style={{ display:`${bgType === "colorimage" ? "block" : "none"}`}}>
          <Text refText={colorImageRef} format={OutlinedFormat} id="background_image" label="Background Image" defaultValue={colorImage} type="text" onChange={(e:any)=>handleBgCImageChange(e)}/>
          <input ref={colorImageRefHdn} value={colorImage} type="hidden" onClick={(e:any)=>setColorImage(e.target.value)} />
          <div className={`${styles.uploadImage}`} data-bs-toggle="modal" data-bs-target="#fileManagerModal" onClick={()=>setFileBrowserRef([colorImageRef.current, colorImageRefHdn.current])}>Browse/Upload</div>
        </div>

        <div className={`${styles.mainContainer} inner_setting`} style={{ display:`${bgType === "colorimage" ? "block" : "none"}`}}>
          <Select selRef={biPosRef} format={OutlinedFormat} label="Background Position" items={BackgroundPosItems} onChange={(e:any)=>handleBiPos(e)} />
          {(biPosition === "percent" || biPosition === "pos") && bixyBox()}
        </div>

        <div className={`${styles.mainContainer} inner_setting`} style={{ display:`${bgType === "colorimage" ? "block" : "none"}`}}>
          <Select selRef={biSizeRef} format={OutlinedFormat} label="Background Size" items={BackgroundSizeItems} onChange={(e:any)=>handleBiSize(e)} />
          {(biSize === "percent" || biSize === "length") && bixySizeBox()}
        </div>

        <div className={`${styles.mainContainer} inner_setting`} style={{ display:`${bgType === "colorimage" ? "block" : "none"}`}}>
          <Select selRef={biRepeatRef} format={OutlinedFormat} label="Background Repeat" items={BackgroundRepeatItems} onChange={(e:any) => setBiRepeat(e.target.value)}/>
        </div>

        {/* for video */}
        <div className={`${styles.mainContainer} inner_setting`} style={{ display:`${bgType === "Video" ? "block" : "none"}`}}>
          <Text format={OutlinedFormat} id="video_path" label="Video Path" defaultValue={videoPath} type="text" onChange={(e:any)=>selBackground(e, 'bg_video_path')}/>
        </div>

        {/* for gradient */}
        <div className={`${styles.mainContainer} inner_setting`} style={{ display:`${bgType === "Gradient" ? "block" : "none"}`}}>
          <Select selRef={bgGradRef} format={OutlinedFormat} label="Direction" items={BgGradientTypeItems} onChange={(e:any)=>setGradient(e)} />
          {(bgDirection === "deg") && xGradBox()}
        </div>
        <div className={`${styles.mainContainer} inner_setting clr-cnt`} style={{ display:`${bgType === "Gradient" ? "block" : "none"}`}}>
          <ColorPickerBox name="Background Start" colorHex={bgGradirntStartColor} retColor={handleChangeStart} />
        </div>

        <div className={`${styles.mainContainer} inner_setting clr-cnt`} style={{ display:`${bgType === "Gradient" ? "block" : "none"}`}}>
          <ColorPickerBox name="Background End" colorHex={bgGradirntEndColor} retColor={handleChangeEnd} />
        </div>

      </div>
    </Fragment>
  );

}

export default Background;
