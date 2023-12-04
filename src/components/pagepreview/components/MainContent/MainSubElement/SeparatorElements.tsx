import { Fragment } from 'react'
import SeparatorAtom from '../../../components/Atoms/ElementsAtoms/SeparatorAtom';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const SeparatorElements = ({type, props, refBtn}:Prop) => {
  return <SeparatorAtom refInner={refBtn} {...props} />
}

export default SeparatorElements;
