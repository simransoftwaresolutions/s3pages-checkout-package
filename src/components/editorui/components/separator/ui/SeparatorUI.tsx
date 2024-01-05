import { Fragment } from 'react'
import SeparatorAtom from './SeparatorAtom';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const SeparatorUI = ({type, props, refBtn}:Prop) => {
  return <SeparatorAtom refInner={refBtn} {...props} />
}

export default SeparatorUI;
