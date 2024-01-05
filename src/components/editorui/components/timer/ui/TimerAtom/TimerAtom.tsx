import styles from '../../../../../../styles/editorui/TimerAtom.module.css';
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