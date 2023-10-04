// import type { NextPage } from 'next'
import { Fragment, useState, useEffect } from 'react'
import styles from "./MainSubElement.module.css";
import DefaultImage from '../../../components/Atoms/DefaultImage';
import { generateClassNameStr, generateChildClassNameStr } from "../../../../../utils/functions";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const faqAtom = (que:string, ans:string, index:number, rowClsName:string, showAns:number, setShowAns:any) => {

  return (
    <div className={`${rowClsName} ${styles.queMainBox} faqBox`} key={index}>
      <div className={`question`}>
        <div className={`${styles.queInner} ${styles.faqText}`}>
          <div>{que}</div>
          <div onClick={()=>setShowAns(index === showAns ? -1 : index)}>
            <span className={`${styles.faqArrow}`}>
              {
                showAns === index ?
                <KeyboardArrowDownIcon fontSize='medium'/>:
                <KeyboardArrowUpIcon fontSize='medium'/>
              }
            </span>
          </div>
        </div>
      </div>
      <div style={{margin:"0", padding:"0"}} className={`${styles.faqText} ${styles.ansBox} answer faqAns ${showAns === index ? "": "hidden"}`}>
        <span className={styles.faqSpan}>
          {ans}
        </span>
      </div>
    </div>
  )
}

const FaqElements = ({type, props, refBtn}:Prop) => {

  const styleSelectorName = generateClassNameStr(props?.styleClasses);
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
          return (
            fData?.question && fData?.answer ? (
              faqAtom(fData?.question, fData?.answer, fIdx, rowClsName, showAns, setShowAns)
            ):(
              <Fragment key={fIdx}></Fragment>
            )
          )
        })
        :<div className={`${styles.noFaq} faq-placeholder`}><DefaultImage /></div>
      }
    </div>
  </Fragment>
}

export default FaqElements;
