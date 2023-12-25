import styles from '../../../../../styles/pagepreview/PageTopbar.module.css';
import { usePagesCtx } from "../../../../../context/pagepreview/PagesContext";
import { useEffect, useState } from "react";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AltRouteOutlinedIcon from '@mui/icons-material/AltRouteOutlined';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';

interface PageTopbarProps {
    onRedo: () => void,
    clonePage: () => void,
    deletePage: () => void,
    splitTest: () => void,
    openTemplateSettings: () => void,
    handlePreview: () => void,
    handleSave: () => void,
    activeHighlight:boolean,
    secRefs:any,
    handleHighlight: () => void,
}

const PageTopbar = ({
                            onRedo,
                            clonePage,
                            deletePage,
                            splitTest,
                            openTemplateSettings,
                            handlePreview,
                            handleSave,
                            activeHighlight,
                            secRefs,
                            handleHighlight,
                            }:PageTopbarProps) => {

    const { setHideOverlayArr, pageAction, setPageAction } = usePagesCtx();

    const showSections = () => {
        setPageAction({...pageAction, showSectionPopup:true});
    }

    const [ isShowOvs, setIsShowOvs ] = useState<boolean>(false);

    const tglFunc = () => {
        let idxArr = [];
        for(let i=0;i<secRefs?.current?.length; i++){
          if(secRefs?.current[i]?.classList?.contains('overlay-toggle-cls')) {
            if(isShowOvs){
                secRefs?.current[i]?.classList.remove('overlay-tgl-show');
                secRefs?.current[i]?.classList.add('overlay-hide');
                idxArr.push(i);
            }else{
                secRefs?.current[i]?.classList.add('overlay-tgl-show');
                secRefs?.current[i]?.classList.remove('overlay-hide');
            }
          }
        }

        if(isShowOvs){
            setHideOverlayArr(idxArr);
        }else{
            setHideOverlayArr([]);
        }
    }

    return (
        <div className="col-md-4">
            <div className={`${styles.prevSve}`}>
                <div className={`${styles.viewSizes1}`}>
                    <span className={`${styles.UndoRedu}`}>
                        
                        {
                            isShowOvs ?
                            <button onClick={()=>{setIsShowOvs(false);tglFunc();}}>
                                <div className="tooltip">
                                    <LayersClearIcon />
                                    <span className="tooltiptext">Hide Overlay</span>
                                </div>
                            </button>
                            :
                            <button onClick={()=>{setIsShowOvs(true);tglFunc();}}>
                                <div className="tooltip">
                                    <LayersIcon />
                                    <span className="tooltiptext">Show Overlay</span>
                                </div>
                            </button>
                        }

                        <button>
                            <div className="tooltip">
                                <UndoIcon />
                                <span className="tooltiptext">Undo</span>
                            </div>
                        </button>
                        <button>
                            <div className="tooltip">
                                <RedoIcon />
                                <span className="tooltiptext">Redo</span>
                            </div>
                        </button>
                    </span>
                    <span className={`${styles.moreIconDlt}`}>
                        <button onClick={clonePage}>
                            <div className="tooltip">
                                <FileCopyOutlinedIcon className={styles.icons} fontSize="medium"/>
                                <span className="tooltiptext">Copy Page</span>
                            </div>    
                        </button>
                        <button onClick={deletePage}>
                            <div className="tooltip">
                                <DeleteForeverOutlinedIcon className={styles.icons} fontSize="medium"/>
                                <span className="tooltiptext">Delete Page</span>
                            </div>
                        </button>
                        <button onClick={splitTest}>
                            <div className="tooltip"> <AltRouteOutlinedIcon fontSize="medium"/>
                                <span className="tooltiptext">Split Testing</span>
                            </div>
                        </button>
                        <button>
                            <div className={`tooltip ${activeHighlight ? styles.highlightElement : ''}`} onClick={() => handleHighlight()}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20">
                                    <path d="M180 936q-24 0-42-18t-18-42h60v60Zm-60-148v-83h60v83h-60Zm0-171v-83h60v83h-60Zm0-170v-83h60v83h-60Zm0-171q0-24 
                                    18-42t42-18v60h-60Zm148 512V364h424v424H268Zm0 148v-60h83v60h-83Zm0-660v-60h83v60h-83Zm60 452h304V424H328v304Zm111 
                                    208v-60h83v60h-83Zm0-660v-60h83v60h-83Zm170 660v-60h83v60h-83Zm0-660v-60h83v60h-83Zm171 660v-60h60q0 
                                24-18 42t-42 18Zm0-148v-83h60v83h-60Zm0-171v-83h60v83h-60Zm0-170v-83h60v83h-60Zm0-171v-60q24 0 42 18t18 42h-60Z"/></svg>
                                <span className="tooltiptext">Show Outlines</span>
                            </div>
                        </button>
                    </span>
                    <span className={`${styles.clsSaveView}`}>
                        <button  onClick={showSections}>
                            <div className="tooltip"> <AccountTreeIcon fontSize="medium"/>
                                <span className="tooltiptext">Show Sections</span>
                            </div>
                        </button>
                        {/* <button onClick={openTemplateSettings}>
                            <div className="tooltip"> <SettingsIcon fontSize="medium"/>
                                <span className="tooltiptext">Open Settings</span>
                            </div>
                        </button> */}
                        <button onClick={handlePreview}>
                            <div className="tooltip"> 
                                <a target='_blank' href="/editor/preview"><RemoveRedEyeIcon fontSize="medium"/></a>
                                <span className="tooltiptext">Preview</span>
                            </div>
                        </button>
                        <button onClick={handleSave}>
                            <div className="tooltip"> <SaveIcon fontSize="medium"/>
                                <span className="tooltiptext">Save</span>
                            </div>
                        </button>
                        <button>
                            <div className="tooltip"> <ArrowBackIcon fontSize="medium"/>
                                <span className="tooltiptext">Back</span>
                            </div>
                        </button>
                    </span>
                </div>
            </div>  
        </div>
    );
};

export default PageTopbar;