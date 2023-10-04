interface TimerLabelStyleType {
    labelFontColor?:string;
    labelFontFamily?:string;
    labelFontSize?:number;
}

interface TimerFormatStyleType {
    formatFontColor?:string;
    formatFontFamily?:string;
    formatFontSize?:number;
}

interface TimerIconBgStyleType {
    timerIconBgSize?:number;
    timerIconBgRadius?:number;
    timerIconGap?:number;
    timerIconBgColor?:string;
    timerIconBoxShadow?:string;
}

export default interface TimerAtomProps {
    cssClass?:string;
    name?:string;
    labelName?:string;
    lableValue?:number;
    timerLabelStyle?:TimerLabelStyleType;
    timerFormatStyle?:TimerFormatStyleType;
    timerIconBgStyle?:TimerIconBgStyleType;
    styleClasses?:any;
    refInner?:any;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>) => void;
}
