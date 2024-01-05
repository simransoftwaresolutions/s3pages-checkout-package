import { Fragment, useState, useEffect } from 'react'
import styles from "../../../../../styles/editorui/MainSubElement.module.css";
import DefaultImage from '../../../atoms/DefaultImage';
import { generateClassNameStr, generateChildClassNameStr, generateMenuClassNameStr } from "../../../../../utils/functions";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
}

const faqAtom = (que:string, ans:string, index:number, rowClsName:string, showAns:number, setShowAns:any, queCls:any, ansCls:any) => {

  return (
    <div className={`${rowClsName} ${styles.queMainBox} faqBox`} key={index}>
      <div className={`${styles.faqPaddingMargin} question ${queCls}`}>
        <div className={`${styles.queInner} ${styles.faqText}`}>
          <div>{que ? que : "No Data"}</div>
          <div onClick={()=>setShowAns(index === showAns ? -1 : index)}>
            <span className={`${styles.faqArrow} faqarw`}>
              {
                showAns === index ?
                <KeyboardArrowDownIcon fontSize='medium'/>:
                <KeyboardArrowUpIcon fontSize='medium'/>
              }
            </span>
          </div>
        </div>
      </div>
      <div className={`${styles.faqPaddingMargin} ${ansCls} ${styles.faqText} ${styles.ansBox} answer faqAns ${showAns === index ? "": "hidden"}`}>
        <span className={styles.faqSpan}>
          {ans ? ans  : "No Data"}
        </span>
      </div>
    </div>
  )
}

const FaqUI = ({type, props, refBtn}:Prop) => {

  const styleSelectorName = generateClassNameStr(props?.styleClasses);
  const queCls = generateMenuClassNameStr(props?.queClassName);
  const ansCls = generateMenuClassNameStr(props?.ansClassName);
  const rowClsName = generateChildClassNameStr(props?.styleClasses, 0);
  const [ faqDatas, setFaqDatas ] = useState<any>([]);
  const [ showAns, setShowAns ] = useState<number>(0);

  const arrangeFaq = () => {

    const dt = props?.faqData;
    const _faqDatas = [];

    if(!dt?.question?.length || !dt?.answer?.length) return;
    for(let i=0; i<dt?.question?.length; i++){
      let _qAns = {
        question:dt?.question[i],
        answer:dt?.answer[i],
      }
      _faqDatas.push(_qAns);
    }

    setFaqDatas(_faqDatas);

  }

  useEffect(()=>{
    arrangeFaq();
  }, [props?.faqData?.question, props?.faqData?.answer])

  return <Fragment>
    <div className={`${styleSelectorName}`}>
      {
        faqDatas.length ? 
        faqDatas?.map((fData:any, fIdx:number) => {
          return faqAtom(fData?.question, fData?.answer, fIdx, rowClsName, showAns, setShowAns, queCls, ansCls);
        })
        :<div className={`${styles.noFaq} faq-placeholder`}><DefaultImage /></div>
      }
    </div>
  </Fragment>
}

export default FaqUI;
