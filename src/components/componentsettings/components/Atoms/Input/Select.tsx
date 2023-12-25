import styles from '../../../../../styles/pagepreview/Input.module.css';

interface DropdownProps {
    format?:any,
    items?:any,
    id?:string,
    label?:string,
    selRef?:any,
    required?:boolean,
    className?:string,
    onChange?:any,
}

const Select = ({className="", format, items, id, label, selRef, required=false, onChange}:DropdownProps) => {
    if(selRef){
    }
    return (
        <div className={`${styles.input_container} ip_cnt_gb`}>
            {label && (<label htmlFor={id} id={`${id}-label`}>{label}</label>)}
            <select className={`${className}`} ref={selRef} id={id} onChange={onChange} required={required}>
                {
                    items.map((ddl:any) => {
                        return <option value={ddl.key} key={`${ddl.label}_${ddl.key}`}>{ddl.label}</option>
                        // return <option value={ddl.key} selected={ddl?.selected} key={ddl.label}>{ddl.label}</option>
                    })
                }
            </select>
        </div>
    )
}

export default Select;