import type { NextPage } from 'next'
import { Fragment } from 'react'
import styles from './MainSubElement.module.css';
import { generateClassNameStr, generateChildClassNameStr } from "../../../../../utils/functions";

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const VideoElements: NextPage<Prop> = ({type, refBtn, props}:Prop) => {

  const styleSelectorName = generateClassNameStr(props?.styleClasses);
  return (
    <div className={`${styleSelectorName}`} ref={refBtn}>
      <div dangerouslySetInnerHTML={{ __html: props?.embedCode }} />
    </div>
  )
}

export default VideoElements;
