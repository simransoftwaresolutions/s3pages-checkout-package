interface Style {
    border?:string;
    padding?:string;
    margin?:string;
    borderRadius?:number;
    fontColor?:string;
    bgColor?:string;
    width?:number;
    fontSize?:number;
    fontFamily?:string;
    fontStyle?:string;
    textAlign?:string;
}

export default interface SeparatorAtomProps {
    style?:Style;
    cssClass?:any;
    separatorBorderWidth?:number;
    separatorBorderHeight?:number;
    separatorBorderStyle?:string;
    separatorBorderColor?:string;
    name?:string;
    refInner?:any;
    styleClasses?:any;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>) => void;
}