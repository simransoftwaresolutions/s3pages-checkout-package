import styles from './Input.module.css';

interface TextAreaProps {
    format?:any,
    id?:string,
    label?:string,
    defaultValue?:string,
    required?:boolean,
    refText?:any,
    onChangeTextarea?:any,
    onBlurTextarea?:any,
    className?:string,
}

const HorizontalTextArea = ({className="", format, label, id, required=false, defaultValue, refText, onChangeTextarea, onBlurTextarea}:TextAreaProps) => {

    return (
        <div className={`${styles.input_container} row mb-3`}>
            {
                label && 
                (
                    <label htmlFor={id} id={`${id}-label`} className={`col-sm-2 col-form-label ${styles.hozntlLable}`}>
                        {label}
                        {required && <span className={styles.input_required}>*</span>}
                    </label>
                )
            }
            <div className={`col-sm-10 ${styles.hozntlLable}`}>
                <textarea className={`${className}`} ref={refText} name={label} required={required} id={id} value={defaultValue} onChange={onChangeTextarea} onBlur={onBlurTextarea} />
            </div>
        </div>
    )
}

export default HorizontalTextArea;