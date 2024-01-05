import ProgressBarProps from './IProgressBar';
import { generateClassNameStr, generateChildClassNameStr } from "../../../../../../utils/functions";

const ProgressBar = ({
                    styleType,
                    stripe,
                    text,
                    type,
                    animate,
                    progress,
                    style,
                    refInner,
                    styleClasses,
                    onClick}:ProgressBarProps
                ) => {

                    let classHolder = "progress-bar ";

                    if(stripe === "yes"){
                        classHolder += " progress-bar-striped "
                    }else{
                        classHolder.replace("progress-bar-striped", "");
                    }

                    const styleSelectorName = generateClassNameStr(styleClasses);
                    const childStyleName = generateChildClassNameStr(styleClasses, 0);
                    const progressBarCnt = generateChildClassNameStr(styleClasses, 1);
                    
                    return (
                        <div ref={refInner} className={`${styleSelectorName}`}>
                            <div className={`progress ${progressBarCnt}`}>
                                <div className={`${classHolder} ${childStyleName}`} role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: (progress+"%") }}>
                                    {text}
                                </div>
                            </div>
                        </div>
                    )

}

export default ProgressBar;