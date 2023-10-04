// import type { NextPage } from 'next';
import { Fragment } from 'react';
import { generateClassNameStr } from "../../../../../utils/functions";

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const HtmlElements = ({type, props, refBtn}:Prop) => {

  const styleSelectorName = generateClassNameStr(props?.styleClasses);
  return (
    <div ref={refBtn} className={`${styleSelectorName}`}>
      <div dangerouslySetInnerHTML={{ __html: props?.text }} />
    </div>
  )
}

export default HtmlElements;
