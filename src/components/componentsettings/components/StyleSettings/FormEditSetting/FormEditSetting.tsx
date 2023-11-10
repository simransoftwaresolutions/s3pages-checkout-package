import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/FormEditSetting.module.css';
import { Range, Select, Text, TextArea } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { FormElementTypeItems } from '../../Atoms/datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { deepCloneStyle, deepCloneSection, deepCloneArray } from '../../../../../utils/functions';
import AtomStyleSelectorSettings from '../../StyleSettings/AtomStyleSelectorSettings';
import CommonStylesSettings from '../CommonStylesSettings';

const FormEditSetting = () => {

  const [formArr, setFormArr] = useState<any[]>();

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { formIdx, setFormIdx, editForm, setEditForm, openForm, setOpenForm } = useSettingsCtx();
  const [ element, setElement ] = useState<any>('');
  const [ newInputType, setNewInputType ] = useState<string>('');
  const [ newElementType, setNewElementType ] = useState<string>('');

  const [ label, setLabel ] = useState<any>('');
  const [ required, setRequired ] = useState<boolean>(false);
  const [ placeholder, setPlaceholder ] = useState<any>('');
  const [ defaultValue, setDefaultValue ] = useState<any>('');
  const [ eleId, setEleId ] = useState<any>('');
  const [ displayRangeVal, setDisplayRangeVal ] = useState<boolean>(false);
  const [ minRange, setMinRange ] = useState<number>(0);
  const [ maxRange, setMaxRange ] = useState<number>(0);
  const [ stepRange, setStepRange ] = useState<number>(0);

  useEffect(() => {
    if(editForm) return;

    getNewInputType();
    getNewElementType();

    setLabel(element);
    setPlaceholder(`Enter ${element}`);
    setDefaultValue('');
    setDisplayRangeVal(false);
    setRequired(false);
    setMinRange(0);
    setMaxRange(0);
    setStepRange(0);
  }, [element])
  
  useEffect(() => {

    if(!editForm) return;

    let tempStyleCtx = getStyleOfElement();
    const tempFormArr = tempStyleCtx?.formArr;
    setFormArr(tempFormArr);

    if(tempFormArr && tempFormArr[formIdx] && tempFormArr[formIdx].label) setLabel(tempFormArr[formIdx]?.label);
    if(tempFormArr && tempFormArr[formIdx] && tempFormArr[formIdx].placeholder) setPlaceholder(tempFormArr[formIdx]?.placeholder);
    if(tempFormArr && tempFormArr[formIdx] && tempFormArr[formIdx].defaultValue) setDefaultValue(tempFormArr[formIdx]?.defaultValue);
    if(tempFormArr && tempFormArr[formIdx] && tempFormArr[formIdx].displayValue) setDisplayRangeVal(tempFormArr[formIdx]?.displayValue);
    if(tempFormArr && tempFormArr[formIdx] && tempFormArr[formIdx].min) setMinRange(tempFormArr[formIdx]?.min);
    if(tempFormArr && tempFormArr[formIdx] && tempFormArr[formIdx].max) setMaxRange(tempFormArr[formIdx]?.max);
    if(tempFormArr && tempFormArr[formIdx] && tempFormArr[formIdx].step) setStepRange(tempFormArr[formIdx]?.step);
    if(tempFormArr && tempFormArr[formIdx] && tempFormArr[formIdx].required) setRequired(tempFormArr[formIdx]?.required);

  }, [formIdx]);

  const getNewInputType = () => {
    if(element && (element === 'Full Name' || element === 'Email' || element === 'Subject')) setNewInputType("Text");
    if(element && element === 'Message') setNewInputType("Textarea");
  }

  const getNewElementType = () => {
    if(element && (element === 'Full Name' || element === 'Subject')) setNewElementType("text");
    if(element && (element === 'Email')) setNewElementType("email");
  }

  const handleLabel = (e:any) => {
    setLabel(e.target.value);
  }

  const handlePlaceholder = (e:any) => {
    setPlaceholder(e.target.value);
  }

  const handleDefaultValue = (e:any) => {
    if(editForm){
      if(formArr && formArr[formIdx]?.inputType === 'Text') setDefaultValue(e.target.value);
      if(formArr && formArr[formIdx]?.inputType === 'Textarea') setDefaultValue(e.target.value);
      if(formArr && formArr[formIdx]?.inputType === 'Range') setDefaultValue(parseInt(e.target.value));
    }else{
      if(element === 'Text') setDefaultValue(e.target.value);
      if(element === 'Textarea') setDefaultValue(e.target.value);
      if(element === 'Range') setDefaultValue(parseInt(e.target.value));
    }

  }

  const labelInput = () => {
    return <div className={`inner_setting`}><Text label="Label" defaultValue={label} type="text" onChange={(e:any)=>handleLabel(e)} /></div>
  }

  const placeholderInput = () => {
    return <div className={`inner_setting`}><Text label="Placeholder" defaultValue={placeholder} type="text" onChange={(e:any)=>handlePlaceholder(e)} /></div>
  }

  const defaultValueInput = () => {
    return <div className={`inner_setting`}><Text label="Value" defaultValue={defaultValue} type="text" onChange={(e:any)=>handleDefaultValue(e)} /></div>
  }

  const defaultValueTextare = () => {
    return <div className={`inner_setting`}><TextArea label="Value" defaultValue={defaultValue} onChangeTextarea={(e:any)=>handleDefaultValue(e)} /></div>
  }

  const displayValueRange = () => {
    return (
      <div className="form-check form-switch">
        <div className={`${styles.Highlights}`}>
            <label className="form-check-label">Display Value</label>
            <input className="form-check-input" type="checkbox" role="switch" onChange={() => setDisplayRangeVal(!displayRangeVal)} checked={displayRangeVal ? true:false} />
        </div>
      </div>
    )
  }

  const requiredSwitch = () => {
    return (
      <div className="form-check form-switch py-2">
        <div className={`${styles.Highlights}`}>
            <label className="form-check-label">Required</label>
            <input className="form-check-input" type="checkbox" role="switch" onChange={() => setRequired(!required)} checked={required ? true:false} />
        </div>
      </div>
    )
  }
  
  const minRangeInput = () => {
    return <div className={`inner_setting`}><Text label="Min" defaultValue={minRange} type="number" onChange={(e:any)=>setMinRange(parseInt(e.target.value))} /></div>
  }
  
  const maxRangeInput = () => {
    return <div className={`inner_setting`}><Text label="Max" defaultValue={maxRange} type="number" onChange={(e:any)=>setMaxRange(parseInt(e.target.value))} /></div>
  }
  
  const stepRangeInput = () => {
    return <div className={`inner_setting`}><Text label="Step" defaultValue={stepRange} type="number" onChange={(e:any)=>setStepRange(parseInt(e.target.value))} /></div>
  }
  
  const defaultValueRange = () => {
    return <div className={`inner_setting`}><Text label="Value" defaultValue={defaultValue} type="number" onChange={(e:any)=>setDefaultValue(parseInt(e.target.value))} /></div>
  }

  const handleTextForm = () => {

    if(!label) return;
    let tempStyleCtx = getStyleOfElement();
    if(editForm){
      tempStyleCtx.formArr[formIdx].label = label;
      tempStyleCtx.formArr[formIdx].placeholder = placeholder;
      tempStyleCtx.formArr[formIdx].defaultValue = defaultValue;
      tempStyleCtx.formArr[formIdx].required = required;
    }else{

      const _textEle = {
        inputType:newInputType,
        label:label,
        type:newElementType,
        placeholder:placeholder,
        defaultValue:defaultValue,
        required:required,
        id:`${eleId}`
      }
      tempStyleCtx.formArr.push(_textEle);

    }

    setStyleOfElement(tempStyleCtx);
    setOpenForm(false);

  }

  const handleTextAreaForm = () => {

    if(!label) return;
    let tempStyleCtx = getStyleOfElement();
    
    if(editForm){
      tempStyleCtx.formArr[formIdx].label = label;
      tempStyleCtx.formArr[formIdx].defaultValue = defaultValue;
      tempStyleCtx.formArr[formIdx].required = required;
    }else{

      const _textareaEle = {
        inputType:newInputType,
        label:label,
        placeholder:placeholder,
        defaultValue:defaultValue,
        required:required,
        id:`${eleId}`
      }
      tempStyleCtx.formArr.push(_textareaEle);
    }

    setStyleOfElement(tempStyleCtx);
    setOpenForm(false);

  }

  const handleRangeForm = () => {

    if(!label) return;
    let tempStyleCtx = getStyleOfElement();

    if(editForm){
      tempStyleCtx.formArr[formIdx].label = label;
      tempStyleCtx.formArr[formIdx].defaultValue = defaultValue;
      tempStyleCtx.formArr[formIdx].min = minRange;
      tempStyleCtx.formArr[formIdx].max = maxRange;
      tempStyleCtx.formArr[formIdx].step = stepRange;
      tempStyleCtx.formArr[formIdx].displayValue = displayRangeVal;
    }else{
      const _rangeEle = {
        inputType:element,
        label:label,
        defaultValue:defaultValue,
        min:minRange,
        max:maxRange,
        step:stepRange,
        displayValue:displayRangeVal,
        id:`${eleId}`
      }
      tempStyleCtx.formArr.push(_rangeEle);
    }

    setStyleOfElement(tempStyleCtx);

    setOpenForm(false);

  }

  const handleTextButton = <div className={`${styles.addEditBtn} btn btn-primary`} onClick={handleTextForm}>{editForm ? "Save" : "Add"}</div>;
  const handleTextareButton = <div className={`${styles.addEditBtn} btn btn-primary`} onClick={handleTextAreaForm}>{editForm ? "Edit" : "Add"}</div>;
  const handleRangeButton = <div className={`${styles.addEditBtn} btn btn-primary`} onClick={handleRangeForm}>{editForm ? "Edit" : "Add"}</div>;

  const getStyleSelector = () => {
    if(editForm && formArr && formArr[formIdx]){
      switch(formArr[formIdx]?.id){
        case "formfullname":
          return <AtomStyleSelectorSettings elementType={"fullNameClassName"}/>
          break;
        case "formemail":
          return <AtomStyleSelectorSettings elementType={"emailClassName"}/>
          break;
        case "formsubject":
          return <AtomStyleSelectorSettings elementType={"subjectClassName"}/>
          break;
      }
    }else{
      switch(eleId){
        case "formfullname":
          return <AtomStyleSelectorSettings elementType={"fullNameClassName"}/>
          break;
        case "formemail":
          return <AtomStyleSelectorSettings elementType={"emailClassName"}/>
          break;
        case "formsubject":
          return <AtomStyleSelectorSettings elementType={"subjectClassName"}/>
          break;
      }
    }
  }

  const drawInput = (inputType:string, type:string="") => {
    switch(inputType){
      case "Text":
        return (
          <>
            {labelInput()}
            {editForm && <div><CommonStylesSettings componentName={"Common"} componentNumber={10+formIdx}/></div>}
            {type === "email" ? <></> : requiredSwitch()}
            {placeholderInput()}
            {defaultValueInput()}
            {handleTextButton}
          </>
        )
        break;
      case "Textarea":
        return (
          <>
            {labelInput()}
            {editForm && <div><CommonStylesSettings componentName={"Common"} componentNumber={10+formIdx}/></div>}
            {requiredSwitch()}
            {defaultValueTextare()}
            {handleTextareButton}
          </>
        )
        break;
      case "Range":
        return (
          <>
            {labelInput()}
            {requiredSwitch()}
            {minRangeInput()}
            {maxRangeInput()}
            {stepRangeInput()}
            {defaultValueRange()}
            {displayValueRange()}
            {handleRangeButton}
          </>
        )
        break;
    }
  }

  const addElement = (val:any) => {
    setElement(val);
    switch(val){
      case "Full Name":
        setEleId("formfullname");
      break
      case "Email":
        setEleId("formemail");
      break
      case "Subject":
        setEleId("formsubject");
      break
      case "Message":
        setEleId("formtxtare");
      break
      default:
        setEleId("");
      break
    }
  }

  return (
    <Fragment>
      <div className={styles.formContainer}>
        
        {
          editForm && formArr && formArr[formIdx] ?  
          drawInput(formArr[formIdx]?.inputType, formArr[formIdx]?.type):
          (
            <>
              <div className={`${styles.addDropdown} inner_setting`}><Select label="Select Element" items={FormElementTypeItems} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>addElement(e.target.value)} /></div>
              {element && drawInput(newInputType)}
            </>
          )
        }        
      </div> 

    </Fragment>
  );

}

export default FormEditSetting;
