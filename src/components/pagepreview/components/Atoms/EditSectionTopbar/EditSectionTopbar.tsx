import styles from './EditSectionTopbar.module.css';
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
import { DeleteSectionApi, CloneSectionApi } from '../../../../../service/pagepreview/ElementServices';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import { deepCloneArray } from '../../../../../utils/functions';
import { toast } from 'react-toastify';

interface EditSectionTBProps {
    onRedo: () => void,
    activeHighlight:boolean,
    showElementInModal: (sCtx:any, sIdx:number) => void,
    openSettings: (name:string, sIdx:number) => void,
    handleHighlight: () => void,
}

const EditSectionTopbar = ({
                            onRedo,
                            activeHighlight,
                            showElementInModal,
                            openSettings,
                            handleHighlight,
                            }:EditSectionTBProps) => {

    const { sectionCtx, setSectionCtx, changeStyleOfElement, setChangeStyleOfElement } = useContentCtx();
    const { setSettingFlag,setShowSettingCtx } = usePushCtx();
    const { setSelectedMainTools, setIsSettingsOpen } = useSettingsCtx();
    const { updateSection, setUpdateSection } = usePagesCtx();
    const { setIsProcessing } = usePushCtx();

    const handleDelete = async () => {
        const _id = updateSection?.id;

        setIsProcessing(true);
        await DeleteSectionApi(_id || '');
        toast.success("Section deleted successfully.");
        setIsProcessing(false);

        const tempSectionCtx:any[] = [];
        setSectionCtx(tempSectionCtx);

        setSettingFlag(true);
        setShowSettingCtx(true);
        setSelectedMainTools("Blocks");

        setTimeout(()=>{
            setUpdateSection({...updateSection, deleteSection: true});
        },300)

    }

    const handleClone = async () => {
        const _id = updateSection?.id;
        setIsProcessing(true);
        const retClone = await CloneSectionApi(_id || '');
        
        if(retClone.status){
            const _retTemp = Object.assign({}, retClone.data, { id: retClone.data._id });

            setUpdateSection({...updateSection, 
                copySection:true,
                copySectionDetails:_retTemp,
            });

            toast.success("Section cloned successfully.");
        }else{
            toast.error("Something went wrong."); 
        }
        setIsProcessing(false);
    }

    const openTemplateSettings = () => {
        const sCtx = deepCloneArray(sectionCtx);
        const _settingData = {
          from:"",
          data:sCtx[0],
          sectionIdx:0,
          elementIdxs:[],
          type:"Section",
        }
    
        setChangeStyleOfElement({...changeStyleOfElement, ..._settingData});
        setIsSettingsOpen(true);
    }

    if(!sectionCtx?.length) return <></>;

    return (
        <div className="col-md-4">
            <div className={`${styles.prevSve}`}>
                <div className={`${styles.viewSizes1}`}>
                    <span className={`${styles.UndoRedu}`}>
                        <button>
                            <div className="tooltip">
                              <UndoIcon />
                              <span className="tooltiptext">Undo</span>
                            </div>
                        </button>
                        <button>
                            <div className="tooltip">
                              <RedoIcon onClick={()=>onRedo()} />
                              <span className="tooltiptext">Redo</span>
                            </div>
                        </button>
                    </span>
                    <span className={`${styles.moreIconDlt}`}>
                        <button onClick={handleClone}>
                            <div className="tooltip">
                              <FileCopyOutlinedIcon className={styles.icons} fontSize="medium"/>
                              <span className="tooltiptext">Copy</span>
                            </div>    
                        </button>
                        <button onClick={handleDelete}>
                            <div className="tooltip">
                                <DeleteForeverOutlinedIcon className={styles.icons} fontSize="medium"/>
                                <span className="tooltiptext">Delete</span>
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
                        <button title='Split Testing' onClick={openTemplateSettings}>
                            <div className="tooltip"> <SettingsIcon fontSize="medium"/>
                                <span className="tooltiptext">Open Settings</span>
                            </div>
                        </button>
                        <button data-bs-toggle="modal" data-bs-target="#saveModal" onClick={() => showElementInModal(sectionCtx[0], 0)}>
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

export default EditSectionTopbar;