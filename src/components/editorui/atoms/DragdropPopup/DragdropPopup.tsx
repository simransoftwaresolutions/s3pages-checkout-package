import styles from '../../../../styles/editorui/DragdropPopup.module.css';
import { useRef } from 'react';
import { getChangeStyleOfElement } from '../../../../utils/functions';
import Draggable from 'react-draggable';
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { useSettingsCtx } from "../../../../context/editorui/SettingsContext";
import Settings from './Settings';
import { useContentCtx } from "../../../../context/editorui/ContentsContext";

const DragdropPopup = () => {
    
    const { openForm, setIsSettingsOpen, getStyleOfElement, setStyleOfElement } = useSettingsCtx();
    const draggableRef = useRef(null);
    const { changeStyleOfElement, setChangeStyleOfElement } = useContentCtx();

    // called when popup is closed
    const closePopup = () => {
        setChangeStyleOfElement({...changeStyleOfElement, ...getChangeStyleOfElement});
        setIsSettingsOpen(false)
    }

    // handler for setting custom name for header of popup
    const settingName = () => {
        switch(changeStyleOfElement.type){
            case "Faq":
                return "FAQ"
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
                    <span className="topNamePage"> {openForm ? "Add/Edit Form" : settingName() } Setting </span>
                    <span className={`${styles.closeBtn}`} onClick={closePopup}><CancelPresentationIcon /></span>
                </div>
                <div className={`${styles.settingBox} Boxbody`}><Settings /></div>
            </div>
        </Draggable>
    );
};

export default DragdropPopup;