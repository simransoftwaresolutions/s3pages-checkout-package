import SocialIconAtom from './SocialIconAtom';
import RatingAtom from './RatingAtom';
import { generateClassNameStr, generateChildClassNameStr } from "../../../../../utils/functions";
import styles from '../../../../../styles/editorui/MainSubElement.module.css';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
}

const SocialIconUI = ({type, refBtn, props}:Prop) => {

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
                  return <SocialIconAtom iIndex={iIndex} icons={icons} key={`icon${iIndex}`} style={props.style} styleClasses={props?.styleClasses} />
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

export default SocialIconUI;
