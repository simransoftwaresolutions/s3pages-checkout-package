import React, { Fragment } from 'react';
import styles from '../../../../../styles/componentsettings/OverlaySectionSettings.module.css';
import { Select, Text, Range } from '../../Atoms/Input';
import { useState, useEffect, useRef } from 'react';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import { deepCloneArray } from "../../../../../utils/functions";
import DefaultImage from "../../Atoms/DefaultImage";
import ColorPickerBox from '../../Atoms/ColorPickerBox';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const ovShowOn:any = [
  {
    key:"",
    label:"Select Intent show Time"
  },  
  {
    key:"start_intent",
    label:"Start"
  },  
  {
    key:"exit_intent",
    label:"Exit Intent"
  },  
];

const ovPostionType:any = [
  {
    key:"bar",
    label:"Bar"
  },
  {
    key:"popup",
    label:"Dialog Box"
  },    
  // {
  //   key:"full-screen",
  //   label:"Full Screen"
  // }  
];

const ovPostionBar:any = [
  {
    key:"",
    label:"Select Position"
  },
  {
    key:"top",
    label:"Top"
  },
  {
    key:"bottom",
    label:"Bottom"
  }
];

const ovPostionPop:any = [
  {
    key:"",
    label:"Select Position"
  },
  {
    key:"top-left",
    label:"Top Left"
  },
  {
    key:"top-right",
    label:"Top Right"
  },
  {
    key:"bottom-left",
    label:"Bottom Left"
  },
  {
    key:"bottom-right",
    label:"Bottom Right"
  },
  {
    key:"center",
    label:"Center"
  }
];

const OverlaySectionSettings = () => {

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const { getStyleOfElement, setStyleOfElement } = useSettingsCtx();
  const { statesName, activeDevice } = usePagesCtx();
  const { sectionCtx, setSectionCtx, myOverlayNameCtx } = useContentCtx();
  const [ xIconColor, setXIconColor ] = useState<any>("ffffffff");
  const [ ovPostion, setOvPostion ] = useState<any[]>(ovPostionBar);
  const [ ovMinWidth, setOvMinWidth ] = useState<string>("");
  const [ ovMinHeight, setOvMinHeight ] = useState<string>("");
  const [ isPopupOpen, setIsPopupOpen ] = useState<boolean>(true);
  const [ initPos, setInitPos ] = useState<string>("top");

  const ovPosRef = useRef<any>(null);
  const ovShowOnRef = useRef<any>(null);
  const ovPosTypeRef = useRef<any>(null);

  const { changeStyleOfElement } = useContentCtx();
  const [ ovShowDelay, setOvShowDelay ] = useState<number>(0);
  
  useEffect(()=>{
    const _temp = deepCloneArray(sectionCtx);
    setIsPopupOpen(true);

    const _ovPosType = _temp[changeStyleOfElement.sectionIdx]?.eleInfo?.ovPositionType; 
    if(ovPosTypeRef?.current) ovPosTypeRef.current.value = _ovPosType || "bar";

    const _ovShowOn = _temp[changeStyleOfElement.sectionIdx]?.eleInfo?.ovShowOn; 
    if(ovShowOnRef?.current) ovShowOnRef.current.value = _ovShowOn || "";

    const _ovPos = _temp[changeStyleOfElement.sectionIdx]?.eleInfo?.ovPosition; // for container or container-fluid
    setInitPos(_ovPos || "");

    const _ovMinWidth = _temp[changeStyleOfElement.sectionIdx]?.eleInfo?.ovMinWidth; 
    setOvMinWidth(_ovMinWidth || "");

    const _ovMinHeight = _temp[changeStyleOfElement.sectionIdx]?.eleInfo?.ovMinHeight; 
    setOvMinHeight(_ovMinHeight || "");

    const _ovShowDelay = _temp[changeStyleOfElement.sectionIdx]?.eleInfo?.ovShowDelay; 
    setOvShowDelay(_ovShowDelay || 0);

    const _xIconColor = _temp[changeStyleOfElement.sectionIdx]?.eleInfo?.ovXIconColor; 
    setXIconColor(_xIconColor || "#fff");
  }, [changeStyleOfElement]);

  useEffect(()=>{

    const setPosition = () => {
      switch(ovPosTypeRef?.current?.value){
        case "bar":
          setOvPostion(ovPostionBar);
          setTimeout(()=>{
            if(ovPosRef?.current && !isPopupOpen) ovPosRef.current.value = "";
            if(ovPosRef?.current && isPopupOpen) ovPosRef.current.value = initPos;
          },200);
          break;
        case "popup":
          setOvPostion(ovPostionPop);
          setTimeout(()=>{
            if(ovPosRef?.current && !isPopupOpen) ovPosRef.current.value = "";
            if(ovPosRef?.current && isPopupOpen) ovPosRef.current.value = initPos;
          },200);
          break;
        case "full-screen":
          setOvPostion([]);
          break;
        default:
          setOvPostion(ovPostionBar);
          setTimeout(()=>{
            if(ovPosRef?.current && !isPopupOpen) ovPosRef.current.value = "";
            if(ovPosRef?.current && isPopupOpen) ovPosRef.current.value = initPos;
          },200);
          break;
      }
    }

    setPosition();
  }, [ovPosTypeRef?.current?.value]);

  const handleOverlay = (id:any) => {
    const _temp = deepCloneArray(sectionCtx);
    if(changeStyleOfElement.sectionIdx !== undefined){
      _temp[changeStyleOfElement.sectionIdx].eleInfo.myOverlayId = id;
    }
    setSectionCtx(_temp);
  }

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  const handleOvPosition = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const _temp = deepCloneArray(sectionCtx);
    if(changeStyleOfElement.sectionIdx !== undefined){
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPosition = e.target.value;
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPositionType = ovPosTypeRef?.current?.value || "bar";
    }
    setSectionCtx(_temp);
  }

  const handleOvShowOn = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const _temp = deepCloneArray(sectionCtx);
    if(changeStyleOfElement.sectionIdx !== undefined){
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovShowOn = e.target.value;
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPositionType = ovPosTypeRef?.current?.value || "bar";
      // _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPosition = ovPosTypeRef?.current?.value === "full-screen" ? "full-screen" : (ovPosRef?.current?.value || "top");
    }
    setSectionCtx(_temp);
  }

  const handleMinWidth = (e:any) => {

    if(isNaN(e.target.value)) return;

    const _temp = deepCloneArray(sectionCtx);
    if(changeStyleOfElement.sectionIdx !== undefined){
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovMinWidth = e.target.value;
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPositionType = "popup";
      // _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPosition = (ovPosRef?.current?.value || "top");
    }
    setSectionCtx(_temp);
  }

  const handleMinHeight = (e:any) => {

    if(isNaN(e.target.value)) return;

    const _temp = deepCloneArray(sectionCtx);
    if(changeStyleOfElement.sectionIdx !== undefined){
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovMinHeight = e.target.value;
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPositionType = "popup";
      // _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPosition = (ovPosRef?.current?.value || "top");
    }
    setSectionCtx(_temp);
  }

  const handleDelay = (e:any) => {

    if (isNaN(e.target.value)) return;

    let val = parseInt(e.target.value);
    const _temp = deepCloneArray(sectionCtx);
    if(changeStyleOfElement.sectionIdx !== undefined){
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovShowDelay = val;
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPositionType = ovPosTypeRef?.current?.value || "bar";
      // _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPosition = ovPosTypeRef?.current?.value === "full-screen" ? "full-screen" : (ovPosRef?.current?.value || "top");
    }
    setSectionCtx(_temp);
    setOvShowDelay(val);
  }

  const handleXIconChange = (color:any) => {

    const _temp = deepCloneArray(sectionCtx);
    if(changeStyleOfElement.sectionIdx !== undefined){
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovXIconColor = color;
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPositionType = ovPosTypeRef?.current?.value || "bar";
      // _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPosition = ovPosTypeRef?.current?.value === "full-screen" ? "full-screen" : (ovPosRef?.current?.value || "top");
    }

    setSectionCtx(_temp);
    setXIconColor(color);
  }

  const handleOvPositionType = (e:any) => {

    setIsPopupOpen(false); 
    const _temp = deepCloneArray(sectionCtx);
    if(changeStyleOfElement.sectionIdx !== undefined){
      _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPositionType = e.target.value;
      // _temp[changeStyleOfElement.sectionIdx].eleInfo.ovPosition = e.target.value === "full-screen" ? "full-screen" : "";
    }

    setSectionCtx(_temp);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} active_subsetting`}>
        Overlay Settings
      </div>
      <div style={{ display:`block`, backgroundColor:"#0e0e0e" }}>

      <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Select selRef={ovPosTypeRef} format={OutlinedFormat} label="Type" items={ovPostionType} onChange={(e:any)=>handleOvPositionType(e)} />
        </div>

        {
          ovPosTypeRef?.current?.value !== "full-screen" &&
          (
            <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
              <Select selRef={ovPosRef} format={OutlinedFormat} label="Position" items={ovPostion} onChange={(e:any)=>handleOvPosition(e)} />
            </div>            
          )

        }

        {
          ovPosTypeRef?.current?.value === "popup" &&
          (
            <>  
              <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
                <Text label="Width" defaultValue={ovMinWidth} type="text" onChange={(e:any)=>setOvMinWidth(e.target.value)} onBlur={handleMinWidth} />
              </div>
     
              <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
                <Text label="Height" defaultValue={ovMinHeight} type="text" onChange={(e:any)=>setOvMinHeight(e.target.value)} onBlur={handleMinHeight} />
              </div>
            </>
          )

        }

        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <ColorPickerBox name="Close Icon Color" colorHex={xIconColor} retColor={handleXIconChange} />
        </div>

        <div className={`${styles.mainContainer} inner_setting inner_range_setting`}>
          <Select selRef={ovShowOnRef} format={OutlinedFormat} label="Display On" items={ovShowOn} onChange={(e:any)=>handleOvShowOn(e)} />
        </div>

        {
          ovShowOnRef?.current?.value === "start_intent" &&
          <div className={`${styles.mainContainer} inner_setting`}>
            <Range displayValue={true} format={OutlinedFormat} label="Delay" min={0} max={60} step={1} defaultValue={ovShowDelay} onChange={(e:any)=>handleDelay(e)} />
          </div>
        }

        {/* <div>
          {
            myOverlayNameCtx?.map((ele:any, key:number) =>{
              return (
                <div className={styles.imgContainer} key={key}>
                  {ele?.img ? <img src={ele?.img} onClick={()=>handleOverlay(ele?.id)}/> : <span onClick={()=>handleOverlay(ele?.id)}><DefaultImage /></span>}
                </div>
              )
            })
          }          
        </div> */}

      </div>

    </Fragment>
  );

}

export default OverlaySectionSettings;
