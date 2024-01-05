import ProgressBar from './ProgressBar';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
}

const ProgressUI = ({type, props, refBtn}:Prop) => {
  return <ProgressBar refInner={refBtn} {...props} />
}

export default ProgressUI;
