interface Style {
    border?:string;
    padding?:string;
    margin?:string;
    borderRadius?:number;
    fontColor?:string;
    width?:number;
    fontSize?:number;
    fontFamily?:string;
    fontStyle?:string;
    textAlign?:string;
}

export default interface HeadingProps {
    style?:Style;
    headingType?:string;
    cssClass?:string;
    text?:string;
    refInner?:any;
    styleClasses?:any;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>) => void;
}