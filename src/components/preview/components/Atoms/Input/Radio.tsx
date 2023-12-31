import styles from './Input.module.css';

interface RadioFieldProps {
    id?:string,
    lableColor?:string,
    label?:string,
    radioName?:string,
    refText?:any,
    checked?:boolean,
    defaultValue?:any,
    required?:boolean,
    onChange?:any,
}

const Radio = ({refText, radioName, checked=false, lableColor, required=false, id, label, defaultValue, onChange}:RadioFieldProps) => {

    return (
        <div className={`${styles.input_container} ${styles.radio}`}>
            <input type="radio" name={radioName} id={`${id}`} required={required} onClick={onChange} value={defaultValue} checked={checked} />
            <label htmlFor={`${id}`} id={`${id}-label`}>{label}</label>
        </div>
    )
}

export default Radio;