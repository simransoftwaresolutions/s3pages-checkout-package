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

const TextArea = ({className="", format, label, id, required=false, defaultValue, refText, onChangeTextarea, onBlurTextarea}:TextAreaProps) => {

    return (
        <div className={`${styles.input_container}`}>
            {
                label && 
                (
                    <label htmlFor={id} id={`${id}-label`}>
                        {label}
                        {required && <span className={styles.input_required}>*</span>}
                    </label>
                )
            }
            <textarea className={`${className}`} ref={refText} name={label} required={required} id={id} value={defaultValue} onChange={onChangeTextarea} onBlur={onBlurTextarea} />
        </div>
    )
}

export default TextArea;