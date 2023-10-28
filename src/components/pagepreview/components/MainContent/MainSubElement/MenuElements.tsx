// import type { NextPage } from 'next'
import { Fragment } from 'react'
import MenuAtom from '../../../components/Atoms/ElementsAtoms/MenuAtom';
import { generateClassNameStr, generateChildClassNameStr, generateMenuClassNameStr, getSeoUrlFromPageId } from "../../../../../utils/functions";
import ButtonsIcons from '../../../components/Atoms/ButtonsIcons';
import styles from '../../../../../styles/pagepreview/MainSubElement.module.css';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const MenuElements = ({type, props, refBtn}:Prop) => {

  const parentStyle = {
    width: props?.menuStyle === 'horizontal' ? "100%" : '100%',
  }

  const styleSelectorName = generateClassNameStr(props?.styleClasses);
  const childStyleName = generateChildClassNameStr(props?.styleClasses, 0);
  const hamburgerStyleName = generateChildClassNameStr(props?.styleClasses, 1);
  const hamburgerBorderStyleName = generateChildClassNameStr(props?.styleClasses, 2);
  const hamburgerIconClsName = generateChildClassNameStr(props?.styleClasses, 3);
  const iconColorClsName = generateChildClassNameStr(props?.styleClasses, 4);
  const logoClsName = generateChildClassNameStr(props?.styleClasses, 6);
  const menuAlignCls = generateChildClassNameStr(props?.styleClasses, 7);
  const menuTextAlign = generateChildClassNameStr(props?.styleClasses, 9);

  const drawMenu = (iconPosition:any, menuData:any) => {
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

  const _menuCntCls = (props?.showLogo === "true" && props?.logoUrl) ? `menuCnt` : `menuBlock`;
  const _menuAlignRightCls = (props?.showLogo === "true" && props?.logoUrl) ? `menuAlign` : "";
  const _flexCls = (props?.showLogo === "true" && props?.logoUrl) ? `menuFlex` : ``;
  const _displayCls = (props?.showHamburgerMenu !== "true" ? (props?.menuStyle === 'horizontal' ? `menuFlex` : `menuFlex`) : "");
  const _isHorzntlOrVert = (props?.showHamburgerMenu !== "true" ? (props?.menuStyle === 'horizontal' ? `menuCnt` : `menuBlock`) : "");
  const _noHmb = (props?.showHamburgerMenu !== "true" && props?.showLogo === "true") ? "menu-alignment-flex" : "";
  return (
    <div ref={refBtn} className={`${styleSelectorName} ${_displayCls} ${_noHmb}`} style={{...parentStyle}}>
        {
          props?.showHamburgerMenu && props?.showHamburgerMenu === "true" ?
          (
            <nav className="navbar navbar-expand-sm navbar-dark">
              <div className={`container ${_menuCntCls} ${props?.showHamburgerMenu === "true" ? "hambMnCnt" : ""}`}>
                <div className={`menuCnt ${_flexCls} hbgMenuBtnCnt`}>
                  {
                    props?.showLogo === "true" && props?.logoUrl &&
                    (
                      <a 
                        className="navbar-brand"
                        href={ props?.logoUrlType === "internal" ? getSeoUrlFromPageId(props?.logoHrefUrl) : (props?.logoHrefUrl || "#") }
                        target={ props?.logoUrlType === "internal" ? "_self" : "_blank" }
                      >
                        <img className={`${styles?.imageResponsive} ${logoClsName}`} src={props?.logoUrl} />
                      </a>
                    )
                  }

                  <button className={`${hamburgerBorderStyleName} navbar-toggler ms-auto`} type="button" data-bs-toggle="collapse" data-bs-target="#n_bar" aria-controls="navbarNavAltMarkup" aria-label="Toggle navigation">
                    <span className={`navbar-toggler-icon ${hamburgerStyleName} ${styles.humburgerIconImg} ${hamburgerIconClsName}`} style={{ height:"auto" }}>
                      <ButtonsIcons name={props?.hamburgerIcon || 'justify'} clsStr={hamburgerIconClsName} />
                    </span>
                  </button>
                </div>
                
                <div className={`${_flexCls}`}>
                  <div className={`collapse navbar-collapse menuAlignLeft ${_menuAlignRightCls} ${menuAlignCls}`} id="n_bar">
                      <ul className="navbar-nav">
                        {
                          props?.menuArr?.map((menu:any, mIndex:any) => {
                            const mClsName = generateMenuClassNameStr(props?.menuArr[mIndex]?.menuClassName);
                            if(menu?.url){
                              return <li className={`nav-item ${menuTextAlign}`} key={mIndex}>
                                <a 
                                  target={ menu?.urlType === "internal" ? "_self" : "_blank" }
                                  className={`${mClsName} ${childStyleName} nav-link menu-ele-anchor`} 
                                  href={ menu?.urlType === "internal" ? getSeoUrlFromPageId(menu?.url) : menu?.url }
                                >
                                  {drawMenu(props?.iconPosition, menu)}
                                </a>
                              </li>
                            }
                            return <li className={`nav-item ${menuTextAlign}`} key={mIndex}><a className={`${mClsName} ${childStyleName} nav-link`}>{drawMenu(props?.iconPosition, menu)}</a></li>
                          })
                        }
                      </ul>
                  </div>
                </div>
                
              </div>
            </nav>
          ):(
            <div className={`${_menuCntCls} ${_displayCls}`}>
              <div className={` ${_flexCls}`}>
                {
                  props?.showLogo === "true" && props?.logoUrl &&
                  (
                    <div>
                      <a 
                        className="navbar-brand"
                        href={ props?.logoUrlType === "internal" ? getSeoUrlFromPageId(props?.logoHrefUrl) : (props?.logoHrefUrl || "#") }
                        target={ props?.logoUrlType === "internal" ? "_self" : "_blank" }
                      >
                        <img className={`${styles?.imageResponsive} ${logoClsName}`} src={props?.logoUrl} />
                      </a>
                    </div>
                  )
                }
              </div>
              <div className={`${_flexCls} ${_displayCls} ${_menuAlignRightCls} menuAlignLeft ${menuAlignCls}`}>
                <ul className={`nav ${_isHorzntlOrVert}`}>
                {
                  props?.menuArr?.map((menu:any, mIndex:any) => {
                    const mClsName = generateMenuClassNameStr(props?.menuArr[mIndex]?.menuClassName);
                    return (
                      <Fragment key={`menu${mIndex}`}>
                        <MenuAtom mClsName={mClsName} {...props} menuData={menu} style={props.style} styleClasses={props?.styleClasses} />
                      </Fragment>
                    )
                  })
                }
                </ul>
              </div>
            </div>
          )
        }

    </div>
  ) 
}

export default MenuElements;
