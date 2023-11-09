import React, { Fragment } from 'react';
import styles from './FormSetting.module.css';
import { Range, Select, Text } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { AutoResponderItems, MenuStyleItems, TextAlignItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { deepCloneArray, setClassesName } from '../../../../../utils/functions';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import { GetAutoResponderData } from "../../../../../service/pagepreview/PagesServices";
import CommonStylesSettings from '../CommonStylesSettings';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import UrlAtom from '../../Atoms/ElementsAtoms/UrlAtom';

const FormSetting = () => {

  const [formArr, setFormArr] = useState<any[]>();

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { formIdx, setFormIdx, editForm, setEditForm, openForm, setOpenForm } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { activeDevice } = usePagesCtx();
  const { 
    changeStyleOfElement,
  } = useContentCtx();

  const autoRef = useRef<any>(null);
  const formTypeRef = useRef<any>(null);
  const btnWidthRef = useRef<any>(null);
  const btnTextAlignRef = useRef<any>(null);
  const btnAlignRef = useRef<any>(null);
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const [submitBtnName, setSubmitBtnName] = useState<string>('');
  const [selDragForm, setSelDragForm] = useState<number>(-1);
  const [formHoverIdx, setFormHoverIdx] = useState<number>(-1);
  const [curFormIdx, setCurFormIdx] = useState<number>(-1);
  const [autoResData, setAutoResData] = useState<any[]>([]);
  const [textColor, setTextColor] = useState<any>();
  const [urlType, setUrlType] = useState<string>("");

  useEffect(() => {
    
    const getAutoRespndrdata = async() => {

      const _autoResp = await GetAutoResponderData();

      if(!_autoResp?.status) return;
      const _autoResData = [];
      for(let i=0; i< _autoResp?.data?.length; i++){
        _autoResData[i] = { 
          key:_autoResp?.data[i]?.key,
          label:_autoResp?.data[i]?.title,
        }
      }
      setAutoResData(_autoResData);
    }

    getAutoRespndrdata();
  }, [])

  useEffect(() => {
    if(openForm) return;
    let tempStyleCtx = getStyleOfElement();

    const fontColor = getStylesFromCtx("color");
    if(fontColor){
      setTextColor(fontColor);
    }else{
      setTextColor("#fff");
    }

    const tempFormArr = tempStyleCtx?.formArr;
    setFormArr(tempFormArr);

    const _redirectUrl = tempStyleCtx?.redirectUrl;
    setRedirectUrl(_redirectUrl);

    const _submitBtnName = tempStyleCtx?.submitBtnName;
    setSubmitBtnName(_submitBtnName);

    const _autoResponder = tempStyleCtx?.autoResponder;
    if(autoRef && autoRef.current) autoRef.current.value = _autoResponder;

    const _formType = tempStyleCtx?.formType;
    if(formTypeRef && formTypeRef.current){
      if(_formType){
        formTypeRef.current.value = _formType;
      }else{
        formTypeRef.current.value = "vertical";
      }
    }

    let _btnWidth = getStylesFromCtx("width", 6);
    _btnWidth = _btnWidth?.replace("%","");
    if(btnWidthRef && btnWidthRef.current){
      if(_btnWidth){
        btnWidthRef.current.value = _btnWidth;
      }else{
        btnWidthRef.current.value = "100";
      }
    }

    let _btnTextAlign = getStylesFromCtx("text-align", 6);
    if(btnTextAlignRef && btnTextAlignRef.current){
      if(_btnTextAlign){
        btnTextAlignRef.current.value = _btnTextAlign;
      }else{
        btnTextAlignRef.current.value = "left";
      }
    }

    let _btnAlign = getStylesFromCtx("text-align", 7);
    if(btnAlignRef && btnAlignRef.current){
      if(_btnAlign){
        btnAlignRef.current.value = _btnAlign;
      }else{
        btnAlignRef.current.value = "left";
      }
    }

    setOpenForm(false);

    const _urlType = tempStyleCtx?.urlType;
    setUrlType(_urlType);

  }, [changeStyleOfElement, openForm, activeDevice]);

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const handleEditForm = (fIdx:number) => {
    setEditForm(true);
    setFormIdx(fIdx);
    setOpenForm(true);
  }

  const handleAddForm = () => {
    setEditForm(false);
    setOpenForm(true);
  }

  const handleDeleteForm = (fIdx:number) => {

    const tempStyleCtx  = getStyleOfElement();

    if(tempStyleCtx.formArr.length && tempStyleCtx.formArr[fIdx]){
      tempStyleCtx.formArr.splice(fIdx, 1);
      if(tempStyleCtx.styleClasses?.childClassName[10+fIdx]) tempStyleCtx.styleClasses?.childClassName.splice(10+fIdx, 1);
      setStyleOfElement(tempStyleCtx);
    }    
  }
  
  const dropForm = () => {
    setSelDragForm(-1);

    const tempStyleCtx  = getStyleOfElement();
    const tempStyle  = getStyleOfElement();

    if(formHoverIdx > -1 && (formHoverIdx+1) < tempStyleCtx.formArr.length){
      
      tempStyleCtx.formArr.splice((formHoverIdx), 0, tempStyle.formArr[curFormIdx]);

      if(formHoverIdx < curFormIdx){
        tempStyleCtx.formArr.splice((curFormIdx+1), 1);

        tempStyleCtx.styleClasses.childClassName.splice((10+formHoverIdx), 0, tempStyle.styleClasses.childClassName[10+curFormIdx]);
        tempStyleCtx.styleClasses?.childClassName?.splice((curFormIdx+11), 1);
      }else{
        tempStyleCtx.formArr.splice(curFormIdx, 1); 

        if(tempStyleCtx?.styleClasses?.childClassName[10+formHoverIdx]){
          tempStyleCtx.styleClasses.childClassName.splice((10+formHoverIdx), 0, tempStyle.styleClasses.childClassName[10+curFormIdx]);
        }else{
          tempStyleCtx.styleClasses.childClassName[formHoverIdx+10] = (tempStyle.styleClasses?.childClassName[10+curFormIdx]);
        }
        tempStyleCtx.styleClasses.childClassName.splice((10+curFormIdx), 1); 
      }
    }else{
      tempStyleCtx.formArr.push(tempStyle.formArr[curFormIdx]);
      tempStyleCtx.formArr.splice(curFormIdx, 1);  

      if(tempStyleCtx?.styleClasses?.childClassName[10+formHoverIdx]){
        tempStyleCtx.styleClasses?.childClassName.push(tempStyle.styleClasses?.childClassName[10+curFormIdx]);
        tempStyleCtx.styleClasses?.childClassName.splice((10+curFormIdx), 1);  
      }else{
        tempStyleCtx.styleClasses.childClassName[formHoverIdx+11] = (tempStyle.styleClasses?.childClassName[10+curFormIdx]);
        tempStyleCtx.styleClasses?.childClassName.splice((10+curFormIdx), 1);
      }

    }

    setStyleOfElement(tempStyleCtx);
    setFormArr(tempStyleCtx.formArr);
  }

  const dragLeaveFormFunc = () => {
    setFormHoverIdx(-1);
  }

  const dragOverFormFunc = (e:any, fIdx:number) => {
    e.stopPropagation();
    e.preventDefault();
    setFormHoverIdx(fIdx);
  }

  const dragForm = (fIdx:number) => {
    if(selDragForm !== -1){
      setCurFormIdx(fIdx);
    }
  }

  const handleRedirectUrl = (val:string) => {
    
    const tempStyleCtx  = getStyleOfElement();
    tempStyleCtx.redirectUrl = val;
    setStyleOfElement(tempStyleCtx);

    setRedirectUrl(val);
  }

  const handleUrlType = (val:string) => {
    
    const tempStyleCtx  = getStyleOfElement();
    tempStyleCtx.urlType = val;
    setStyleOfElement(tempStyleCtx);

    setUrlType(val);
  }

  const handleSubmitBtnName = (e:any) => {
    
    const tempStyleCtx  = getStyleOfElement();
    tempStyleCtx.submitBtnName = e.target.value;
    setStyleOfElement(tempStyleCtx);

    setSubmitBtnName(e.target.value);
  }

  const handleAutoResponder = (e:any) => {
    
    const tempStyleCtx  = getStyleOfElement();
    tempStyleCtx.autoResponder = e.target.value;
    setStyleOfElement(tempStyleCtx);

  }

  const handleFormType = (e:any) => {
    
    const tempStyleCtx  = getStyleOfElement();
    tempStyleCtx.formType = e.target.value;
    setStyleOfElement(tempStyleCtx);

  }

  const handleBtnWidth = (e:any) => { // Button Width
    const val = e.target.value === "100" ? "100%" : e.target.value;
    let tempStyleCtx  = getStyleOfElement();
    const ret = setStylesToCtx(["width"], [`${val}`], 6);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 6);
    setStyleOfElement(tempStyleCtx);
  }

  const handleBtnAlign = (e:any) => { // Button alignment
    let tempStyleCtx  = getStyleOfElement();
    const ret = setStylesToCtx(["text-align"], [`${e.target.value}`], 7);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 7);
    setStyleOfElement(tempStyleCtx);
  }

  const handleBtnTextAlign = (e:any) => { // Button text alignment
    let tempStyleCtx  = getStyleOfElement();
    const ret = setStylesToCtx(["text-align"], [`${e.target.value}`], 6);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 6);
    setStyleOfElement(tempStyleCtx);
  }

  const btnWidthItems = [
    {
      key:"100",
      label:"Full Width",
    },
    {
      key:"fit-content",
      label:"Fit Content",
    }
  ];

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "form_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("form_setting")}>
        Form
      </div>
      <div style={{ display:`${selectedSetting === "form_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        <div style={{ borderBottom:"2px dashed #fff", paddingBottom:"10px" }}>
          <div><CommonStylesSettings componentName={"Row"} componentNumber={8}/></div>
          <div><CommonStylesSettings componentName={"Submit Button"} componentNumber={9}/></div>
          <div className={`inner_setting`}><Select selRef={autoRef} label="Auto Responder" items={autoResData} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>handleAutoResponder(e)} /></div>
          <div className={`inner_setting`}><Select selRef={formTypeRef} label="Form Type" items={MenuStyleItems} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>handleFormType(e)} /></div>
          <div className={`${styles.mainContainer} url-atom-element`}>
            <UrlAtom getUrl={handleRedirectUrl} getUrlType={handleUrlType} urlTypeVal={urlType} menuUrlVal={redirectUrl} label="Redirect URL"/>
          </div>
          <div className={`inner_setting`}><Text label="Button Name" defaultValue={submitBtnName} type="text" onChange={(e:any)=>handleSubmitBtnName(e)} /></div>
          <div className={`inner_setting`}><Select selRef={btnWidthRef} label="Button Width" items={btnWidthItems} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>handleBtnWidth(e)} /></div>
          <div className={`inner_setting`}><Select selRef={btnAlignRef} label="Button Align" items={TextAlignItems} onChange={(e:any)=>handleBtnAlign(e)} /></div>
          <div className={`inner_setting`}><Select selRef={btnTextAlignRef} label="Button Text Align" items={TextAlignItems} onChange={(e:any)=>handleBtnTextAlign(e)} /></div>
        </div>

        <div title="Add New" className={styles.addIcon} onClick={handleAddForm}>
          <AddBoxIcon />
        </div>

        <div onDrop={() => dropForm()}>
          {
            formArr?.map((form, fIdx) => {
              return (
                <div key={fIdx}>
                  <div
                    className={styles.dragableElement}
                    draggable={selDragForm === fIdx ? "true":"false"} 
                    onDragLeave={dragLeaveFormFunc} 
                    onDragOver={(e) => dragOverFormFunc(e,fIdx)} 
                    onDragStart={() => dragForm(fIdx)}
                  >
                    <span className='cursorPointer' title='Move'>
                      <OpenWithOutlinedIcon fontSize="medium" onMouseDown={()=>setSelDragForm(fIdx)}/>
                    </span>
                    <span>{form?.label}</span>
                    <span style={{float:"right"}}>
                      <span className='cursorPointer' title='Edit'><EditIcon fontSize="medium" onClick={() => handleEditForm(fIdx)} /></span>
                      {form?.type !== "email" && <span className='cursorPointer' title='Delete'><DeleteOutlineIcon fontSize="medium" onClick={() => handleDeleteForm(fIdx)} /></span>}
                    </span>
                  </div>
                </div>
              )
            })
          }
        </div>

      </div> 

    </Fragment>
  );

}

export default FormSetting;
