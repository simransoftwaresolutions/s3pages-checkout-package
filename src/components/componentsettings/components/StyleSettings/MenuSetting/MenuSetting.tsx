import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/MenuSetting.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { FontsNameItems, FontStyleItems, FontFamilyItems, MenuStyleItems, HmbMenuStyleItems, PreIconsItems, MenuIconPosTypeItems, TextAlignItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { setClassesName, deepCloneArray } from '../../../../../utils/functions';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import ColorPickerBox from '../../Atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import FontDropdown from '../../StyleSettings/FontDropdown';
import MenuStyleSelectorSettings from '../../StyleSettings/MenuStyleSelectorSettings';
import UrlAtom from '../../Atoms/ElementsAtoms/UrlAtom';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const MenuSetting = () => {

  const [menuArr, setMenuArr] = useState<any[]>();

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { gFonts, statesName, activeDevice } = usePagesCtx();

  const [menuUrl, setMenuUrl] = useState<string>("");
  const [logoHrefUrl, setLogoHrefUrl] = useState<string>("");
  const [menuClsName, setMenuClsName] = useState<any>();
  const [menuName, setMenuName] = useState<string>("");
  const [urlType, setUrlType] = useState<string>("internal");
  const [logoUrlType, setLogoUrlType] = useState<string>("internal");
  const [menuIcon, setMenuIcon] = useState<string>("");
  const [fontSizeVal, setFontSizeVal] = useState<number>(8);
  const [iconSizeVal, setIconSizeVal] = useState<number>(8);
  const [hIconSizeVal, setHIconSizeVal] = useState<number>(8);
  const [fontColorSel, setFontColorSel] = useState<string>("off");
  const [fontColor, setFontColor] = useState<any>();
  const [iconColor, setIconColor] = useState<any>();
  const [icBrdColor, setIcBrdColor] = useState<any>();
  const [hmIconColor, setHmIconColor] = useState<any>();
  const [menuIdx, setMenuIdx] = useState<number>(-1);
  const [editMenu, setEditMenu] = useState<boolean>(false);
  const [openFormToAdd, setOpenFormToAdd] = useState<boolean>(false);
  const [selDragMenu, setSelDragMenu] = useState<number>(-1);
  const [menuHoverIdx, setMenuHoverIdx] = useState<number>(-1);
  const [curMenuIdx, setCurMenuIdx] = useState<number>(-1);

  const fontFamilyRef = useRef<any>(null);
  const menuStyleRef = useRef<any>(null);
  const hmbMenuStyleRef = useRef<any>(null);
  const logoRef = useRef<any>(null);
  const iconPosRef = useRef<any>(null);
  const menuPosRef = useRef<any>(null);
  const menuTextAlnRef = useRef<any>(null);
  const fontStyleRef = useRef<any>(null);
  const iconRef = useRef<any>(null);
  const hmIconRef = useRef<any>(null);

  const icImageRef = useRef<any>(null);
  const icImageRefHdn = useRef<any>(null);
  const [iconImage, setIconImage] = useState<string>('');
  const { setFileBrowserRef } = usePushCtx();
  const [image, setImage] = useState<string>('');

  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();

  const imageRef = useRef<any>(null);
  const imageRefHdn = useRef<any>(null);
  const [logoWidth, setLogoWidth] = useState<number>(100);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    let tempStyleCtx = getStyleOfElement();
    const tempMenuArr = tempStyleCtx?.menuArr;
    setMenuArr(tempMenuArr);

    const _logoUrlType = tempStyleCtx?.logoUrlType;
    setLogoUrlType(_logoUrlType);

    const _logoHrefUrl = tempStyleCtx?.logoHrefUrl;
    setLogoHrefUrl(_logoHrefUrl || "#");

    const _fontColor = getStylesFromCtx("color", 0);
    if(_fontColor){
      setFontColor(_fontColor);
    }else{
      setFontColor("#fff");
    }

    let _logoWidth = getStylesFromCtx("width", 6);
    _logoWidth = _logoWidth?.replace("px","");
    if(_logoWidth){
      setLogoWidth(parseInt(_logoWidth));
    }else{
      setLogoWidth(0);
    }

    const _iconColor = getStylesFromCtx("color", 4);
    if(_iconColor){
      setIconColor(_iconColor);
    }else{
      setIconColor("#fff");
    }

    if(fontStyleRef && fontStyleRef?.current){
      const _fontStyle = getStylesFromCtx("font-weight", 0);
      
      if(_fontStyle){
        fontStyleRef.current.value = _fontStyle;
      }else{
        fontStyleRef.current.value = "normal";
      }
    }

    const _hIcBrdColor = getStylesFromCtx("border-color", 2);
    if(_hIcBrdColor){
      setIcBrdColor(_hIcBrdColor);
    }else{
      setIcBrdColor("#fff");
    }

    let _fontSizeVal = getStylesFromCtx("font-size", 0);
    _fontSizeVal = _fontSizeVal.replace("px", "");
    if(_fontSizeVal){
      setFontSizeVal(parseInt(_fontSizeVal));
    }else{
      setFontSizeVal(0);
    }

    let _iconSizeVal = getStylesFromCtx("font-size", 4);
    _iconSizeVal = _iconSizeVal.replace("px", "");
    if(_iconSizeVal){
      setIconSizeVal(parseInt(_iconSizeVal));
    }else{
      setIconSizeVal(0);
    }
    
    const _menuAlign = getStylesFromCtx("justify-content", 7);
    if(menuPosRef && menuPosRef.current){
      if(_menuAlign){
        menuPosRef.current.value = _menuAlign; 
      }else{
        menuPosRef.current.value = "left"; 
      }
    } 
    
    const _menuTextAlnRef = getStylesFromCtx("text-align", 9);
    if(menuTextAlnRef && menuTextAlnRef.current){
      if(_menuTextAlnRef){
        menuTextAlnRef.current.value = _menuTextAlnRef; 
      }else{
        menuTextAlnRef.current.value = "left"; 
      }
    } 

    const _fontFamilyRef = getStylesFromCtx("font-family");
    if(fontFamilyRef && fontFamilyRef.current){
      if(_fontFamilyRef){
        fontFamilyRef.current.value = _fontFamilyRef; 
      }else{
        fontFamilyRef.current.value = "play"; 
      }
    } 

    const _menuStyleRef = tempStyleCtx?.menuStyle;
    if(menuStyleRef && menuStyleRef.current) menuStyleRef.current.value = _menuStyleRef; 

    const _hmbMenuStyleRef = tempStyleCtx?.showHamburgerMenu;
    if(hmbMenuStyleRef && hmbMenuStyleRef.current){
      if(_hmbMenuStyleRef){
        hmbMenuStyleRef.current.value = _hmbMenuStyleRef; 
      }else{
        hmbMenuStyleRef.current.value = false; 
      }
    } 

    const _logoRef = tempStyleCtx?.showLogo;
    if(logoRef && logoRef.current){
      if(_logoRef){
        logoRef.current.value = _logoRef; 
      }else{
        logoRef.current.value = false; 
      }
    } 

    const _iconPosRef = tempStyleCtx?.iconPosition;
    if(iconPosRef && iconPosRef.current){
      if(_iconPosRef){
        iconPosRef.current.value = _iconPosRef; 
      }else{
        iconPosRef.current.value = "left"; 
      }
    } 

    const _image = tempStyleCtx?.logoUrl;
    if(_image){
      setImage(_image);
    }else{
      setImage('');
    }
    
    const _hmIconRef = tempStyleCtx?.hamburgerIcon;
    if(hmIconRef && hmIconRef.current){
      if(_hmIconRef){
        hmIconRef.current.value = _hmIconRef; 
      }else{
        hmIconRef.current.value = "justify"; 
      }
    } 

    let _hIconSize = getStylesFromCtx("font-size", 3);
    _hIconSize = _hIconSize?.replace("px","");
    if(_hIconSize){
      setHIconSizeVal(parseInt(_hIconSize));
    }else{
      setHIconSizeVal(0);
    }

    
    const _hmIconColor = getStylesFromCtx("color", 1);
    if(_hmIconColor){
      setHmIconColor(_hmIconColor);
    }else{
      setHmIconColor("#fff");
    }

    setMenuIdx(-1);
    setOpenFormToAdd(false);

  }, [changeStyleOfElement, statesName, activeDevice]);
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const handleFontColorChange = (color:any) => {

    let tempStyleCtx  = getStyleOfElement();

    const ret = setStylesToCtx(["color"], [`${color}`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);
    
    setFontColor(color);
  }

  const handleIconColorChange = (color:any) => {

    let tempStyleCtx  = getStyleOfElement();

    const ret = setStylesToCtx(["color"], [`${color}`], 4);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 4);

    setStyleOfElement(tempStyleCtx);
    
    setIconColor(color);
  }

  const handleIconBrdColorChange = (color:any) => {

    let tempStyleCtx  = getStyleOfElement();

    const ret = setStylesToCtx(["border-color"], [`${color}`], 2);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 2);

    setStyleOfElement(tempStyleCtx);
    
    setIcBrdColor(color);
  }

  const handleHmIconColorChange = (color:any) => {

    let tempStyleCtx  = getStyleOfElement();

    const ret = setStylesToCtx(["color"], [`${color}`], 1);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 1);

    setStyleOfElement(tempStyleCtx);
    
    setHmIconColor(color);
  }

  const handleUrl = (e:any) => {
    const _menuUrl = e.target.value;
    setMenuUrl(_menuUrl);
  }

  const handleMenuName = (e:any) => {
    const _menuName = e.target.value;
    setMenuName(_menuName);
  }

  const handleMenuIcon = (e:any) => {
    const _menuIcon = e.target.value;
    setMenuIcon(_menuIcon);
  }

  const saveMenu = () => {

    let tempStyleCtx = getStyleOfElement();
    if(tempStyleCtx.menuArr.length && tempStyleCtx.menuArr[menuIdx]) tempStyleCtx.menuArr[menuIdx].url = menuUrl;
    if(tempStyleCtx.menuArr.length && tempStyleCtx.menuArr[menuIdx]) tempStyleCtx.menuArr[menuIdx].menuName = menuName;
    if(tempStyleCtx.menuArr.length && tempStyleCtx.menuArr[menuIdx]) tempStyleCtx.menuArr[menuIdx].urlType = urlType;
    if(tempStyleCtx.menuArr.length && tempStyleCtx.menuArr[menuIdx]) tempStyleCtx.menuArr[menuIdx].menuIcon = menuIcon;
    if(tempStyleCtx.menuArr.length && tempStyleCtx.menuArr[menuIdx]) tempStyleCtx.menuArr[menuIdx].menuClassName = menuClsName ? menuClsName : [];
    setStyleOfElement(tempStyleCtx);
    
  }

  const changeIconFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["font-size"], [`${e.target.value}px`], 4);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 4);

    setStyleOfElement(tempStyleCtx);

    setIconSizeVal(parseInt(e.target.value));
  }

  const setFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["font-size"], [`${e.target.value}px`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

    setFontSizeVal(parseInt(e.target.value));
  }

  const setHIconSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["font-size"], [`${e.target.value}px`], 3);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 3);

    setHIconSizeVal(parseInt(e.target.value));
  }

  const handleFontColorToggle = (value:string) => {
    setFontColorSel(value);
  }

  const addNewMenu = () => {

    if(!menuUrl || !menuName) return;
    
    const tempMenuArr = deepCloneArray(menuArr);

    if(editMenu){
      saveMenu();
      tempMenuArr[menuIdx].url = menuUrl;
      tempMenuArr[menuIdx].menuName = menuName;
      tempMenuArr[menuIdx].urlType = urlType;
      tempMenuArr[menuIdx].menuIcon = menuIcon || "";
      tempMenuArr[menuIdx].menuClassName = menuClsName || [];
      setMenuArr(tempMenuArr);
    }else{
      const newMenu = {
        url:menuUrl,
        menuName:menuName,
        urlType:urlType || "internal",
        menuIcon:menuIcon || "",
        menuClassName: menuClsName || [],
      }
  
      let tempStyleCtx = getStyleOfElement();
      tempStyleCtx.menuArr.push(newMenu);
      setStyleOfElement(tempStyleCtx);

      tempMenuArr.push(newMenu);
      setMenuArr(tempMenuArr);
    }
    setEditMenu(false);
    setMenuUrl("");
    setMenuName("");
    setUrlType("internal");
    setMenuIcon("");
    setMenuIdx(-1);
    setOpenFormToAdd(false);
    setMenuClsName([]);
  }

  const setFontFamily = (e:any) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["font-family"], [`${e}`]);
    tempStyleCtx = setClassesName(ret, tempStyleCtx);

    setStyleOfElement(tempStyleCtx);

  }

  const setMenyStyle = (e:React.ChangeEvent<HTMLSelectElement>) => {
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.menuStyle = e.target.value;
    setStyleOfElement(tempStyleCtx);

  }

  const setHmbMenyStyle = (e:React.ChangeEvent<HTMLSelectElement>) => {
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.showHamburgerMenu = e.target.value;
    setStyleOfElement(tempStyleCtx);

  }

  const handleDisplayLogo = (e:React.ChangeEvent<HTMLSelectElement>) => {
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.showLogo = e.target.value;
    setStyleOfElement(tempStyleCtx);

  }

  const handleHmMenuIcon = (e:React.ChangeEvent<HTMLSelectElement>) => {
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.hamburgerIcon = e.target.value;
    setStyleOfElement(tempStyleCtx);
  }

  const setIconPosStyle = (e:React.ChangeEvent<HTMLSelectElement>) => {
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.iconPosition = e.target.value;
    setStyleOfElement(tempStyleCtx);

  }

  const setMenuPosStyle = (e:React.ChangeEvent<HTMLSelectElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["justify-content"], [`${e.target.value}`], 7);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 7);
    
    setStyleOfElement(tempStyleCtx);
  }

  const handleTextAlign = (e:React.ChangeEvent<HTMLSelectElement>) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["text-align"], [`${e.target.value}`], 9);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 9);
    
    setStyleOfElement(tempStyleCtx);
  }

  const handleEditMenu = (mIdx:number, mName:string, mUrlType:string, mUrl:string, mIcon:string, menuClsName:any) => {
    setOpenFormToAdd(false);
    if(editMenu && menuIdx === mIdx){
      setEditMenu(false);
      setMenuIdx(-1);
      setMenuUrl("");
      setMenuName("");
      setUrlType("internal");
      setMenuIcon("");
      setMenuClsName([]);
      if(iconRef?.current) iconRef.current.value = "";
    }else{
      setEditMenu(true);
      setMenuIdx(mIdx);
      setMenuUrl(mUrl);
      setMenuName(mName);
      setUrlType(mUrlType);
      setMenuIcon(mIcon);
      setMenuClsName(menuClsName);
    }
  }

  const handleDeleteMenu = (mIdx:number) => {

    const tempStyleCtx = getStyleOfElement();

    if(tempStyleCtx.menuArr.length && tempStyleCtx.menuArr[mIdx]){
      tempStyleCtx.menuArr.splice(mIdx, 1);
      setStyleOfElement(tempStyleCtx);
    }

    const tempMenuArr = deepCloneArray(menuArr);

    if(tempMenuArr.length && tempMenuArr[mIdx]){
      tempMenuArr.splice(mIdx, 1);
      setMenuArr(tempMenuArr);
    }
    
  }

  const dropMenu = () => {
    setSelDragMenu(-1);

    const tempStyleCtx = getStyleOfElement();
    const tempStyle = getStyleOfElement();

    if(menuHoverIdx > -1 && (menuHoverIdx+1) < tempStyleCtx.menuArr.length){
      
      tempStyleCtx.menuArr.splice((menuHoverIdx), 0, tempStyle.menuArr[curMenuIdx]);

      if(menuHoverIdx < curMenuIdx){
        tempStyleCtx.menuArr.splice((curMenuIdx+1), 1);
      }else{
        tempStyleCtx.menuArr.splice(curMenuIdx, 1); 
      }
    }else{
      tempStyleCtx.menuArr.push(tempStyle.menuArr[curMenuIdx]);
      tempStyleCtx.menuArr.splice(curMenuIdx, 1);  
    }

    setStyleOfElement(tempStyleCtx);
    setMenuArr(tempStyleCtx.menuArr);

  }

  const dragLeaveMenuFunc = () => {
    setMenuHoverIdx(-1);
  }

  const dragOverMenuFunc = (e:any, mIdx:number) => {
    e.stopPropagation();
    e.preventDefault();
    setMenuHoverIdx(mIdx);
  }

  const dragMenu = (mIdx:number) => {
    if(selDragMenu !== -1){
      setCurMenuIdx(mIdx);
    }
  }

  useEffect(() => {
    if(iconRef?.current) iconRef.current.value = menuIcon;
  }, [iconRef?.current])
  const menuForm = () => {
    return  (
      <>
        <div className={`${styles.menuIconBox} ${styles.menuInput}`}>
          <MenuStyleSelectorSettings eId={menuIdx} mClsName={menuClsName} retHandle={(val:any)=>setMenuClsName(val)}/>
        </div>

        <div className={`${styles.menuIconBox} ${styles.menuInput}`}>
          <UrlAtom getUrl={setMenuUrl} getUrlType={setUrlType} urlTypeVal={urlType} menuUrlVal={menuUrl} />
        </div>

        <div className={`${styles.menuIconBox} ${styles.menuInput}`}>
          <Text format={OutlinedFormat} label="Menu Name" defaultValue={menuName ? menuName : ""} type="text" onChange={(e:any)=>handleMenuName(e)} />
        </div>

        <div className={`${styles.menuIconBox} ${styles.menuInput}`}>
          <Select selRef={iconRef} format={OutlinedFormat} label="Menu Icon" items={PreIconsItems} onChange={(e:any)=>handleMenuIcon(e)} />
        </div>

        <div className={styles.menuInputAddBtn}>
          <span onClick={addNewMenu} className={`${styles.addNewMenu} btn btn-primary`}>Save</span>
        </div>
      </>
    )
  }

  const handlerIconImage= (e:any) => {
    setIconImage(e.target.value);
    setBackgroundImgStyle(e.target.value);
  }

  const handleImage = (val:any) => {
    setIconImage(val);
    setBackgroundImgStyle(val);
  }

  const setBackgroundImgStyle = (val:any="") => {
    if(!val) return;
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtx(["background-image"], [`url(${val})`], 1);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 1);

    setStyleOfElement(tempStyleCtx);
  }

  useEffect(()=>{
    if(image !== ''){
      let tempStyleCtx = getStyleOfElement();
      tempStyleCtx.logoUrl = image;
      setStyleOfElement(tempStyleCtx);
    }
  },[image]);

  const handleFontWeight = (e:React.ChangeEvent<HTMLSelectElement>) => {

    let tempStyleCtx  = getStyleOfElement();
    const ret = setStylesToCtx(["font-weight"], [`${e.target.value}`], 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);

  }

  const handleLogoWidth = (e:any) => {

    let tempStyleCtx  = getStyleOfElement();
    const ret = setStylesToCtx(["width"], [`${e.target.value}px`], 6);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 6);
    setStyleOfElement(tempStyleCtx);
    setLogoWidth(e.target.value);
  }

  const handleLogoUrlType = (val:string) => {
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.logoUrlType = val;
    setStyleOfElement(tempStyleCtx);
    setLogoUrlType(val);
  }

  const handleLogoHrefUrl = (val:string) => {
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.logoHrefUrl = val;
    setStyleOfElement(tempStyleCtx);
    setLogoHrefUrl(val);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "menu_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("menu_setting")}>
        General
      </div>
      <div style={{ display:`${selectedSetting === "menu_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        <div className={`${styles.mainContainer} ${styles.iconContainer}`}>

          <div className={`${styles.mainContainer} inner_setting`}>
            <Text refText={imageRef} format={OutlinedFormat} label="Logo Image" defaultValue={image} type="text" onChange={(e:any)=>setImage(e.target.value)}/>
            <input ref={imageRefHdn} value={image} type="hidden" onClick={(e:any)=>setImage(e.target.value)} />
            <div className={`${styles.uploadImage}`} data-bs-toggle="modal" data-bs-target="#fileManagerModal" onClick={()=>setFileBrowserRef([imageRef.current, imageRefHdn.current])}>Browse/Upload</div>
          </div>

          <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
            <Range displayValue={true} format={OutlinedFormat} label="Logo width" min={0} max={700} step={1} defaultValue={logoWidth} onChange={(e:any)=>handleLogoWidth(e)} />
          </div>

          <div className={`${styles.mainContainer} inner_setting`}>
            <Select selRef={logoRef} format={OutlinedFormat} label="Show/Hide Logo" items={HmbMenuStyleItems} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>handleDisplayLogo(e)} />
          </div>

          <div className={`${styles.mainContainer} url-atom-element ${styles.menuIconBox} ${styles.menuInput}`}>
            <UrlAtom getUrl={handleLogoHrefUrl} getUrlType={handleLogoUrlType} urlTypeVal={logoUrlType} menuUrlVal={logoHrefUrl} />
          </div>

          <div className={`${styles.mainContainer} inner_setting`}>
            <Select selRef={menuStyleRef} format={OutlinedFormat} label="Menu Style" items={MenuStyleItems} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setMenyStyle(e)} />
          </div>

          <div className={`${styles.mainContainer} inner_setting`}>
            <Select selRef={menuPosRef} format={OutlinedFormat} label="Menu Position" items={TextAlignItems} onChange={(e:any)=>setMenuPosStyle(e)} />
          </div>

          <div className={`${styles.mainContainer} inner_setting`}>
            <Select selRef={menuTextAlnRef} format={OutlinedFormat} label="Menu Text Align" items={TextAlignItems} onChange={(e:any)=>handleTextAlign(e)} />
          </div>

          <div className={`${styles.mainContainer} inner_setting`}>
            <Select selRef={hmbMenuStyleRef} format={OutlinedFormat} label="Hamburger Menu" items={HmbMenuStyleItems} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setHmbMenyStyle(e)} />
          </div>

          <div className={`${styles.mainContainer} inner_setting`}>
            <Select selRef={iconPosRef} format={OutlinedFormat} label="Icon Position" items={MenuIconPosTypeItems} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setIconPosStyle(e)} />
          </div>

          <div className={`${styles.mainContainer} inner_setting`}>
            <FontDropdown setFontFamily={(e:any)=>setFontFamily(e)} />
          </div>

          <div className='inner_setting inner_range_setting'>
            <Range displayValue={true} format={OutlinedFormat} label="Font Size" min={8} max={200} step={1} defaultValue={fontSizeVal} onChange={(e:any)=>setFontSize(e)} />
          </div>

          <div className='inner_setting inner_range_setting'>
            <Range displayValue={true} format={OutlinedFormat} label="Icon Size" min={8} max={200} step={1} defaultValue={iconSizeVal} onChange={(e:any)=>changeIconFontSize(e)} />
          </div>

          <div className='inner_setting'>
            <ColorPickerBox name="Font Color" colorHex={fontColor} retColor={handleFontColorChange} />
          </div>

          <div className='inner_setting'>
            <ColorPickerBox name="Icon Color" colorHex={iconColor} retColor={handleIconColorChange} />
          </div>

          <div className={`${styles.mainContainer} inner_setting`}>
            <Select selRef={fontStyleRef} format={OutlinedFormat} label="Font weight" items={FontStyleItems} onChange={(e:any)=>handleFontWeight(e)} />
          </div>

          <div className='inner_setting inner_range_setting'>
            <Range displayValue={true} format={OutlinedFormat} label="Hamburger Icon Size" min={8} max={200} step={1} defaultValue={hIconSizeVal} onChange={(e:any)=>setHIconSize(e)} />
          </div>
          
          <div className='inner_setting'>
            <ColorPickerBox name="Hamburger Icon Border Color" colorHex={icBrdColor} retColor={handleIconBrdColorChange} />
          </div>
          
          <div className='inner_setting'>
            <ColorPickerBox name="Hamburger Icon Color" colorHex={hmIconColor} retColor={handleHmIconColorChange} />
          </div>

          <div className={`${styles.mainContainer} inner_setting`}>
            <Select selRef={hmIconRef} format={OutlinedFormat} label="Hamburger Icon" items={PreIconsItems} onChange={(e:any)=>handleHmMenuIcon(e)} />
          </div>

        </div>

        <div className={styles.menuInputAddBtn}>
          <span onClick={()=> setOpenFormToAdd(!openFormToAdd)} className={styles.addNewMenu}><AddBoxIcon fontSize="medium" /></span>
        </div>
        { openFormToAdd && !editMenu && menuForm()}

        <div onDrop={() => dropMenu()}>
          {
            
              menuArr?.map((menu, mIdx) => {
                return (
                  <div key={mIdx}>
                    <div 
                      style={{ padding:"10px", border:"1px solid #fff", margin:"10px" }} 
                      draggable={selDragMenu === mIdx ? "true":"false"} 
                      onDragLeave={dragLeaveMenuFunc} 
                      onDragOver={(e) => dragOverMenuFunc(e,mIdx)} 
                      onDragStart={() => dragMenu(mIdx)}
                    >
                      <span>
                        <OpenWithOutlinedIcon fontSize="medium" style={{cursor:"pointer"}} onMouseDown={()=>setSelDragMenu(mIdx)}/>
                      </span>
                      <span className={styles.MenuNameAd}>{menu?.menuName}</span>
                      <span style={{float:"right"}}>
                        <EditIcon fontSize="medium" onClick={() => handleEditMenu(mIdx, menu?.menuName, menu?.urlType, menu?.url, menu?.menuIcon, menu?.menuClassName)} />
                        <DeleteOutlineIcon fontSize="medium" onClick={() => handleDeleteMenu(mIdx)} />
                      </span>
                    </div>
                    {menuIdx === mIdx && menuForm()}
                  </div>
                )
              })
          }
        </div>

      </div> 

    </Fragment>
  );

}

export default MenuSetting;
