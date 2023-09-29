import styles from './MenuAtom.module.css';
import MenuAtomProps from './IMenuAtom';
import MaterialIcons from '../../../../components/Atoms/MaterialIcons';
import { generateChildClassNameStr } from "../../../../../../utils/functions";
import ButtonsIcons from '../../../../components/Atoms/ButtonsIcons';

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
                break;
            case "right":
                return <>{menuData?.menuName}
                    {
                        menuData?.menuIcon ? 
                        (<>&nbsp;<ButtonsIcons clsStr={`${iconColorClsName}`} name={menuData?.menuIcon || ''} /></>)
                        :<></>
                    }
                </>;
                break;
            default:
                return <>
                    {
                        menuData?.menuIcon ? 
                        (<><ButtonsIcons clsStr={`${iconColorClsName}`} name={menuData?.menuIcon || ''} />&nbsp;</>)
                        :<></>
                    }
                        {menuData?.menuName}
                    </>;
                break;    
        }
    } 
    
    return (
        <li className="nav-item">
            {
                menuData?.url ?
                (
                    <a className={`${mClsName} ${childStyleName} ${styles.menuAtomBox} nav-link`} target="_blank" href={menuData?.url}>{drawMenu()}</a>
                ):(
                    <a className={`${mClsName} ${childStyleName} ${styles.menuAtomBox} nav-link`}>{drawMenu()}</a>
                )
            }
            
        </li>
    )
}

export default MenuAtom;