import styles from './Button.module.css';
import ButtonProps from './IButton';
import ButtonsIcons from '../../../../components/Atoms/ButtonsIcons';
import { generateClassNameStr, generateChildClassNameStr } from "../../../../../../utils/functions";

const Button = ({
                    cssClass, 
                    styleSelctor, 
                    styleClasses, 
                    childStyleSelctor, 
                    preChildren, 
                    postChildren, 
                    subtext, 
                    text,
                    style,
                    refInner,
                    url,
                    btnAlign,
                    onClick}:ButtonProps
                ) => {

    const handleClick = () => {
        if(url) window.location.href = url;
    }
                  
    const styleSelectorName = generateClassNameStr(styleClasses);
    const childStyleName = generateChildClassNameStr(styleClasses, 0);
    const btnCls = generateChildClassNameStr(styleClasses, 1);

    // const _btnAlign = btnAlign ? btnAlign : "left" as const;

    return (
        // <div style={{ textAlign:_btnAlign }}>
            <button 
                onClick={handleClick} 
                ref={refInner}
                className={`${styleSelectorName} ${cssClass}`}
            >
                <>
                        <ButtonsIcons clsStr={btnCls} name={preChildren?preChildren:''} />
                        {text}
                        <ButtonsIcons clsStr={btnCls} name={postChildren?postChildren:''} />
                        <span className={`${childStyleName} ${styles.subtextbox}`}>
                            {subtext}
                        </span>
                </>
            </button>
        // </div>

    )
}

export default Button;