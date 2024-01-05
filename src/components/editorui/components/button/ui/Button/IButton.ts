interface Style {
    border?:string;
    padding?:string;
    margin?:string;
    borderRadius?:number;
    fontColor?:string;
    bgColor?:string;
    bgImage?:string;
    bgRepeat?:string;
    bgPosition?:string;
    bgDirection?:string;
    bgGradStartColor?:string;
    bgGradEndColor?:string;
    bgSize?:string;
    width?:number;
    fontSize?:number;
    subTextfontSize?:number;
    subTextColor?:string;
    fontFamily?:string;
    fontStyle?:string;
    textAlign?:string;
}

export default interface ButtonProps {
    style?:Style;
    styleSelctor?:any;
    styleClasses?:any;
    childStyleSelctor?:any;
    cssClass?:string;
    preChildren?:string;
    postChildren?:string;
    subtext?:string;
    text?:string;
    refInner?:any;
    url?:string;
    urlType?:string;
    btnAlign?:any;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>) => void;
}
