import { Fragment } from 'react';
import styles from './RowMargin.module.css';
import { Range } from '../../Atoms/Input';
import { useState, useEffect } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { deepCloneStyle, deepCloneSection, setClassesName } from '../../../../../utils/functions';
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const RowMargin = () => {

  const [openMargin, setOpenMargin] = useState(false);

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { getStylesFromCtx, setStylesToCtx } = useSettingsCtx();
  const { commonStyleSelector, statesName } = usePagesCtx();

  const [marginVal, setMarginVal] = useState<number>(0);
  const [marginTopVal, setMarginTopVal] = useState<number>(0);
  const [marginRightVal, setMarginRightVal] = useState<number>(0);
  const [marginBottomVal, setMarginBottomVal] = useState<number>(0);
  const [marginLeftVal, setMarginLeftVal] = useState<number>(0);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const strToPX = (str:string) => {
    const _str = str.replace("px", "");
    return parseInt(_str);
  }  

  useEffect(() => {

    const margin = getStylesFromCtx("margin", 0);
    if(margin){
      const marginData = margin.split(" ");
      
      if(marginData[0] === marginData[1] && marginData[0] === marginData[2] && marginData[0] === marginData[3]){
        setMarginVal(strToPX(marginData[0]));
        setOpenMargin(false);
      }else{
        setMarginVal(0);
        setOpenMargin(true);
      }
      setMarginTopVal(strToPX(marginData[0]));
      setMarginRightVal(strToPX(marginData[1]));
      setMarginBottomVal(strToPX(marginData[2]));
      setMarginLeftVal(strToPX(marginData[3]));
    }else{
      setMarginVal(0);
      setMarginTopVal(0);
      setMarginRightVal(0);
      setMarginBottomVal(0);
      setMarginLeftVal(0);
    }

  },[changeStyleOfElement, commonStyleSelector, statesName]);

  const displayMargin = () => {
    setOpenMargin(!openMargin);
  }

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const setMargin = (position:string, e: React.ChangeEvent<HTMLInputElement>) => {

    let tempStyleCtx = getStyleOfElement();

    let marginData:any = [];
    const margin = getStylesFromCtx("margin", 0);

    if(margin){
      marginData = margin.split(" ");
    }else{
      marginData[0] = "0px";
      marginData[1] = "0px";
      marginData[2] = "0px";
      marginData[3] = "0px";
    }

    switch(position){
      case "Margin":
        
        const marginStr = parseInt(e.target.value) + 'px ' + parseInt(e.target.value) + 'px ' + parseInt(e.target.value) + 'px ' + parseInt(e.target.value) + 'px';

        setMarginVal(parseInt(e.target.value));
        setMarginTopVal(parseInt(e.target.value));
        setMarginRightVal(parseInt(e.target.value));
        setMarginBottomVal(parseInt(e.target.value));
        setMarginLeftVal(parseInt(e.target.value));

        const ret = setStylesToCtx(["margin"], [marginStr], 0);
        tempStyleCtx = setClassesName(ret, tempStyleCtx, 0);
        setStyleOfElement(tempStyleCtx);

        break;
      case "top":

        const topMarginStr = parseInt(e.target.value) + 'px ' + marginData[1] + ' ' + marginData[2] + ' ' + marginData[3];
        setMarginTopVal(parseInt(e.target.value));

        const retTop = setStylesToCtx(["margin"], [topMarginStr], 0);
        tempStyleCtx = setClassesName(retTop, tempStyleCtx, 0);
        setStyleOfElement(tempStyleCtx);
        break;
      case "right":
        
        const rightMarginStr = marginData[0] + ' ' + parseInt(e.target.value) + 'px ' + marginData[2] + ' ' + marginData[3];
        setMarginRightVal(parseInt(e.target.value));

        const retRight = setStylesToCtx(["margin"], [rightMarginStr], 0);
        tempStyleCtx = setClassesName(retRight, tempStyleCtx, 0);
        setStyleOfElement(tempStyleCtx);
        break;
      case "bottom":
                
        const bottomMarginStr = marginData[0] + ' ' + marginData[1] + ' ' + parseInt(e.target.value) + 'px ' + marginData[3];
        setMarginBottomVal(parseInt(e.target.value));

        const retBottom = setStylesToCtx(["margin"], [bottomMarginStr], 0);
        tempStyleCtx = setClassesName(retBottom, tempStyleCtx, 0);
        setStyleOfElement(tempStyleCtx);
        break;
      case "left":
                      
        const leftMarginStr = marginData[0] + ' ' + marginData[1] + ' ' + marginData[2] + ' ' + parseInt(e.target.value) + 'px';
        setMarginLeftVal(parseInt(e.target.value));

        const retLeft = setStylesToCtx(["margin"], [leftMarginStr], 0);
        tempStyleCtx = setClassesName(retLeft, tempStyleCtx, 0);
        setStyleOfElement(tempStyleCtx);
        break;
      default:
        break;
    }
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "row_margin_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("row_margin_setting")}>
        Margin Settings
      </div>
      <div style={{ display:`${selectedSetting === "row_margin_setting" ? "block" : "none"}`, backgroundColor:"#0e0e0e" }}>
        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Range displayValue={true} format={OutlinedFormat} id="margin" label="Margin" min={-100} max={400} step={1} defaultValue={marginVal} onChange={(e:any)=>setMargin('Margin', e)} />
          <div className={`${styles.advSet}`} onClick={displayMargin}>Advanced Settings</div>
          <div  style={{ display:`${openMargin === true ? "block" : "none"}` }} className={`${styles.stMrgPdg}`}>
            <Range displayValue={true} format={OutlinedFormat} id="margin_top" label="Top" min={-100} max={400} step={1} defaultValue={marginTopVal} onChange={(e:any)=>setMargin('top', e)} />
            <Range displayValue={true} format={OutlinedFormat} id="margin_right" label="Right" min={-100} max={400} step={1} defaultValue={marginRightVal} onChange={(e:any)=>setMargin('right', e)} />
            <Range displayValue={true} format={OutlinedFormat} id="margin_bottom" label="Bottom" min={-100} max={400} step={1} defaultValue={marginBottomVal} onChange={(e:any)=>setMargin('bottom', e)} />
            <Range displayValue={true} format={OutlinedFormat} id="margin_left" label="Left" min={-100} max={400} step={1} defaultValue={marginLeftVal} onChange={(e:any)=>setMargin('left', e)} />
          </div>
        </div>
      </div>

    </Fragment>
  );

}

export default RowMargin;
