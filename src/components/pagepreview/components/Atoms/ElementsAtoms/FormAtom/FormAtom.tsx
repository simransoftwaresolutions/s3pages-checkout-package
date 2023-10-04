import styles from './FormAtom.module.css';
import MenuAtomProps from './IFormAtom';
import { Select, Text, TextArea, Range, Radio, HorizontalText, HorizontalTextArea } from '../../../../components/Atoms/Input';
import { useState, useEffect, useRef } from "react";
import { generateFormClassNameStr, generateChildClassNameStr } from "../../../../../../utils/functions";

const FormAtom = ({
                    cssClass,
                    formData,
                    formEleRef,
                    validation,
                    styleClasses,
                    formType,
                    submitBtnName,
                    handleForm,
                    lastEle,
                    inputIdx,
                }:MenuAtomProps) => {

    const [ text, setText ] = useState<any>("");
    const [ textArea, setTextArea ] = useState<any>("");
    const [ range, setRange ] = useState<any>(50);
    const [ radioChecked, setRadioChecked ] = useState<any>('');

    useEffect(() => {
        switch(formData?.inputType){
            case "Text":
                setText(formData?.defaultValue);
            break;
            case "Textarea":
                setTextArea(formData?.defaultValue);
            break;
            case "Range":
                setRange(parseInt(formData?.defaultValue));
        }
        
    }, [formData?.defaultValue]);

    const submitClsName = generateFormClassNameStr(styleClasses, "submitClassName");
    const childStyleName = generateChildClassNameStr(styleClasses, 9);
    const rowClsName = generateChildClassNameStr(styleClasses, 8);
    const btnPrentClsName = generateChildClassNameStr(styleClasses, 7);
    const btnClsName = generateChildClassNameStr(styleClasses, 6);
    const submitBtn = () => {
        return (
            <button type="submit" className={`${btnClsName} ${childStyleName} ${styles.subBtnInnr}`} onClick={(e:any) =>handleForm(e)}>{submitBtnName}</button>
        )
    }


    const getInput = (inputType:string, validation:any) => {

        const clsName = generateChildClassNameStr(styleClasses, (10+inputIdx));

        switch(inputType){
            case "Select":
                return <Select className={clsName} selRef={formEleRef} required={formData?.required} label={formData?.label} items={formData?.items} />;
            break;
            case "Text":
                return (
                    <>
                        {formType && formType === "horizontal" 
                        ? "" : 
                        <label>{formData?.label} {formData?.required && <span className={styles.input_required}>*</span>}</label>
                        }
                        <input required={formData?.required} value={text || ''} type={formData?.type} className={`form-control ${clsName}`} placeholder={formData?.placeholder} ref={formEleRef} onChange={(e:any)=>setText(e.target.value)} />
                        { validation && <div className={`form-text ${styles.validationText}`}> {validation} </div> }
                        
                    </>
                ) 
             break;
            case "Textarea":
                return (
                    <>
                        {formType && formType === "horizontal" 
                        ? "" : 
                        <label>{formData?.label} {formData?.required && <span className={styles.input_required}>*</span>}</label>
                        }
                        <textarea className={`form-control ${clsName}`} ref={formEleRef} required={formData?.required} value={textArea} onChange={(e:any)=>setTextArea(e.target.value)} />
                    </>
                ) 

            break;
            case "Range":
                return <Range className={clsName} displayValue={formData?.displayValue} label={formData?.label} min={formData?.min} max={formData?.max} step={formData?.step} defaultValue={range} onChange={(e:any)=>setRange(parseInt(e.target.value))} />;
            break;
            default:      
            return <></>;
        }
    }

    return (
        <>
            <div className={`${rowClsName} ${formType && formType === "horizontal" ? 'col-sm-12 col-md':"col-sm-12 co-md-12"}`}>
                {
                    formData?.inputType && 
                    <>
                        {getInput(formData?.inputType, validation)}
                        {/* {validation && <div className={styles.errorSpan}>{validation}</div>} */}
                    </>
                }
            </div>
            {
                lastEle &&
                (
                    <div className={`${rowClsName} ${formType && formType === "horizontal" ? 'col-sm-12 col-md':"col-sm-12 co-md-12"} ${btnPrentClsName}`}>
                        {submitBtn()}
                    </div>
                )
            }

        </>

    )
}

export default FormAtom;