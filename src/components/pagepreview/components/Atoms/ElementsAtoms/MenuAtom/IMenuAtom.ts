interface MenuType {
    url?:string;
    menuName:string;
    menuIcon?:any;
}

interface Style {
    border?:string;
    padding?:string;
    margin?:string;
    borderRadius?:number;
    fontColor?:string;
    bgColor?:string;
    bgImage?:string;
    width?:number;
    fontSize?:number;
    fontFamily?:string;
    fontStyle?:string;
    textAlign?:string;
}

export default interface MenuAtomProps {
    cssClass?:string;
    name?:string;
    menuStyle?:string;
    menuData?:MenuType;
    refInner?:any;
    style?:Style;
    styleClasses?:any;
    iconPosition?:any;
    mClsName?:any;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>) => void;
}
