import styles from '../../../../../../styles/pagepreview/TimerAtom.module.css';
import TimerAtomProps from './ITimerAtom';
import { generateChildClassNameStr } from "../../../../../../utils/functions";

const TimerAtom = ({
                    cssClass, 
                    name, 
                    labelName, 
                    lableValue, 
                    timerLabelStyle, 
                    timerFormatStyle, 
                    timerIconBgStyle, 
                    refInner,
                    styleClasses,
                    onClick}:TimerAtomProps
                ) => {

                    const outerStyle = {
                        minHeight: timerIconBgStyle?.timerIconBgSize ? `${timerIconBgStyle?.timerIconBgSize}px` : '85px',
                        minWidth: timerIconBgStyle?.timerIconBgSize ? `${timerIconBgStyle?.timerIconBgSize}px` : '85px',
                        borderRadius: timerIconBgStyle?.timerIconBgRadius ? `${timerIconBgStyle?.timerIconBgRadius}%` : '5%',
                        marginRight: timerIconBgStyle?.timerIconGap ? `${timerIconBgStyle?.timerIconGap}px` : '10px',
                        background: timerIconBgStyle?.timerIconBgColor ? timerIconBgStyle?.timerIconBgColor : "#000000bf",
                        boxShadow: timerIconBgStyle?.timerIconBoxShadow ? `${timerIconBgStyle?.timerIconBoxShadow} 0px -5px 0px 0px inset` : "#000 0px -5px 0px 0px inset",
                        padding:'10px',
                    }

                    const labelNameStyle = {
                        color: timerLabelStyle?.labelFontColor ? timerLabelStyle?.labelFontColor : '#fff',
                        fontFamily:timerLabelStyle?.labelFontFamily ? timerLabelStyle?.labelFontFamily: "",
                        fontSize: timerLabelStyle?.labelFontSize ? `${timerLabelStyle?.labelFontSize}px` : '16px',
                    }

                    const labelValueStyle = {
                        color: timerFormatStyle?.formatFontColor ? timerFormatStyle?.formatFontColor : '#fff',
                        fontFamily:timerFormatStyle?.formatFontFamily ? timerFormatStyle?.formatFontFamily: "",
                        fontSize: timerFormatStyle?.formatFontSize ? `${timerFormatStyle?.formatFontSize}px` : '16px',
                    }

    const childStyleName0 = generateChildClassNameStr(styleClasses, 0);
    const childStyleName1 = generateChildClassNameStr(styleClasses, 1);
    const childStyleName2 = generateChildClassNameStr(styleClasses, 2);

    return (
        <div className={`${childStyleName0} ${styles.outerBox}`}>
            <div className={`${childStyleName1}`}>{lableValue}</div>            
            <div className={`${childStyleName2}`}>{labelName}</div>            
        </div>
    )
}

export default TimerAtom;