import { Fragment } from 'react';
import styles from '../../../../../styles/editorui/PageSettings.module.css';
import { useSettingsCtx } from "../../../../../context/editorui/SettingsContext";
import { Range, Select, Text, TextArea } from '../../../atoms/Input';
import { LayoutItems, FontFamilyItems, BackgroundTypeItems, BackgroundSizeItems } from '../../../datas/PageSettingsData';
import { BackgroundPositionItems } from '../../../datas/PageSettingsData';
import { useState, useEffect } from 'react';
import { usePushCtx } from '../../../../../context/editorui/PushContext';
import ColorPickerBox from '../../../atoms/ColorPickerBox';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

const PageSettings = () => {

  const { templateCss, setTemplateCss } = usePushCtx();

  const { selectedSetting, setSelectedSetting } = useSettingsCtx();
  const [backgroundVideo, setBackgroundVideo] = useState('');
  const [color, setColor] = useState('');
  const [headingColor, setHeadingColor] = useState('');
  const [anchorColor, setAnchorColor] = useState('');
  const [customCSS, setCustomCSS] = useState('');
  const [fontSize, setFontSize] = useState<number>(16);
  const [lineHeight, setLineHeight] = useState<number>(10);
  const [textColor, setTextColor] = useState<any>();
  const [textColorSel, setTextColorSel] = useState<string>('off');

  const displaySubSetting = (sIndex:string) => {
    if(sIndex === selectedSetting){
      setSelectedSetting('');
    }else{
      setSelectedSetting(sIndex);
    }
  }

  useEffect(() => {
    const _templateCss = {...templateCss};

  }, [])

  const setSettingText = (position:string, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    switch(position){
      case "backgroundVideo":
        setBackgroundVideo(e.target.value);
        break;
      case "color":
        setColor(e.target.value);
        break;
      case "headingColor":
        setHeadingColor(e.target.value);
        break;
      case "anchorColor":
        setAnchorColor(e.target.value);
        break;
      case "customCSS":
        setCustomCSS(e.target.value);
        break;
      default:
        break;
    }
  }

  const setSettingTextare = (position:string, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    switch(position){
      case "customCSS":
        setCustomCSS(e.target.value);
        break;
      default:
        break;
    }
  }

  const setFontFamily = (e:any) => {
    setTemplateCss({...templateCss, fontFamily: e.target.value});
  }

  const handleFontSize = (e:any) => {
    const _fontSize = Number(e.target.value);
    setTemplateCss({...templateCss, fontSize: _fontSize});
    setFontSize(_fontSize);
  }

  const handleLineHeight = (e:any) => {
    const _lineHeight = Number(e.target.value);
    setTemplateCss({...templateCss, lineHeight: _lineHeight});
    setLineHeight(_lineHeight);
  }

  const handleTextColorChange = (color:any) => {
    setTemplateCss({...templateCss, fontColor: color});
    setTextColor(color);
  }

  return (
    <Fragment>
      <div className={`${styles.subSettingTitle} ${selectedSetting === "page_setting" ? "active_subsetting" : ""}`} onClick={()=>displaySubSetting("page_setting")}>
        Page Settings
      </div>
      <div className={`${styles.innerRow}`} style={{ backgroundColor:"#0e0e0e" }}>
      {/* <div className={`${styles.innerRow}`} style={{ display:`${selectedSetting === "page_setting" ? "block" : "block"}`, backgroundColor:"#0e0e0e" }}> */}
        <Select format={OutlinedFormat} id="layout" label="Layout" items={LayoutItems} />
        <Select format={OutlinedFormat} id="font_family" label="Font Family" items={FontFamilyItems} onChange={(e:any)=>setFontFamily(e)}/>
        <Range format={OutlinedFormat} id="font_size" label="Font Size" min={8} max={200} step={1} defaultValue={fontSize} onChange={(e:any)=>handleFontSize(e)} />
        <Range format={OutlinedFormat} id="line_height" label="Line Height" min={0} max={100} step={1} defaultValue={lineHeight} onChange={(e:any)=>handleLineHeight(e)} />
        <Select format={OutlinedFormat} id="background_type" label="Background Type" items={BackgroundTypeItems} />
        <Select format={OutlinedFormat} id="background_size" label="Background Size" items={BackgroundSizeItems} />
        <Select format={OutlinedFormat} id="background_position" label="Background Position" items={BackgroundPositionItems} />
        <Text format={OutlinedFormat} id="background_video" label="Background Video" defaultValue={backgroundVideo} type="text" onChange={(e:any)=>setSettingText("backgroundVideo",e)} />

        <div className={`${styles.labelColor}`}>
          <ColorPickerBox name="Color" colorHex={textColor} retColor={handleTextColorChange} />
        </div>

        <Text format={OutlinedFormat} id="heading_color" label="Heading Color" defaultValue={headingColor} type="text" onChange={(e:any)=>setSettingText("headingColor",e)} />
        <Text format={OutlinedFormat} id="anchor_color" label="Anchor Color" defaultValue={anchorColor} type="text" onChange={(e:any)=>setSettingText("anchorColor",e)} />
        <TextArea format={OutlinedFormat} id="custom_cSS" label="Custom CSS" defaultValue={customCSS} onChangeTextarea={(e:any)=>setSettingTextare("customCSS",e)} />
      </div>

    </Fragment>
  );

}

export default PageSettings;
