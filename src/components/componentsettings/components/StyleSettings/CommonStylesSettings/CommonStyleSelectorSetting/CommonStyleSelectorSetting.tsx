import React, { Fragment } from 'react';
import styles from './CommonStyleSelectorSetting.module.css';
import { Text, Select } from '../../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../../context/pagepreview/SettingsContext";
import { deepCloneArray } from '../../../../../../utils/functions';
import { useContentCtx } from "../../../../../../context/pagepreview/ContentsContext";
import { usePagesCtx } from '../../../../../../context/pagepreview/PagesContext';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

interface CommonSelctorProps {
  componentNumber:number;
  activeComponent:string; 
  setActiveComponent:any;
  showCommnSettings:boolean;
  setShowCommnSettings:any;
}

const CommonStyleSelectorSetting = ({componentNumber, activeComponent, setActiveComponent, showCommnSettings, setShowCommnSettings}:CommonSelctorProps) => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { setCommonStyleSelector, queryData, stylesCtx, stylesGlobCtx, statesName, setStatesName } = usePagesCtx();
  const [ styleSelctor, setStyleSelctor] = useState<string>("");
  const [ addStyleSel, setAddStyleSel] = useState<any>([]);
  const [ globCss, setGlobCss] = useState<any>([]);
  const clsSelRef = useRef<any>(null);
  const clsDropDonRef = useRef<any>(null);
  const [ showSlectorBox, setShowSlectorBox] = useState<boolean>(true);
  const [ showStates, setShowStates] = useState<boolean>(false);
  const [ arr, setArr ] = useState<any>([]);
  const [ arr1, setArr1 ] = useState<any>([]);
  const statesArr = [
    {key:"", label:"None"},
    {key:"hover", label:"Hover"},
    {key:"focus", label:"Focus"},
  ];

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();
    const _mainClassName = tempStyleCtx?.styleClasses?.childClassName[componentNumber] || []; 

    setAddStyleSel(_mainClassName);

    const _globCss = [];
    if(queryData?.siteType === "themesite" && stylesCtx?.styles && stylesCtx?.styles?.length){
      for(let i=0; i<stylesCtx?.styles?.length; i++){
        const _obj = {
          label:stylesCtx?.styles[i]?.data?.name?.replace(".","")?.trim(),
          selector:(stylesCtx?.styles[i]?.data?.selector)?.replace(/(mobileview|desktopview|tabletview): /, '')?.replace(/[: ]/g, '')?.trim(),
        };
        if(_obj.label && !_obj?.label?.includes("undefined") && !_obj?.label?.includes(".")) _globCss.push(_obj);

      }
    }
    if(stylesGlobCtx?.styles && stylesGlobCtx?.styles?.length){
      for(let i=0; i<stylesGlobCtx?.styles?.length; i++){
        const _obj = {
          label:(stylesGlobCtx?.styles[i]?.data?.name?.replace(".",""))?.trim(),
          selector:(stylesGlobCtx?.styles[i]?.data?.selector)?.replace(/(mobileview|desktopview|tabletview): /, '')?.replace(/[: ]/g, '')?.trim(),
        };
        if(_obj.label && !_obj?.label?.includes("undefined") && !_obj?.label?.includes(".")) _globCss.push(_obj);

      }
    }

    setGlobCss(_globCss);

    // clsSelRef?.current?.focus();

  }, [changeStyleOfElement, getStyleOfElement]);
 
  useEffect(()=>{
    setStatesName("");
  }, [changeStyleOfElement])
  
  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const handleStyleSlector = (val:string, e:any, selector:string="") => {
    e.preventDefault();
    e.stopPropagation();
    if(!val) return;
    let tempStyleCtx = getStyleOfElement();
    const _obj = {label:val, selector: (selector ? selector : `.${val.replaceAll(" ", "-").toLowerCase()}`)}
    if(tempStyleCtx?.styleClasses?.childClassName && tempStyleCtx?.styleClasses?.childClassName[componentNumber]){
      tempStyleCtx.styleClasses.childClassName[componentNumber].push(_obj);
    }else{
      tempStyleCtx.styleClasses.childClassName[componentNumber] = [_obj];
    }

    setStyleOfElement(tempStyleCtx);

    setStyleSelctor("");
    setCommonStyleSelector(val);

    const _addStyleSel = deepCloneArray(addStyleSel);
    _addStyleSel.push(_obj);
    setAddStyleSel(_addStyleSel);
    setShowSlectorBox(false);
    setArr1([]);
  }

  const removeStyleSel = (aIdx:number) => {

    if(aIdx+1 < addStyleSel.length) return;
    let tempStyleCtx = getStyleOfElement();
    
    let _index = tempStyleCtx?.styleClasses?.childClassName[componentNumber]?.findIndex((x:any) => x.label === addStyleSel[aIdx]?.label);
    tempStyleCtx?.styleClasses?.childClassName[componentNumber].splice(_index, 1);
    setStyleOfElement(tempStyleCtx);

    const _addStyleSel = deepCloneArray(addStyleSel);
    _addStyleSel.splice(aIdx, 1);
    setAddStyleSel(_addStyleSel);
  }

  const showparentCssTextBox = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    if(!showSlectorBox){
      setShowSlectorBox(true);
      setTimeout(()=>{
        clsSelRef?.current?.focus();
      },400);
    }
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    const code = e.code || e.keyCode || e.which || e.charCode;
    if(code === "Enter"){
      handleStyleSlector(styleSelctor, e);
    }
  }

  const handleSelector = (e:any) => {
    let val = e.target.value;
    val = val?.replace(/["']/g, '');
    setStyleSelctor(val)   
    
    if(!val){
      setArr1([]);
      return;
    }
    let _selArr:any = [];

    for(let i=0; i< globCss?.length; i++){
      if(globCss[i]?.label?.indexOf(val) === 0){
        _selArr.push(globCss[i]);
      } 
    }
    setArr1(_selArr);
  }

  const handleStates = (e:any, state:string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setStatesName(state);
    setShowStates(false);
  }

  const [ open, setOpen] = useState<boolean>(false);
  return (
    <Fragment>
      {/* <div className={`${styles.subSettingTitle} ${activeComponent === "cmn_styl_sel" ? "active_subsetting" : ""}`} onClick={()=>setActiveComponent("cmn_styl_sel")}>
        Style Selector Settings <span style={{ float:"right" }}>{activeComponent === "cmn_styl_sel" ? <KeyboardArrowUpIcon fontSize='medium'/> : <KeyboardArrowDownIcon fontSize='medium'/>}</span>
      </div> */}
      <div style={{ backgroundColor:"#0e0e0e" }}>

        <div className={`${styles.mainContainer} inner_setting`} onClick={(e:any)=>showparentCssTextBox(e)}>
          <div className={styles.clsLabel}>Style Selector</div>
          <div className={styles.clsBtnContainer}>

            {
              addStyleSel?.length ? (
                addStyleSel.map((add:any, aIdx:number) => {
                  return (
                    <div key={aIdx} className={styles.clsName} onClick={(e:any)=>{e.preventDefault();e.stopPropagation();setShowSlectorBox(false);}}>
                      {add?.label}
                      { (!statesName && addStyleSel.length === aIdx+1) && <span onClick={()=>removeStyleSel(aIdx)}> <CancelPresentationIcon /></span>}
                    </div>
                  )
                })
                
              ):<></>
            }
            {
              statesName &&
              (
                <div className={styles.clsName}>
                  {statesName}
                  <span onClick={()=>setStatesName("")}> <CancelPresentationIcon /></span>
                </div>
              )
            }
          </div>
          <div className={styles.statesBoxArrw} onClick={()=>setShowStates(!showStates)}><KeyboardArrowDownIcon fontSize='small' /></div>
          {
            showStates && 
            <div className={styles.statesBox}>
              <div>
                <div className={styles.statesTitle}>States</div>
                {
                  statesArr?.map((state:any,stateIdx:number) => {
                    return (
                      <div key={stateIdx} className={styles.statesCls} onClick={(e:any) => handleStates(e, state.key)}>{state?.label}</div>
                    )
                  })
                }
              </div>
            </div>
          }
          <div className={styles.clsIpBox}>
            {showSlectorBox && (
            <div>
              <Text onKeyDown={(e:any)=>handleKeyDown(e)} refText={clsSelRef} placeholder="Enter new class" format={OutlinedFormat} defaultValue={styleSelctor} type="text" onChange={(e:any)=>handleSelector(e)} />
              <div className={styles.settingIcon} onClick={(e:any)=>{e.stopPropagation();setShowCommnSettings(!showCommnSettings);}}><SettingsOutlinedIcon fontSize='small'/></div>
              <div className={styles.dBoxComntainer}>
                {
                  arr1?.map((a:any, aIdx:number) => {
                    return (
                      <div key={aIdx} className={styles.dropDownBox}>
                        <span className={styles.dropDowninnerBox} onClick={(e:any)=>{handleStyleSlector(a?.label, e, a?.selector);}}>{a?.label}</span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            )}
          </div>
        </div>

      </div>

    </Fragment>
  );

}

export default CommonStyleSelectorSetting;
