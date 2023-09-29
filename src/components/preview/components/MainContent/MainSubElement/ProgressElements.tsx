import type { NextPage } from 'next'
import { Fragment } from 'react'
import ProgressBar from '../../../components/Atoms/ElementsAtoms/ProgressBar';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const ProgressElements: NextPage<Prop> = ({type, props, refBtn}:Prop) => {
  return <ProgressBar refInner={refBtn} {...props} />
}

export default ProgressElements;
