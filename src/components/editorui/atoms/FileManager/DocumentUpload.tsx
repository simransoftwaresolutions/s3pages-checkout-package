import { exportMultipleDocs } from "../../../../service/editorui/FolderServices"
import { FetchFolders, uploadFileToFolder } from "../../../../service/editorui/ModalServices"
import { toast } from 'react-toastify';
import { usePushCtx } from "../../../../context/editorui/PushContext";
import Swal from "sweetalert2";
// import Swal from "sweetalert2"

export const DocumentUpload = ({type, folderId, saveData, setBody}:any) => {

    const { setIsProcessing } = usePushCtx();
    const handleChange = async (e:any) => {
        const label = e.target.previousSibling ? e.target.previousSibling.innerText : "files"
        const updatedLabel = label?.toString().toLowerCase().split(" ").join("_")
        
        if(e.target.files){

            var formData = new FormData();
            for (const key of Object.keys(e.target.files)) {
                formData.append('file', e.target.files[key])
            }
            // save data in files module
            try{
                setIsProcessing(true);
                const data = await exportMultipleDocs({label: updatedLabel, form_data: formData})
            
                if(type === "files"){
                    
                    if (data !==undefined && data.data !== undefined){
                        uploadFileToFolder({file: data.data[0] ? data.data[0]._id  : data.data._id, folderId})
                    }
                    setTimeout(()=>{
                        FetchFolders({setBody})
                        toast.success("Upload file successfully.");
                        setIsProcessing(false);
                    },2000)
                
                }

              
        
                // updateFile({file: data.data[0]._id, label: updatedLabel})
                
            }
            catch(error){
                Swal.fire(
                    'Stop',
                    'Please provide valid file type',
                    'error'
                  )
            }
            
        }
    }
  
    return(
        <input type="file" multiple onChange={(e)=>handleChange(e)}/>
    )
  }