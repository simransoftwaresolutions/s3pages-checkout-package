import styles from '../../../../../styles/pagepreview/Input.module.css';

interface TextFieldProps {
    format?:any,
    id?:string,
    lableColor?:string,
    label?:string,
    type?:string,
    placeholder?:string,
    refText?:any,
    defaultValue?:any,
    required?:boolean,
    onChange?:any,
    onBlur?:any,
    onKeyUp?:any,
    onKeyDown?:any,
    onFocus?:any,
    disabled?:any,
    className?:string,
}

const HorizontalText = ({className="", disabled=false, refText, format, lableColor, required=false, type, id, label, placeholder, defaultValue, onChange, onKeyUp, onKeyDown, onFocus, onBlur}:TextFieldProps) => {

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
                <input className={`${className} form-control`} disabled={disabled} name={label} required={required} ref={refText} type={type} id={id} placeholder={(placeholder || label)} value={defaultValue} onKeyUp={onKeyUp} onChange={onChange} onKeyDown={onKeyDown} onFocus={onFocus} onBlur={onBlur} />
            </div>
        </div>
    )
}

export default HorizontalText;