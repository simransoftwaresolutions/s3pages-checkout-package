import { Fragment } from 'react'
import SliderComponent from "../../../../../components/slidercomponent";
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import ButtonsIcons from '../../../components/Atoms/ButtonsIcons';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const SliderElement = ({type, refBtn, props}:Prop) => {
  return <SliderComponent refInner={refBtn} {...props}/>
}

export default SliderElement;