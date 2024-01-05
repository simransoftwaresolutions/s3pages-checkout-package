import Button from './Button';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
}

const ButtonUI = ({type, refBtn, props}:Prop) => {
  return <Button refInner={refBtn} {...props}/>
}

export default ButtonUI;
