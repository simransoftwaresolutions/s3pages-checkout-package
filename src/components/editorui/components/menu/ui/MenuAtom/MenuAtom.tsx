import styles from '../../../../../../styles/editorui/MenuAtom.module.css';
import MenuAtomProps from './IMenuAtom';
import { generateChildClassNameStr, getSeoUrlFromPageId } from "../../../../../../utils/functions";
import ButtonsIcons from '../../../../atoms/ButtonsIcons';

const MenuAtom = ({
                    cssClass, 
                    menuStyle, 
                    menuData, 
                    refInner,
                    style,
                    styleClasses,
                    iconPosition,
                    mClsName,
                    onClick}:MenuAtomProps
                ) => {

    const childStyleName = generateChildClassNameStr(styleClasses, 0);
    const iconColorClsName = generateChildClassNameStr(styleClasses, 4);
    const menuTextAlign = generateChildClassNameStr(styleClasses, 9);

    const drawMenu = () => {
        switch(iconPosition){
            case "left":
                return <>
                    {
                        menuData?.menuIcon ? 
                        (<><ButtonsIcons clsStr={`${iconColorClsName}`} name={menuData?.menuIcon || ''} />&nbsp;</>)
                        :<></>
                    }
                        {menuData?.menuName}
                    </>;
            case "right":
                return <>{menuData?.menuName}
                    {
                        menuData?.menuIcon ? 
                        (<>&nbsp;<ButtonsIcons clsStr={`${iconColorClsName}`} name={menuData?.menuIcon || ''} /></>)
                        :<></>
                    }
                </>;
            default:
                return <>
                    {
                        menuData?.menuIcon ? 
                        (<><ButtonsIcons clsStr={`${iconColorClsName}`} name={menuData?.menuIcon || ''} />&nbsp;</>)
                        :<></>
                    }
                        {menuData?.menuName}
                    </>;
        }
    } 
    
    return (
        <li className={`nav-item ${menuTextAlign}`}>
            {
                menuData?.url ?
                (
                    <a 
                        className={`${mClsName} ${childStyleName} ${styles.menuAtomBox} nav-link menu-ele-anchor`} 
                        // target={ menuData?.urlType === "internal" ? "_self" : "_blank" } 
                        href={ menuData?.urlType === "internal" ? getSeoUrlFromPageId(menuData?.url) : menuData?.url }
                    >{drawMenu()}</a>
                ):(
                    <a className={`${mClsName} ${childStyleName} ${styles.menuAtomBox} nav-link menu-ele-anchor`}>{drawMenu()}</a>
                )
            }
            
        </li>
    )
}

export default MenuAtom;