import { generateClassNameStr } from "../../../../../utils/functions";

interface Prop {
  type:string;
  props:any;
  refBtn:any;
}

const VideoUI = ({type, refBtn, props}:Prop) => {

  const styleSelectorName = generateClassNameStr(props?.styleClasses);
  return (
    <div className={`${styleSelectorName}`} ref={refBtn}>
      <div dangerouslySetInnerHTML={{ __html: props?.embedCode }} />
    </div>
  )
}

export default VideoUI;
