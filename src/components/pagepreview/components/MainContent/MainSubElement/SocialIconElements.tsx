// import type { NextPage } from 'next'
import { Fragment } from 'react'
import SocialIcon from '../../../components/Atoms/ElementsAtoms/SocialIcon';
import RatingAtom from '../../../components/Atoms/ElementsAtoms/RatingAtom';
import { generateClassNameStr, generateChildClassNameStr } from "../../../../../utils/functions";
import styles from './MainSubElement.module.css';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const SocialIconElements = ({type, refBtn, props}:Prop) => {

  const styleSelectorName = generateClassNameStr(props?.styleClasses);

  return (
    <>
      {
        props?.sType === "SocialIcon" &&
        (
          <div className={`socialIconAlign ${styleSelectorName}`} ref={refBtn}>
            <div className={`${styles.socialIconCnt}`}>
              {
                props?.icons?.map((icons:any, iIndex:any) => {
                  return <SocialIcon icons={icons} key={`icon${iIndex}`} style={props.style} styleClasses={props?.styleClasses} />
                })
              }
            </div>
          </div>
        )
      }
      {
        props?.sType === "Rating" &&
        (
          <div className={`${styleSelectorName}`} ref={refBtn}>
            <RatingAtom {...props}/>            
          </div>
        )
      }
    </>

  )
}

export default SocialIconElements;
