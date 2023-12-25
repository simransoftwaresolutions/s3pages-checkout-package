import { Fragment } from 'react'
import Button from '../../../components/Atoms/ElementsAtoms/Button';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import ButtonsIcons from '../../../components/Atoms/ButtonsIcons';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const ButtonElements = ({type, refBtn, props}:Prop) => {
  return <Button refInner={refBtn} {...props}/>
}

export default ButtonElements;
