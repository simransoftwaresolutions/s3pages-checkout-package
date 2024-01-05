import { Fragment } from 'react';
import styles from '../../../../../styles/editorui/FontDropdown.module.css';
import { Text } from '../../../atoms/Input';
import { useState, useRef } from 'react';
import { usePagesCtx } from '../../../../../context/editorui/PagesContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const OutlinedFormat = {
  showLabel: true,
  format: 'Outlined'
}

interface FontDropdownType {
  setFontFamily:any;
}

const FontDropdown = ({setFontFamily}:FontDropdownType) => {

  const { gFonts } = usePagesCtx();
  const [ font, setFont] = useState<string>("");
  const fontFamilyRef = useRef<any>(null);
  const [ arr1, setArr1 ] = useState<any>([]);

  const handleSelector = (e:any) => {
    const val = e.target.value;
    setFont(val)   
    
    if(!val){
      setArr1([]);
      return;
    }
    let _selArr:any = [];

    for(let i=0; i< gFonts?.length; i++){
      if(gFonts[i]?.label?.toLowerCase()?.indexOf(val.toLowerCase()) === 0){
        _selArr.push(gFonts[i]);
      } 
    }
    setArr1(_selArr);
  }

  const handleArrow = () => {
    if(arr1?.length){
      setArr1([]);
    }else{
      setArr1(gFonts);
    }
  }

  return (
    <Fragment>
      <div className={styles.clsIpBox}>
        <Text refText={fontFamilyRef} label="Font Family" placeholder='Enter Font Family' format={OutlinedFormat} defaultValue={font} type="text" onChange={(e:any)=>handleSelector(e)} />
        <div className={styles.statesBoxArrw} onClick={handleArrow}><KeyboardArrowDownIcon fontSize='small' /></div>
        <div className={styles.dBoxComntainer}>
          {
            arr1?.map((a:any, aIdx:number) => {
              return (
                <div key={aIdx} className={styles.dropDownBox}>
                  <span className={styles.dropDowninnerBox} style={{ fontFamily:a.key }} onClick={()=>{setFontFamily(a.key)}}>{a.label}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    </Fragment>
  );

}

export default FontDropdown;
