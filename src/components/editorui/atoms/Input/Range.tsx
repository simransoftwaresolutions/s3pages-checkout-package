import styles from '../../../../styles/editorui/Input.module.css';

interface RangeProps {
    format?:any,
    displayValue?:boolean,
    defaultValue?:number,
    min?:number,
    max?:number,
    step?:number,
    items?:any,
    id?:string,
    selRef?:any,
    label?:string,
    required?:boolean,
    onChange?:any,
    onBlur?:any,
    className?:string,
}

const Checkbox = ({className="", format, displayValue, required=false, id, label, defaultValue, min, max, step, onChange, onBlur}:RangeProps) => {
    return (
        <div className={`${styles.input_container} ip_cnt_gb`}>
            {label && (<label htmlFor={id} id={`${id}-label`}>{label}</label>)}
            {displayValue && (<span className={`${styles.displayValue}`}>{`${ defaultValue ? defaultValue : 0 }`}</span>)}
            {/* <input type="number" value={defaultValue} onChange={onChange}/> */}
            <input className={`${className}`} required={required} type="range" min={min} max={max} step={step} id={id} value={defaultValue} onChange={onChange} onBlur={onBlur} />
        </div>
    )
}

export default Checkbox;