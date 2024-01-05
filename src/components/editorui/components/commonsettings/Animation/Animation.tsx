import { Fragment, useEffect } from 'react';
import styles from '../../../../../styles/editorui/Animation.module.css';
import { Select, Text } from '../../../atoms/Input';
import { useState, useRef } from 'react';
import { AnimationStyleItems } from '../../../datas/commonComponentData';
import { useSettingsCtx } from "../../../../../context/editorui/SettingsContext";
import { useContentCtx } from "../../../../../context/editorui/ContentsContext";
import { usePagesCtx } from '../../../../../context/editorui/PagesContext';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const Animation = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const [openBorder, setOpenBorder] = useState(false);

  const [animationDelay, setAnimationDelay] = useState('');
  const [animationDuration, setAnimationDuration] = useState('');
  const [animationIteration, setAnimationIteration] = useState('');
  const { activeDevice } = usePagesCtx();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const animationRef = useRef<any>(null);
  
  useEffect(() => {

    let tempStyleCtx  = getStyleOfElement();

    const style = tempStyleCtx?.style?.animationStyle;
    if(style && animationRef && animationRef?.current) animationRef.current.value = style;

    const delay = tempStyleCtx?.style?.animationDelay;
    if(delay) setAnimationDelay(delay);

    const duration = tempStyleCtx?.style?.animationDuration;
    if(duration) setAnimationDuration(duration);

    const iteration = tempStyleCtx?.style?.animationIteration;
    if(iteration) setAnimationIteration(iteration);

  }, [changeStyleOfElement, activeDevice]);

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const setAnimationText = (position:string, e: React.ChangeEvent<HTMLInputElement>) => {
    let tempStyleCtx = getStyleOfElement();
    switch(position){
      case "style":
        tempStyleCtx.style.animationStyle = e.target.value;
        break;
      case "delay":
        tempStyleCtx.style.animationDelay = e.target.value;
        setAnimationDelay(e.target.value);
        break;
      case "duration":
        tempStyleCtx.style.animationDuration = e.target.value;
        setAnimationDuration(e.target.value);
        break;
      case "iteration":
        tempStyleCtx.style.animationIteration = e.target.value;
        setAnimationIteration(e.target.value);
        break;
      default:
        break;
    }
    setStyleOfElement(tempStyleCtx);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} sub-set-title-bg ${selectedSetting === "animation_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("animation_setting")}>
        Animation Settings
      </div>
      <div style={{ display:`${selectedSetting === "animation_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        <div className={`${styles.mainContainer} inner_setting`}>
          <Select selRef={animationRef} format={OutlinedFormat} id="animation_style" label="Style" items={AnimationStyleItems} onChange={(e:any)=>setAnimationText("style",e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text format={OutlinedFormat} id="anim_delay" label="Delay" defaultValue={animationDelay} type="text" onChange={(e:any)=>setAnimationText("delay",e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text format={OutlinedFormat} id="anim_duration" label="Duration" defaultValue={animationDuration} type="text" onChange={(e:any)=>setAnimationText("duration",e)} />
        </div>

        <div className={`${styles.mainContainer} inner_setting`}>
          <Text format={OutlinedFormat} id="anim_iteration" label="Iteration" defaultValue={animationIteration} type="text" onChange={(e:any)=>setAnimationText("iteration",e)} />
        </div>
      </div>
    </Fragment>
  );

}

export default Animation;
