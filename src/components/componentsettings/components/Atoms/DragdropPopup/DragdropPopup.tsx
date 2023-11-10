import styles from '../../../../../styles/componentsettings/DragdropPopup.module.css';
import { Fragment } from 'react';
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { useState, useEffect, useRef } from 'react';
import { deepCloneStyle, getChangeStyleOfElement } from '../../../../../utils/functions';
import Draggable from 'react-draggable';
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import FormEditSetting from '../../StyleSettings/FormEditSetting';
import Settings from '../../Atoms/Settings';
import { defaultTempStyleSelector, useContentCtx } from "../../../../../context/pagepreview/ContentsContext";


const DragdropPopup = () => {
    
    const { openForm, setIsSettingsOpen, getStyleOfElement, setStyleOfElement } = useSettingsCtx();
    const { curEleCtx } = usePushCtx();
    const draggableRef = useRef(null);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    const { 
        changeStyleOfElement,
        setChangeStyleOfElement,
        tempStyleSelector,
        setTempStyleSelector
    } = useContentCtx();

    const removeUnusedStyleSelector = () => {
        let tempStyleCtx = getStyleOfElement();
        if(tempStyleSelector?.isStyleAdd && tempStyleSelector?.selectorArr?.length){
            for(let i=tempStyleSelector?.selectorArr?.length-1; i>=0;i--){
                if(tempStyleSelector?.selectorArr[i]?.isAdded){
                    tempStyleCtx?.styleClasses?.mainClassName.splice(tempStyleSelector?.selectorArr[i]?.idx, 1);
                }
            }
        }
        console.log(tempStyleSelector);
        setStyleOfElement(tempStyleCtx);
        setTempStyleSelector(defaultTempStyleSelector);
    }

    const closePopup = () => {
        // removeUnusedStyleSelector();
        setChangeStyleOfElement({...changeStyleOfElement, ...getChangeStyleOfElement});
        setIsSettingsOpen(false)
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////

    const settingName = () => {
        switch(changeStyleOfElement.type){
            case "Faq":
                return "FAQ"
                break;
            default:
                return changeStyleOfElement.type;
        }
    }

    return (
        <Draggable
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            grid={[25, 25]}
            scale={1}
            nodeRef={draggableRef}
        >
            <div className={styles.box} ref={draggableRef}>
                <div className={`${styles.subSettingTitle}`}>
                    <span className={`${styles.handleIcon} handle`}><OpenWithOutlinedIcon /></span>
                    <span className="topNamePage">
                        {openForm ? "Add/Edit Form" : settingName() } Setting
                    </span>
                    <span className={`${styles.closeBtn}`} onClick={closePopup}><CancelPresentationIcon /></span>
                </div>
                
                <div className={`${styles.settingBox} Boxbody`}><Settings /></div>
            </div>
        </Draggable>
    );
};

export default DragdropPopup;