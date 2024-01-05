import styles from '../../../../styles/editorui/ColorPickerBox.module.css';
import { useEffect, useState } from "react";
import { convertHexToRGB, convertRgbaToHex } from '../../../../utils/functions';
import { SketchPicker } from 'react-color';

interface ColorPickProp {
    name:string;
    colorHex:string;
    retColor:(hexValue:string)=>void;
  }
  

const ColorPickerBox = ({name, colorHex, retColor}:ColorPickProp) => {
    
    const [colorSel, setColorSel] = useState<string>('off');
    const [color, setColor] = useState<any>();

    useEffect(() => {
        if(colorHex){
            setColor(convertHexToRGB(colorHex));
        }else{
            setColor(convertHexToRGB("#ffffffff"));
        }
        
    }, [colorHex])

    const handleChange = (color:any) => {
        const hexValue = convertRgbaToHex(color.rgb.r, color.rgb.g, color.rgb.b, color.rgb.a);
        setColor(color.rgb);
        retColor(hexValue);
    }

    return (
        <div>
          <span className={`color_label`}>{name ? name : "Color"} </span>
          <span style={{display:`${colorSel === "on" ? "block" : "none"}`}}>
            <SketchPicker color={color} onChangeComplete={handleChange} />
            <span className={`${styles.colorBox} ${styles.colorBoxBg} colorbox-gb`} onClick={() => setColorSel("off")}>
              Choose Color
            </span>
          </span>
          <span onClick={() => setColorSel("on")} className={`${styles.colorBox} colorbox-gb`} style={{display:`${colorSel === "off" ? "block" : "none"}` ,float:"right"}}>
            <div className={"select_color_box"} style={{ background: color ? convertRgbaToHex(color.r, color.g, color.b, color.a) : "#fff" }}></div>
          </span>
        </div>
    );
};

export default ColorPickerBox;