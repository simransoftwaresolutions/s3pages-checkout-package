// import type { NextPage } from 'next'
import { Fragment } from 'react'
import styles from '../../../../../styles/pagepreview/MainSubElement.module.css';
import ButtonsIcons from '../../../components/Atoms/ButtonsIcons';
import { generateClassNameStr, generateChildClassNameStr, getSeoUrlFromPageId } from "../../../../../utils/functions";

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const ImageElements = ({type, refBtn, props}:Prop) => {

  const styleSelectorName = generateClassNameStr(props?.styleClasses);
  
  return (
    <div ref={refBtn}>
      {
        props?.iType === 'Image' && (
          <>
            {
              props?.link ?
              (<a 
                target={ props?.urlType === "internal" ? "_self" : "_blank" } 
                href={props?.urlType === "internal" ? getSeoUrlFromPageId(props?.link) : props?.link}
              >
                <img className={`${styleSelectorName} ${styles?.imageResponsive}`} src={props?.imageUrl} />
              </a>)
              :
              (<a target="_blank"><img className={`${styleSelectorName} ${styles?.imageResponsive}`} src={props?.imageUrl} /></a>)
            }
          </>
        )
      }
      {
        props?.iType === 'Icon' && (
          props?.iconUrl ?
          <a 
            target={ props?.urlType === "internal" ? "_self" : "_blank" }
            href={props?.urlType === "internal" ? getSeoUrlFromPageId(props?.iconUrl) : props?.iconUrl}
          >
            <ButtonsIcons clsStr={`${styleSelectorName}`} name={props?.iconName ? props?.iconName : 'Adjust'} />
          </a>
          :<a><ButtonsIcons clsStr={`${styleSelectorName}`} name={props?.iconName ? props?.iconName : 'Adjust'} /></a>
        )
      }
    </div>
  )
}

export default ImageElements;
