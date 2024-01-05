import React, { Fragment } from 'react';
import styles from '../../../../../styles/editorui/AtomStyleSelectorSettings.module.css';
import { Text } from '../../../atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/editorui/SettingsContext";
import { deepCloneArray } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/editorui/ContentsContext";
import { usePagesCtx } from '../../../../../context/editorui/PagesContext';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

interface FormStyleSelctorProp {
  elementType?:string;
}

const AtomStyleSelectorSettings = ({elementType}:FormStyleSelctorProp) => {

  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { setCommonStyleSelector, queryData, stylesCtx, stylesGlobCtx } = usePagesCtx();
  const [ styleSelctor, setStyleSelctor] = useState<string>("");
  const [ addStyleSel, setAddStyleSel] = useState<any>([]);
  const [ globCss, setGlobCss] = useState<any>([]);
  const clsSelRef = useRef<any>(null);
  const [ showSlectorBox, setShowSlectorBox] = useState<boolean>(true);
  const [ arr1, setArr1 ] = useState<any>([]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

    let tempStyleCtx = getStyleOfElement();
    let _submitClassName = []; 
    switch(elementType){
      case "fullNameClassName":
        _submitClassName = tempStyleCtx?.styleClasses?.fullNameClassName || []; 
        break;
      case "emailClassName":
        _submitClassName = tempStyleCtx?.styleClasses?.emailClassName || []; 
        break;
      case "subjectClassName":
        _submitClassName = tempStyleCtx?.styleClasses?.subjectClassName || []; 
        break;
      case "msgClassName":
        _submitClassName = tempStyleCtx?.styleClasses?.msgClassName || []; 
        break;
      case "submitClassName":
        _submitClassName = tempStyleCtx?.styleClasses?.submitClassName || []; 
        break;
    }
    // switch(elementType){
    //   case "fullNameClassName":
    //     break;
    //   case "emailClassName":
    //     break;
    //   case "subjectClassName":
    //     break;
    //   case "msgClassName":
    //     break;
    //   case "submitClassName":
    //     break;
    // }

    setAddStyleSel(_submitClassName);

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

    clsSelRef?.current?.focus();

  }, [changeStyleOfElement, getStyleOfElement]);
 
  

  const handleStyleSlector = (val:string, e:any, selector:string="") => {
    e.preventDefault();
    e.stopPropagation();
    if(!val) return;
    let tempStyleCtx = getStyleOfElement();
    const _obj = {label:val, selector: (selector ? selector : `.${val.replaceAll(" ", "-").toLowerCase()}`)}

    switch(elementType){
      case "fullNameClassName":
        if(tempStyleCtx?.styleClasses?.fullNameClassName){
          tempStyleCtx.styleClasses.fullNameClassName.push(_obj);
        }else{
          tempStyleCtx.styleClasses.fullNameClassName = [_obj];
        }
        break;
      case "emailClassName":
        if(tempStyleCtx?.styleClasses?.emailClassName){
          tempStyleCtx.styleClasses.emailClassName.push(_obj);
        }else{
          tempStyleCtx.styleClasses.emailClassName = [_obj];
        }
        break;
      case "subjectClassName":
        if(tempStyleCtx?.styleClasses?.subjectClassName){
          tempStyleCtx.styleClasses.subjectClassName.push(_obj);
        }else{
          tempStyleCtx.styleClasses.subjectClassName = [_obj];
        }
        break;
      case "msgClassName":
        if(tempStyleCtx?.styleClasses?.msgClassName){
          tempStyleCtx.styleClasses.msgClassName.push(_obj);
        }else{
          tempStyleCtx.styleClasses.msgClassName = [_obj];
        }
        break;
      case "submitClassName":
        if(tempStyleCtx?.styleClasses?.submitClassName){
          tempStyleCtx.styleClasses.submitClassName.push(_obj);
        }else{
          tempStyleCtx.styleClasses.submitClassName = [_obj];
        }
        break;
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
    
    let _index = tempStyleCtx?.styleClasses?.submitClassName?.findIndex((x:any) => x.label === addStyleSel[aIdx]?.label);
    
    switch(elementType){
      case "fullNameClassName":
        tempStyleCtx?.styleClasses?.fullNameClassName.splice(_index, 1);
        break;
      case "emailClassName":
        tempStyleCtx?.styleClasses?.emailClassName.splice(_index, 1);
        break;
      case "subjectClassName":
        tempStyleCtx?.styleClasses?.subjectClassName.splice(_index, 1);
        break;
      case "msgClassName":
        tempStyleCtx?.styleClasses?.msgClassName.splice(_index, 1);
        break;
      case "submitClassName":
        tempStyleCtx?.styleClasses?.submitClassName.splice(_index, 1);
        break;
    }
    
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

  const getTitle = () => {
    switch(elementType){
      case "fullNameClassName":
        return "Full Name Style Selector";
        break;
      case "emailClassName":
        return "Email Style Selector";
        break;
      case "subjectClassName":
        return "Subject Style Selector";
        break;
      case "msgClassName":
        return "Message Style Selector";
        break;
      case "submitClassName":
        return "Submit Style Selector";
        break;
    }

  }
  return (
    <Fragment>
      <div style={{ backgroundColor:"#0e0e0e" }}>

        <div className={`${styles.mainContainer} inner_setting`} onClick={(e:any)=>showparentCssTextBox(e)}>
          <div className={styles.clsLabel}> {getTitle()} </div>
          <div className={styles.clsBtnContainer}>

            {
              addStyleSel?.length ? (
                addStyleSel.map((add:any, aIdx:number) => {
                  return (
                    <div key={aIdx} className={styles.clsName} onClick={(e:any)=>{e.preventDefault();e.stopPropagation();setShowSlectorBox(false);}}>
                      {add?.label}
                      { addStyleSel.length === aIdx+1 && <span onClick={()=>removeStyleSel(aIdx)}> <CancelPresentationIcon /></span>}
                    </div>
                  )
                })
              ):<></>
            }
          </div>
          <div className={styles.clsIpBox}>
            {showSlectorBox && (
            <div>
              <Text onKeyDown={(e:any)=>handleKeyDown(e)} refText={clsSelRef} placeholder="Enter new class" format={OutlinedFormat} defaultValue={styleSelctor} type="text" onChange={(e:any)=>handleSelector(e)} />
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

export default AtomStyleSelectorSettings;
