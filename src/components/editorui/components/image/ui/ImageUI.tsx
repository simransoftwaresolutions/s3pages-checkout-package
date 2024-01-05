import styles from '../../../../../styles/editorui/MainSubElement.module.css';
import ButtonsIcons from '../../../atoms/ButtonsIcons';
import { generateClassNameStr, getSeoUrlFromPageId } from "../../../../../utils/functions";

interface Prop {
  type:string;
  props:any;
  refBtn:any;
}

const ImageUI = ({type, refBtn, props}:Prop) => {

  const styleSelectorName = generateClassNameStr(props?.styleClasses);
  
  return (
    <div ref={refBtn}>
      {
        props?.iType === 'Image' && (
          <>
            {
              props?.link ?
              (<a 
                // target={ props?.urlType === "internal" ? "_self" : "_blank" } 
                href={props?.urlType === "internal" ? getSeoUrlFromPageId(props?.link) : props?.link}
              >
                <img className={`${styleSelectorName} ${styles?.imageResponsive}`} src={props?.imageUrl} />
              </a>)
              :
              (<a target="_blank">
                <img className={`${styleSelectorName} ${styles?.imageResponsive}`} src={props?.imageUrl} />
              </a>)
            }
          </>
        )
      }
      {
        props?.iType === 'Icon' && (
          props?.iconUrl ?
          <a 
            // target={ props?.urlType === "internal" ? "_self" : "_blank" }
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

export default ImageUI;
