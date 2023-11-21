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

const Text = ({className="", disabled=false, refText, format, lableColor, required=false, type, id, label, placeholder, defaultValue, onChange, onKeyUp, onKeyDown, onFocus, onBlur}:TextFieldProps) => {

    return (
        <div className={`${styles.input_container} ip_cnt_gb`}>
            {
                label &&  
                (
                    <label htmlFor={id} id={`${id}-label`}>
                        {label}
                        {required && <span className={styles.input_required}>*</span>}
                    </label>
                )
            }
            <input className={`${className}`} disabled={disabled} name={label} required={required} ref={refText} type={type} id={id} placeholder={(placeholder || label)} value={defaultValue} onKeyUp={onKeyUp} onChange={onChange} onKeyDown={onKeyDown} onFocus={onFocus} onBlur={onBlur} />
        </div>
    )
}

export default Text;