import type { NextPage } from 'next'
import { Fragment } from 'react'
import SeparatorAtom from '../../../components/Atoms/ElementsAtoms/SeparatorAtom';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const SeparatorElements: NextPage<Prop> = ({type, props, refBtn}:Prop) => {
  return <SeparatorAtom refInner={refBtn} {...props} />
}

export default SeparatorElements;
