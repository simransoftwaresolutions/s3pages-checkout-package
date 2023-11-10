import styles from '../../../../../../styles/componentsettings/InnerUploadModal.module.css';
import { Fragment } from 'react';
import { usePushCtx } from "../../../../../../context/pagepreview/PushContext";
import { Text } from '../../Input';
import { useState, useEffect, useRef } from 'react';
import { deepCloneStyle } from '../../../../../../utils/functions';
import { CreateFolder, uploadImage } from '../../../../../../service/pagepreview/Directories';

const OutlinedFormat = {
    showLabel: false,
    format: 'Outlined'
}

interface PropsType {
    actionText?: string;
    folderIndex?: number;
}

const InnerUploadModal = ({ actionText, folderIndex }:PropsType) => {

    const [ folderName, setFolderName ] = useState('');
    const [ fileName, setFileName ] = useState('');
    const [ fileData, setFileData ] = useState<File>();
    const [ fileUrl, setFileUrl ] = useState('');
    const { folderStruct, setFolderStruct } = usePushCtx();

    const handleUploadFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFolderName(e.target.value);
    }

    const handleUploadFile = (e: any) => {
        
        const selectedFile = e.target.files[0];

        if(selectedFile.type === "image/png" || selectedFile.type === "image/jpeg"){
            setFileName(selectedFile.name);
            setFileData(selectedFile);
            setFileUrl(URL.createObjectURL(selectedFile));
        }
    }
    
    const handleAction = async() => {
        if(actionText === "Add Folder"){
            const tempFolderStruct = deepCloneStyle(folderStruct);

            const folderData = {
                folderName:folderName,    
                type:'folder',
                files:[]
            }

            await CreateFolder(folderName);
            tempFolderStruct.subFolders.push(folderData);
            setFolderStruct(tempFolderStruct);
            setFolderName('');
        }

        if(actionText === "Upload File"){

            if(fileData){
                const tempFolderStruct = deepCloneStyle(folderStruct);

                const fileDetail = {
                    fileName:fileName,    
                    fileUrl:fileUrl,
                    type:'file',
                }

                if(tempFolderStruct && folderIndex !== undefined){
                    if(folderIndex === -1){
                        tempFolderStruct.files.push(fileDetail);
                    }else{
                        if(tempFolderStruct.subFolders && tempFolderStruct.subFolders[folderIndex] && tempFolderStruct.subFolders[folderIndex].files){
                            tempFolderStruct.subFolders[folderIndex].files.push(fileDetail);
                        }
                    }
                }
            
                const formData = new FormData();
                formData.append(fileName, fileData);
                await uploadImage(formData);
                setFolderStruct(tempFolderStruct);

                setFileName('');
                setFileUrl('');
                setFileData(undefined);
            }
            
        }
    }

    const handleCloseModal = () => {
        setFolderName('');
        setFileName('');
        setFileUrl('');
        setFileData(undefined);
    }

    return (
        <Fragment>
            <div className="modal fade" id="innerUploadModal" style={{color:"#000"}} tabIndex={-1} aria-labelledby="innerUploadModalLabel" aria-hidden="true" data-backdrop={false}>
                <div className="modal-dialog">
                    <div className={`${styles.innerModalContent} modal-content`}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="uploadModalLabel">{actionText}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCloseModal()}></button>
                        </div>

                        {
                            actionText === "Add Folder" &&
                            (
                                <div className="modal-body">
                                    <Text format={OutlinedFormat} label="Add Folder" defaultValue={folderName} type="text" onChange={(e:any)=>handleUploadFolder(e)}/>
                                </div>
                            )
                        }

                        {    
                            actionText === "Upload File" &&
                            (
                                <div className="modal-body">
                                    <Text format={OutlinedFormat} label="Upload File" type="file" defaultValue={''} onChange={(e:any)=>handleUploadFile(e)}/>
                                    {fileName}
                                </div>
                            )
                        }


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleCloseModal()}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleAction()}>Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default InnerUploadModal;