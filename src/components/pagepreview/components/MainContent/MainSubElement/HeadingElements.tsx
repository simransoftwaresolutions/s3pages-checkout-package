// import type { NextPage } from 'next'
import { Fragment } from 'react'
import Heading from '../../../components/Atoms/ElementsAtoms/Heading';
import { InlineEditor } from './InlineEditor';
import { useState, useEffect, useRef } from "react";
import { deepCloneArray, generateClassNameStr } from '../../../../../utils/functions';
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import ENV from '../../../../../utils/env';
import styles from '../../../../../styles/pagepreview/MainContent.module.css';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";

interface Prop {
  type:string;
  headEleIdx:string;
  props:any;
  refBtn:any;
  gridIdxs:any;
  curEleSIndex:number;
  isMytemplate?:boolean;
  // onClick:()=>void;
}

const HeadingElements = ({type, headEleIdx, props, refBtn, gridIdxs, curEleSIndex, isMytemplate}:Prop) => {

  const [ text, setText ] = useState<any>();
  const [ showEditor, setShowEditor ] = useState(false);
  const [ innerProps, setInnerProps ] = useState<any>(props);
  const { sectionCtx, setSectionCtx } = useContentCtx();

  const styleSelectorName = generateClassNameStr(props?.styleClasses);

  const refs = useRef();

  useEffect(() => {
    const tempProps = deepCloneArray(props);
    setText(tempProps.text);
    setInnerProps(tempProps);

    document.addEventListener('click', (e:any) => {
      let container = document.getElementById(`editor-container${headEleIdx}`);
      let outContainer = document.getElementById(`editor-out-container${headEleIdx}`);
      if (container && !container.contains(e.target) && outContainer && !outContainer.contains(e.target)) {
          setShowEditor(false);
      }
    });
  },[]);

  useEffect(() => {
    if(JSON.stringify(props) === JSON.stringify(innerProps)) return;
    const tempProps = deepCloneArray(props);
    setText(tempProps.text);
    setInnerProps(tempProps);

  });

  const changeTextFunc = (updatedText:any) => {
    const _eleIdx = gridIdxs[gridIdxs.length-1];
    const _styleSectionsCtx = deepCloneArray(sectionCtx);
    const _styleArrLength = gridIdxs?.length-1;
    let styleTemp = [];
    let _styleTemp = _styleSectionsCtx[curEleSIndex];
    styleTemp.push(_styleTemp);
    for(let i=0; i<_styleArrLength; i++){ // loop for pointing Element
      styleTemp[i+1] = styleTemp[i].elements[gridIdxs[i]];
    }
    styleTemp[styleTemp.length-1].elements[_eleIdx].eleInfo.props.text = updatedText;
    setSectionCtx(_styleSectionsCtx);
  }

  const handleChange = (e:any) => {

    let _text = e.target.innerHTML;
    const pTagIndex = _text.indexOf("<p>");
    if(pTagIndex === 0) _text = _text?.replace("<p>","");
    let textDat = _text?.replaceAll("<p>","<br>")?.replaceAll("</p>","");
    setText(textDat);
    changeTextFunc(textDat);

    // setText(e.target.innerHTML);
    // changeTextFunc(e.target.innerHTML);
  }

  const generateStyle = () => {

    const styleProps = {...props};

    const borderData = styleProps?.style?.border?.split(" ");

    let borderWidth = '';
    let borderColor = '';
    let borderStyle = '';

    if(borderData !== undefined){
        borderWidth = borderData[0] + ' ' + borderData[1] + ' ' + borderData[2] + ' ' + borderData[3];
        borderStyle = borderData[4];
        borderColor = borderData[5];
    }

    const styleInfo = {
      borderWidth:"0px",
      display:(showEditor?"block":"none"),
      overflowWrap: "break-word",
    };

    return styleInfo;
  
  }

  const editorBlock = () => {

    return <InlineEditor 
              className={`${styleSelectorName}`}
              style={generateStyle()} 
              text={text?.replaceAll("<p>","")?.replaceAll("</p>","")} 
              onBlur={handleChange} 
              id={`editor-container${headEleIdx}`} 
            />;
  }

  const viewEditor = () => {
    switch(props.headingType){
      case "h1":
        return <h1 className={`${styles.headingBottom}`}>{editorBlock()}</h1>;
        break;
      case "h2":
        return <h2 className={`${styles.headingBottom}`}>{editorBlock()}</h2>;
        break;
      case "h3":
        return <h3 className={`${styles.headingBottom}`}>{editorBlock()}</h3>;
        break;
      case "h4":
        return <h4 className={`${styles.headingBottom}`}>{editorBlock()}</h4>;
        break;
      case "h5":
        return <h5 className={`${styles.headingBottom}`}>{editorBlock()}</h5>;
        break;
      case "h6":
        return <h6 className={`${styles.headingBottom}`}>{editorBlock()}</h6>;
        break;
      case "paragraph":
        return <p className={`${styles.headingBottom}`}><InlineEditor className={`${styleSelectorName}`} style={{...generateStyle(), minHeight:"0px"}} text={text?.replaceAll("<p>","")?.replaceAll("</p>","")} onBlur={handleChange} id={`editor-container${headEleIdx}`} /></p>;
        break;
      default:
          return <></>;
        break;  
    }

  }

  return (
    <Fragment>
      {
        ENV.isViewReadOnly === true || isMytemplate ?
        (
          <span style={{color:"#000"}}><Heading refInner={refBtn} {...innerProps} /></span>          
        ):
        (
          <Fragment>
            {
              <span style={{color:"#000"}}>{viewEditor()}</span>
            }
            {
              <span id={`editor-out-container${headEleIdx}`} style={{ color:"#000", display:(showEditor?"none":"block") }} onClick={() => setShowEditor(true)} ><Heading refInner={refBtn} {...innerProps} /></span>
            }
          </Fragment>
        )
      }
    </Fragment>
      
  )
}

export default HeadingElements;
