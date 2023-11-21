interface IconType {
    url?:string;
    iconName:string;
    iconColor?:string;
}

interface Style {
    border?:string;
    padding?:string;
    margin?:string;
    borderRadius?:number;
    iconBorderRadius?:number;
    fontColor?:string;
    bgColor?:string;
    bgImage?:string;
    width?:number;
    fontSize?:number;
    subTextfontSize?:number;
    subTextColor?:string;
    fontFamily?:string;
    fontStyle?:string;
    textAlign?:string;
    minHeight?:string;
    minWidth?:string;
    marginRight?:string;
    minBgSize?:string;
}

export default interface SocialIconProps {
    cssClass?:string;
    name?:string;
    icons:IconType;
    refInner?:any;
    style?:Style;
    styleClasses?:any;
    iIndex:number;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>) => void;
}
