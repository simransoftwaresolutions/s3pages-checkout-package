import React, { Fragment } from 'react';
import styles from './FaqAnswerSetting.module.css';
import { Text, Range, Select } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import ColorPickerBox from '../../Atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import FontDropdown from '../../StyleSettings/FontDropdown';
import { GetCollectionData } from "../../../../../service/pagepreview/PagesServices";
import QueAnsStyleSelectorSettings from '../../StyleSettings/QueAnsStyleSelectorSettings';
import { TextAlignItems } from '../../Atoms/datas/commonComponentData';
import QueAnsFaqPadding from '../../StyleSettings/QueAnsFaqPadding';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const FaqAnswerSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtxForFaq, setStylesToCtxForFaq, faqCollectionId } = useSettingsCtx();
  const { commonStyleSelector, statesName } = usePagesCtx();
  const [lineHeightVal, setLineHeightVal] = useState<number>(8);
  const [ fieldSelctData, setFieldSelctData] = useState<any[]>([]);
  const afieldRef = useRef<any>(null);
  const ansAlnRef = useRef<any>(null);
  const [ collectionData, setCollectionData] = useState<any>({});

  const { changeStyleOfElement } = useContentCtx();

  const [textColor, setTextColor] = useState<any>();
  const [bgColor, setBgColor] = useState<any>();
  const [fontSizeVal, setFontSizeVal] = useState<number>(8);
  const [ansClsName, setAnsClsName] = useState<any>();
  const [padding, setPadding] = useState<string>("");

  useEffect(() => {
    
    let tempStyleCtx = getStyleOfElement();

    const _ansClsName = tempStyleCtx?.ansClassName || []; 
    setAnsClsName(_ansClsName);

    const fontColor = getStylesFromCtxForFaq("color", 'answer', 0);

    if(fontColor){
      setTextColor(fontColor);
    }else{
      setTextColor("#ffffffff");
    }

    const bgColor = getStylesFromCtxForFaq("background", 'answer', 0);
    setBgColor(bgColor || "#ffffffff");

    let textSize = getStylesFromCtxForFaq("font-size", 'answer', 0);

    if(textSize){
      textSize = textSize?.replace("px", "");
      setFontSizeVal((parseInt(textSize)));
    }else{
      setFontSizeVal(0);
    }

    let _lineHeight = getStylesFromCtxForFaq("line-height", 'answer', 0);

    if(_lineHeight){
      _lineHeight = _lineHeight.replace("px", "");
      setLineHeightVal(_lineHeight);
    }else{
      setLineHeightVal(0);
    }

    const _testAlign = getStylesFromCtxForFaq("text-align", 'answer', 0);
    if(ansAlnRef && ansAlnRef?.current){
      ansAlnRef.current.value = _testAlign || "left";
    }

    const _padding = getStylesFromCtxForFaq("padding", 'answer', 0);
    setPadding(_padding || "");

  }, [changeStyleOfElement, commonStyleSelector, statesName])

  useEffect(() => {

    const init = async() => {
      if(faqCollectionId !== undefined){
        await populateCollectionData(faqCollectionId);
        let tempStyleCtx = getStyleOfElement();
        if(afieldRef && afieldRef?.current && faqCollectionId !== undefined) afieldRef.current.value = tempStyleCtx?.answerIdx;
      }
    }

    init();
    
  },[changeStyleOfElement, faqCollectionId]);

  const populateCollectionData = async(val:any) => {
    const collData = await GetCollectionData(val);

    if(collData?.status){
      setCollectionData(collData?.data || {});

      if(collData?.data?.fields?.length){
        const _fData = [{
          key:-1,
          label:"Select Field",
        }];

        for(let i=0; i<collData?.data?.fields?.length; i++){
          if(collData?.data?.fields[i]?.type !== "name" && collData?.data?.fields[i]?.type !== "slug" ){
            const _fSelctAtom = {
              key:collData?.data?.fields[i]?.index,
              label:collData?.data?.fields[i]?.name,
            }
            _fData.push(_fSelctAtom);
          }

        }
        setFieldSelctData(_fData);
      }
    }    
  }

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const handleBgColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();
    setBgColor(color);

    const ret = setStylesToCtxForFaq(["background"], [`${color}`], 'answer',0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);
  }

  // style selector  
  const setAnswerClasses = (val:any) => {
    
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.ansClassName = val;
    setStyleOfElement(tempStyleCtx);

    setAnsClsName(val)
  }

  const handleTextColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();
    setTextColor(color);

    const ret = setStylesToCtxForFaq(["color"], [`${color}`], 'answer',0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);
  }

  const setFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {

    let tempStyleCtx = getStyleOfElement();
    setFontSizeVal(parseInt(e.target.value));
    
    const ret = setStylesToCtxForFaq(["font-size"], [`${parseInt(e.target.value)}px`], 'answer', 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);
  }

  // font family
  const setFontFamily = (e:any) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtxForFaq(["font-family"], [`${e}`], 'answer', 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);
  }

  // line height  
  const setLineHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    let tempStyleCtx = getStyleOfElement();

    setLineHeightVal(parseInt(e.target.value));
    
    const ret = setStylesToCtxForFaq(["line-height"], [`${parseInt(e.target.value)}px`], 'answer', 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

  }

  
  const handlePadding = (val:string) => {

    let tempStyleCtx = getStyleOfElement();
    setPadding(val);

    const ret = setStylesToCtxForFaq(["padding"], [`${val}`], 'answer',0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);
  }

  // text-align  
  const handleTextAlign = (e: any) => {
  
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtxForFaq(["text-align"], [e.target.value], 'answer', 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

  }

  const handleFieldName = (val:any) => {
    if(val === -1) return;

    if(collectionData?.collection_data?.length){
      
      let tempStyleCtx = getStyleOfElement();
      const _dataLimit = collectionData.collection_data.length;
      let ans = [];

      for(let i=0; i<_dataLimit; i++){
        for(let j=0; j<collectionData?.collection_data[i]?.fields?.length; j++){
          if(collectionData?.collection_data[i]?.fields[j]?.index === val){
            ans.push(collectionData?.collection_data[i]?.fields[j]?.value);
          }
        }
      }

      tempStyleCtx.faqData.answer = ans;
      tempStyleCtx.answerIdx = val;
      setStyleOfElement(tempStyleCtx);
    }

  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "faq_ans_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("faq_ans_setting")}>
        Answer Settings
      </div>
      <div style={{ display:`${selectedSetting === "faq_ans_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        <div className={`${styles.mainContainer} inner_setting`}>
          <QueAnsStyleSelectorSettings mClsName={ansClsName} retHandle={(val:any)=>setAnswerClasses(val)} />
        </div>

        {
          (fieldSelctData?.length && fieldSelctData.length-1) ?
          (
            <Fragment>
              <div className={`${styles.mainContainer} inner_setting`}>
                <Select selRef={afieldRef} format={OutlinedFormat} label="Answer Field" items={fieldSelctData} onChange={(e:any)=>handleFieldName(parseInt(e.target.value))} />
              </div>

            </Fragment>
          ):(<></>)
        }

        <div className={`${styles.mainContainer} inner_setting`}>
          <ColorPickerBox name="Text Color" colorHex={textColor} retColor={handleTextColorChange} />
        </div>

        <QueAnsFaqPadding paddingValue={padding} setPaddingValue={handlePadding}/>

        <div className={`${styles.mainContainer} inner_setting`}>
          <ColorPickerBox name="Background Color" colorHex={bgColor} retColor={handleBgColorChange} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={ansAlnRef} format={OutlinedFormat} label="Text Align" items={TextAlignItems} onChange={(e:any)=>handleTextAlign(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} id="main_btn_sub_text_size" label="Font Size" min={8} max={200} step={1} defaultValue={fontSizeVal} onChange={(e:any)=>setFontSize(e)} />
        </div>  

        <div className={`${styles.mainContainer} inner_setting`}>
          <FontDropdown setFontFamily={(e:any)=>setFontFamily(e)} />
        </div>
        
        <div className={`${styles.mainContainer} inner_setting`}>
          <Range displayValue={true} format={OutlinedFormat} label="Line Height" min={8} max={200} step={1} defaultValue={lineHeightVal} onChange={(e:any)=>setLineHeight(e)} />
        </div>
      </div>
    </Fragment>
  );

}

export default FaqAnswerSetting;
