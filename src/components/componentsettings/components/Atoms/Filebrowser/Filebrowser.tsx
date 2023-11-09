import styles from './Filebrowser.module.css';
import { Fragment } from 'react';
// import { usePushCtx } from "contexts/PushContext";
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { Text } from '../Input';
import { useState, useEffect, useRef } from 'react';
import { deepCloneStyle } from '../../../../../utils/functions';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FolderIcon from '@mui/icons-material/Folder';
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import InnerUploadModal from './InnerUploadModal';
import { GetDirectories } from '../../../../../service/pagepreview/Directories';
// import FileManager from '../FileManager';

const OutlinedFormat = {
    showLabel: false,
    format: 'Outlined'
}

interface FolderType {
    subFolders?:SubFoldersType[];
    files?:FileType[];
}

interface SubFoldersType {
    folderName:string;    
    type?:string;
    files?:FileType[];
}

interface FileType {
    fileName:string;
    fileUrl:string;
    type?:string;
}

interface FilebrowserType {
    setImageUrl:(ele:string)=>void
}

const Filebrowser = ({setImageUrl}:FilebrowserType) => {

    const [ actionText, setActionText ] = useState('');
    const [ folderIndex, setFolderIndex ] = useState<number>(-1);
    const { folderStruct, setFolderStruct } = usePushCtx();

    useEffect(() => {
        const dirs:FolderType = GetDirectories();
        if(dirs !== undefined){
            setFolderStruct(dirs);
        }
    }, []);

    const deleteFolder = (fIdx: number) => {
        const temopFolderStruct = deepCloneStyle(folderStruct);

        temopFolderStruct.subFolders.splice(fIdx, 1);
        setFolderStruct(temopFolderStruct);
    }

    const deleteFile = (folderIdx: number, fIdx: number) => {

        const temopFolderStruct = deepCloneStyle(folderStruct);

        if(temopFolderStruct && folderIndex !== undefined){
            if(folderIndex === -1){
                temopFolderStruct.files.splice(fIdx, 1);
            }else{
                if(temopFolderStruct.subFolders && temopFolderStruct.subFolders[folderIndex] && temopFolderStruct.subFolders[folderIndex].files){
                    temopFolderStruct.subFolders[folderIdx].files.splice(fIdx, 1);
                }
            }
        }

        setFolderStruct(temopFolderStruct);

    }

    const drawFolderStruct = (folderName:string, folderIdx:number, level:number) => {

        let marginLeft = 10 * level;

        return (
            <div style={{ marginLeft:(`${marginLeft}px`) }} onClick={() => setFolderIndex(folderIdx)}>
                <span className={`${styles.folderIcon}`}><FolderIcon fontSize='medium'/></span> {folderName}
            </div>
        )
    }  

    const drawRightFolderStruct = (name:string, folderIdx: number) => {

        return (
            <div className={`${styles.rightFolderContainer}`}>
                <div className={`${styles.closeFolderBtn}`} onClick={() => deleteFolder(folderIdx)}><DeleteForeverOutlinedIcon fontSize='medium'/></div>
                <div className={`${styles.folderIcon} ${styles.rightFolderIcon}`} onClick={() => setFolderIndex(folderIdx)}><FolderIcon fontSize='medium'/></div>
                <div>{name}</div>
            </div>
        )
    }  

    const drawRightFileStruct = (name:string, fUrl:string, folderIdx: number, fIdx: number) => {

        return (
            <div className={`${styles.rightFolderContainer}`}>
                <div className={`${styles.closeFolderBtn}`} onClick={() => deleteFile(folderIdx, fIdx)}><DeleteForeverOutlinedIcon fontSize='medium'/></div>
                <div className={`${styles.folderIcon} ${styles.rightFolderIcon}`}>
                    {
                        fUrl !== '' ?
                        (<img src={fUrl} width={100} onClick={() => setImageUrl(fUrl)} data-bs-dismiss="modal" />):
                        (<PanoramaOutlinedIcon fontSize='medium'/>)
                    }
                    
                </div>
                <div>{name}</div>
            </div>
        )
    }  

    const leftPanelView = () => {
        if(folderStruct && folderStruct.subFolders){
            return (
                        <div>
                            {drawFolderStruct('Root', -1, 0)}
                            {
                                folderStruct.subFolders.map((sub, sfIdx) => {
                                    return (
                                        <Fragment key={sfIdx}>
                                            {drawFolderStruct(sub.folderName, sfIdx, 1)}
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                    )
        }else{
            return (
                <Fragment>
                    {drawFolderStruct('Root', -1, 0)}
                </Fragment>
            )
        }
    }  

    const folderBasicStruct = () => {
        if(folderStruct){
            if(folderStruct.subFolders){
                return (
                    <div>
                        {
                            folderStruct.subFolders.map((sub, sfIdx) => {
                                return (
                                    <Fragment key={sfIdx}>
                                        {drawRightFolderStruct(sub.folderName, sfIdx)}
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                )
            }
        }else{
            return <></>
        }        
    }

    const fileBasicStruct = () => {

        let folderData:any;

        if(folderStruct){
            if(folderIndex === -1){
                folderData = deepCloneStyle(folderStruct);
            }else{
                folderData = ( folderStruct.subFolders !== undefined && folderStruct.subFolders[folderIndex] !== undefined ) ? (deepCloneStyle(folderStruct.subFolders[folderIndex])) : undefined;
            }
    
        }

        if(folderData){
            if(folderData.files){
                return (
                    <div>
                        {
                            folderData.files.map((file:any, fIdx:any) => {
                                return (
                                    <Fragment key={fIdx}>
                                        {drawRightFileStruct(file.fileName, file.fileUrl, folderIndex, fIdx)}
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                )
            }

        }else{
            return (
                <Fragment>
                </Fragment>
            )
        }
    }

    const rightPanelView = () => {
        return (
            <div className={`${styles.rightMainContainer}`}>
                {folderIndex === -1 && folderBasicStruct()}
                <br/>
                {fileBasicStruct()}
            </div>
        )
    }  

    return (
        <Fragment>
            <div className="modal fade" id="fileBorwserModal" style={{color:"#000"}} tabIndex={-1} aria-labelledby="fileBorwserModalLabel" aria-hidden="true" data-backdrop={false}>
                <div className="modal-dialog">
                    <div className={`${styles.uploadModalSize} modal-content`}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="fileBorwserModalLabel">Upload</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="row">
                                <div className="col-md-12">
                                    <div className={`${styles.topHeader}`}>
                                        <div onClick={() => setActionText("Add Folder")} className={`${styles.addFolder}`} data-bs-toggle="modal" data-bs-target="#innerUploadModal">
                                            <span><CreateNewFolderIcon fontSize='medium'/></span> Add Folder
                                        </div>
                                        <div onClick={() => setActionText("Upload File")} data-bs-toggle="modal" data-bs-target="#innerUploadModal">
                                            <span><FileUploadIcon fontSize='medium'/></span> Upload File
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.uploadSideBar} col-md-4`}>
                                    {leftPanelView()}
                                </div>
                                <div className={`${styles.uploadMainBlock} col-md-8`}>
                                    {rightPanelView()}
                                </div>
                                {/* <div className="col-md-12">
                                    <FileManager setImageUrl={setImageUrl} />
                                </div> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <InnerUploadModal folderIndex={folderIndex} actionText={actionText} />
        </Fragment>
    );
};

export default Filebrowser;