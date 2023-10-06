import styles from '../../../../../../styles/pagepreview/SocialIcon.module.css';
import SocialIconProps from './ISocialIcon';
import MaterialIcons from '../../../../components/Atoms/MaterialIcons';
import { generateChildClassNameStr } from "../../../../../../utils/functions";

const SocialIcon = ({
                    cssClass, 
                    icons, 
                    refInner,
                    style,
                    styleClasses,
                    onClick}:SocialIconProps
                ) => {


        let backgroundInfo = "transparent";

        if(style && style.bgColor){
            backgroundInfo = style?.bgColor;
        }

        const childStyleName = generateChildClassNameStr(styleClasses, 0);
        const iconCls = generateChildClassNameStr(styleClasses, 1);

    return (
        <div className={`iconCnt ${childStyleName}`}>
            {
                icons?.url ?
                <a target="_blank" href={icons?.url} style={{color:icons?.iconColor}}><MaterialIcons iconclass={iconCls} name={icons.iconName} /></a>
                :<a target="_blank" style={{color:icons?.iconColor}}><MaterialIcons iconclass={iconCls} name={icons.iconName} /></a>    
            }
        </div>
    )
}

export default SocialIcon;