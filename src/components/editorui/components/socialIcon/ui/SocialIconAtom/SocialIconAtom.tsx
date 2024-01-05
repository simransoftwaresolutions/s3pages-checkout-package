import SocialIconProps from './ISocialIcon';
import MaterialIcons from '../../../../atoms/MaterialIcons';
import { generateChildClassNameStr } from "../../../../../../utils/functions";

const SocialIconAtom = ({
                    cssClass, 
                    icons, 
                    refInner,
                    style,
                    styleClasses,
                    iIndex,
                    onClick}:SocialIconProps
                ) => {


        let backgroundInfo = "transparent";

        if(style && style.bgColor){
            backgroundInfo = style?.bgColor;
        }

        const childStyleName = generateChildClassNameStr(styleClasses, 0);
        const iconCls = generateChildClassNameStr(styleClasses, 1) || "";
        const iconClr = generateChildClassNameStr(styleClasses, (3+iIndex)) || "";

    return (
        <div className={`iconCnt ${childStyleName}`}>
            {
                icons?.url ?
                <a target="_blank" href={icons?.url} style={{color:icons?.iconColor}}><MaterialIcons iconclass={`${iconClr} ${iconCls}`} name={icons.iconName} /></a>
                :<a target="_blank" style={{color:icons?.iconColor}}><MaterialIcons iconclass={`${iconClr} ${iconCls}`} name={icons.iconName} /></a>    
            }
        </div>
    )
}

export default SocialIconAtom;