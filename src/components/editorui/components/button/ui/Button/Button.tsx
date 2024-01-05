import styles from '../../../../../../styles/editorui/Button.module.css';
import ButtonProps from './IButton';
import ButtonsIcons from '../../../../atoms/ButtonsIcons';
import { generateClassNameStr, generateChildClassNameStr, getSeoUrlFromPageId } from "../../../../../../utils/functions";

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
                    urlType,
                    btnAlign,
                    onClick}:ButtonProps
                ) => {

    const internalUrl = getSeoUrlFromPageId(url || "");
                    
    const handleClick = () => {
        if(url){
            if (urlType === "internal") {
                window.location.href = internalUrl;
            } else {
                window.location.href = url;
                // window.open(url, "_blank");
            }
        }
    }

    const styleSelectorName = generateClassNameStr(styleClasses);
    const childStyleName = generateChildClassNameStr(styleClasses, 0);
    const btnCls = generateChildClassNameStr(styleClasses, 1);

    return (
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
    )
}

export default Button;