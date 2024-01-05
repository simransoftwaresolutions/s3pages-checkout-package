import React, { Fragment } from 'react';
import styles from '../../../../../../styles/editorui/FaqQuestionSetting.module.css';
import { Range, Select } from '../../../../atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../../context/editorui/SettingsContext";
import { setClassesName } from '../../../../../../utils/functions';
import { useContentCtx } from "../../../../../../context/editorui/ContentsContext";
import ColorPickerBox from '../../../../atoms/ColorPickerBox';
import { usePagesCtx } from '../../../../../../context/editorui/PagesContext';
import FontDropdown from '../../../commonsettings/FontDropdown';
import { GetCollectionData } from "../../../../../../service/editorui/PagesServices";
import QueAnsStyleSelectorSettings from '../QueAnsStyleSelectorSettings';
import { TextAlignItems } from '../../../../datas/commonComponentData';
import QueAnsFaqPadding from '../QueAnsFaqPadding';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const FaqQuestionSetting = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement,faqCollectionId } = useSettingsCtx();
  const { getStylesFromCtxForFaq, setStylesToCtxForFaq } = useSettingsCtx();
  const { commonStyleSelector, statesName } = usePagesCtx();
  const [lineHeightVal, setLineHeightVal] = useState<number>(8);
  const [ fieldSelctData, setFieldSelctData] = useState<any[]>([]);
  const [ collectionData, setCollectionData] = useState<any>({});
  const qfieldRef = useRef<any>(null);
  const queAlnRef = useRef<any>(null);

  const { changeStyleOfElement } = useContentCtx();

  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState<any>();
  const [bgColor, setBgColor] = useState<any>();
  const [fontSizeVal, setFontSizeVal] = useState<number>(8);
  const [queClsName, setQueClsName] = useState<any>();
  const [padding, setPadding] = useState<string>("");

  useEffect(() => {
    
    let tempStyleCtx = getStyleOfElement();

    const _queClsName = tempStyleCtx?.queClassName || []; 
    setQueClsName(_queClsName);

    const fontColor = getStylesFromCtxForFaq("color", 'question', 0);

    if(fontColor){
      setTextColor(fontColor);
    }else{
      setTextColor("#ffffffff");
    }

    const _testAlign = getStylesFromCtxForFaq("text-align", 'question', 0);
    if(queAlnRef && queAlnRef?.current){
      queAlnRef.current.value = _testAlign || "left";
    }

    const _padding = getStylesFromCtxForFaq("padding", 'question', 0);
    setPadding(_padding || "");

    const bgColor = getStylesFromCtxForFaq("background", 'question', 0);
    setBgColor(bgColor || "#ffffffff");

    let textSize = getStylesFromCtxForFaq("font-size", 'question', 0);

    if(textSize){
      textSize = textSize?.replace("px", "");
      setFontSizeVal((parseInt(textSize)));
    }else{
      setFontSizeVal(0);
    }

    let _lineHeight = getStylesFromCtxForFaq("line-height", 'question', 0);

    if(_lineHeight){
      _lineHeight = _lineHeight.replace("px", "");
      setLineHeightVal(_lineHeight);
    }else{
      setLineHeightVal(0);
    }

  }, [changeStyleOfElement, commonStyleSelector, statesName])

  useEffect(() => {

    const init = async() => {
      if(faqCollectionId !== undefined){
        await populateCollectionData(faqCollectionId);
        let tempStyleCtx = getStyleOfElement();
        if(qfieldRef && qfieldRef?.current && faqCollectionId !== undefined) qfieldRef.current.value = tempStyleCtx?.questionIdx;
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

  const handleTextColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();
    setTextColor(color);

    const ret = setStylesToCtxForFaq(["color"], [`${color}`], 'question',0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);
  }

  const handlePadding = (val:string) => {

    let tempStyleCtx = getStyleOfElement();
    setPadding(val);

    const ret = setStylesToCtxForFaq(["padding"], [`${val}`], 'question',0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);
  }

  const handleBgColorChange = (color:any) => {

    let tempStyleCtx = getStyleOfElement();
    setBgColor(color);

    const ret = setStylesToCtxForFaq(["background"], [`${color}`], 'question',0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);
  }

  const setFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {

    let tempStyleCtx = getStyleOfElement();
    setFontSizeVal(parseInt(e.target.value));
    
    const ret = setStylesToCtxForFaq(["font-size"], [`${parseInt(e.target.value)}px`], 'question', 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
    setStyleOfElement(tempStyleCtx);
  }

  // font family
  const setFontFamily = (e:any) => {
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtxForFaq(["font-family"], [`${e}`], 'question', 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);
  }

  // line height  
  const setLineHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    let tempStyleCtx = getStyleOfElement();

    setLineHeightVal(parseInt(e.target.value));
    
    const ret = setStylesToCtxForFaq(["line-height"], [`${parseInt(e.target.value)}px`], 'question', 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

  }

  // text-align  
  const handleTextAlign = (e: any) => {
    
    let tempStyleCtx = getStyleOfElement();

    const ret = setStylesToCtxForFaq(["text-align"], [e.target.value], 'question', 0);
    tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);

    setStyleOfElement(tempStyleCtx);

  }

  // style selector  
  const setQuestionClasses = (val:any) => {
    
    let tempStyleCtx = getStyleOfElement();
    tempStyleCtx.queClassName = val;
    setStyleOfElement(tempStyleCtx);

    setQueClsName(val)
  }

  const handleFieldName = (val:any) => {
    if(val === -1) return;

    if(collectionData?.collection_data?.length){
      
      let tempStyleCtx = getStyleOfElement();
      const _dataLimit = collectionData.collection_data.length;
      let que = [];

      for(let i=0; i<_dataLimit; i++){
        for(let j=0; j<collectionData?.collection_data[i]?.fields?.length; j++){
          if(collectionData?.collection_data[i]?.fields[j]?.index === val){
            que.push(collectionData?.collection_data[i]?.fields[j]?.value);
          }
        }
      }

      tempStyleCtx.faqData.question = que;
      tempStyleCtx.questionIdx = val;
      setStyleOfElement(tempStyleCtx);
    }

  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "faq_que_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("faq_que_setting")}>
        Question Settings
      </div>
      <div style={{ display:`${selectedSetting === "faq_que_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>

        <div className={`${styles.mainContainer} inner_setting`}>
          <QueAnsStyleSelectorSettings mClsName={queClsName} retHandle={(val:any)=>setQuestionClasses(val)} />
        </div>

        {
          (fieldSelctData?.length && fieldSelctData.length-1) ?
          (
            <Fragment>
              <div className={`${styles.mainContainer} inner_setting`}>
                <Select selRef={qfieldRef} format={OutlinedFormat} label="Question Field" items={fieldSelctData} onChange={(e:any)=>handleFieldName(parseInt(e.target.value))} />
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
          <Select selRef={queAlnRef} format={OutlinedFormat} label="Text Align" items={TextAlignItems} onChange={(e:any)=>handleTextAlign(e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} label="Font Size" min={8} max={200} step={1} defaultValue={fontSizeVal} onChange={(e:any)=>setFontSize(e)} />
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

export default FaqQuestionSetting;
