import type { NextPage } from 'next'
import { Fragment } from 'react'
import styles from './MainSubElement.module.css';
import ButtonsIcons from '../../../components/Atoms/ButtonsIcons';
import { generateClassNameStr, generateChildClassNameStr } from "../../../../../utils/functions";

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const ImageElements: NextPage<Prop> = ({type, refBtn, props}:Prop) => {

  const styleSelectorName = generateClassNameStr(props?.styleClasses);
  
  return (
    <div ref={refBtn}>
      {
        props?.iType === 'Image' && (
          <>
            {
              props?.link ?
              (<a target="_blank" href={props?.link ? props?.link : "#"}><img className={`${styleSelectorName} ${styles?.imageResponsive}`} src={props?.imageUrl} /></a>)
              :(<a target="_blank"><img className={`${styleSelectorName} ${styles?.imageResponsive}`} src={props?.imageUrl} /></a>)
            }
          </>
        )
      }
      {
        props?.iType === 'Icon' && (
          props?.iconUrl ?
          <a target="_blank" href={props?.iconUrl}><ButtonsIcons clsStr={`${styleSelectorName}`} name={props?.iconName ? props?.iconName : 'Adjust'} /></a>
          :<a><ButtonsIcons clsStr={`${styleSelectorName}`} name={props?.iconName ? props?.iconName : 'Adjust'} /></a>
        )
      }
    </div>
  )
}

export default ImageElements;
