interface FormType {
    inputType?:string,
    format?:any,
    id?:string,
    lableColor?:string,
    label?:string,
    type?:string,
    placeholder?:string,
    refText?:any,
    defaultValue?:any,
    required?:boolean,
    displayValue?:boolean,
    min?:number,
    max?:number,
    step?:number,
    items?:any,
    radioName?:string,
    selRef?:any,
    onChange?:any,
    onBlur?:any,
    onKeyUp?:any,
    onKeyDown?:any,
    onFocus?:any,
}
export default interface MenuAtomProps {
    cssClass?:string;
    formData?:FormType;
    formEleRef?:any;
    validation?:string;
    styleClasses?:any;
    formType?:any;
    submitBtnName?:any;
    handleForm?:any;
    lastEle?:any;
    inputIdx:number;
}