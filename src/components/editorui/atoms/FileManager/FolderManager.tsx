import {useEffect, useState} from "react"
import { AddFolder, FetchFolders } from "../../../../service/editorui/ModalServices";
import { DocumentUpload } from "./DocumentUpload";
import { FolderDelete } from "../../../../service/editorui/ModalServices"; 
// import Swal from 'sweetalert2'
import { deleteFile, renameFileService } from "../../../../service/editorui/FolderServices";
import styles from "../../../../styles/editorui/FileManager.module.css"
// import styles from "../../../../../../styles/componentsettings/FileManager.module.css"
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SubdirectoryArrowRightOutlinedIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ENV from '../../../../utils/env';
import { toast } from 'react-toastify';
import { usePushCtx } from "../../../../context/editorui/PushContext";

const FolderManager = ({ setImagePath,  titleNeed, setPopup, openModal,openFileManagerModal}:any) => {
    const [body, setBody] = useState([])as any;
    const [newFolderFlag, setNewFolderFlag] = useState(false)as any;
    const [newFolder, setNewFolder] = useState("") as any
    const [folderId, setFolderId] = useState([])as any;
    const [searchType, setSearchType] = useState("") as any
    const [searchData, setSearchData] = useState() as any
    const [selectedBody, setSelectedBody] = useState(body[0])as any
    const [handleRenmae, setHandleRename] = useState(false) as any
    const [bread, setBread] = useState() as any
    const { setIsProcessing } = usePushCtx();
    const [renameFile, setRenameFile] = useState({
        id: "",
        name: ""
    }) as any


        // fetch folders list from server at initial render or load
        useEffect(()=>{
            FetchFolders({setBody})
    
            return () => {}
        },[])


        // search text | return files
        useEffect(()=>{
            if(folderId !== undefined){
                const files = selectedBody&&selectedBody.files.filter((item:any)=>(
                    item.name.toLowerCase().includes(searchType.toLowerCase())
                    ))
                    setSearchData(files)
                }
        },[searchType])

  
        // set Breadcumb 
        useEffect(()=>{
            if(selectedBody!==undefined){

                if(selectedBody.parent.length === 0){
                    setBread(selectedBody.name)
                }else{

                    const filter = body.filter((item:any)=>(
                        item._id === selectedBody.parent[0]
                        ))
                        setBread(`${filter[0].name}-${selectedBody.name}`)
                    }
                }
        },[selectedBody])
    

        // return folder list 
        const foldersList = body.filter((item:any)=>{
            return item.parent.length === 0
        })

        // handle to rename a file
        const RenameFile = async() => {
            setHandleRename(false)

            setIsProcessing(true);

            await renameFileService({data:renameFile})

            toast.success("Rename file successfully.");
            setIsProcessing(false);

            setTimeout(()=>{
                FetchFolders({setBody})
            },1000)
        }


        useEffect(()=>{
            const handleReload = () =>{ 
                const filterdata = body.filter((item:any)=>{
                    return item._id === folderId
                })
                setSelectedBody(filterdata[0])
            }
            handleReload()
        },[body])

        const handleAddNewFolder = async()=>{
            
            setIsProcessing(true);
            
            const response = await AddFolder({folder: newFolder, folderId})
            if(response !== true){
                toast.error(response)
                return 
            }
            toast.success("Add folder successfully.");
            setIsProcessing(false);

            setTimeout(()=>{
              FetchFolders({setBody})
            },1000)
        }


  return (
    <div className={styles.fileManagerMainContainer}>
 
     

        {/*main header of file manager*/}
        
        <div className="d-flex w-100 justify-content-between align-items-center">
            
            {titleNeed !== false? <h1 className="text-primary fs-5">File Manager</h1>:""}

            <div className="setSearchbarBox">
                <div className="row">
                    <div className="col-md-7 breadcrumbSetting">
                         <div className=" d-flex align-items-center">
                            <img className="" src={`${ENV.serverPath}images/folderimg/folderClose.png`} width={15} height={13} alt="logo"/>
                            <nav aria-label="breadcrumb ml-3">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">Home</li>
                                    <li className="breadcrumb-item active" aria-current="page">{bread}</li>
                                </ol>
                            </nav>
                            </div>
                    </div>
                    <div className="col-md-5 px-0 mx-0">
                    <div className="searchIconBox">
                            <div className ='search-box'>
                                <input className="search-text" type="text" onChange={(e)=>setSearchType(e.target.value)} placeholder="Search file by name"/>
                                {/* <input className="" type="text" placeholder = "Search Anything"> */}
                                <a href="#" className ="search-btn">
                                <SearchOutlinedIcon  fontSize="medium"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <SearchOutlinedIcon  fontSize="medium"/>
                <input className="bg-light border-0" type="text" onChange={(e)=>setSearchType(e.target.value)} placeholder="Search file by name"/> */}
            </div>
        </div>


        {/* main body of file manager */}
        <div className="row bg-light w-100 mainTopImgRow">

            {/* left part of file manager */}
            <div className="col-md-4 col-lg-4 col-xl-4 imageBoxLeftSide">
               
                {
                    foldersList.map((item:any, index:number)=>{
                        return (
                            <FolderList 
                                key={`folder1${index}`}
                                index={index} 
                                setSearchType={setSearchType} 
                                setBody={setBody} 
                                setSearchData={setSearchData}   
                                setSelectedBody={setSelectedBody} 
                                item={item}  
                                title={item.name} 
                                id={item._id}  
                                setFolderId={setFolderId} 
                            />)
                    })
                }
                 <div className= {styles.addNewFolderInput}>
                    {/* <div className="d-flex justify-content-end border-bottom mb-2" onClick={()=>setNewFolderFlag((prev:any)=>!prev)}>
                        <div className={`d-flex`} >
                            <p className="mr-2 fs-6 text-secondary "> Add New Folder</p>
                            <CreateNewFolderOutlinedIcon fontSize="medium"/>
                        </div>
                    </div> */}
                    {/* <div className={`row mb-2 d-flex ${newFolderFlag ? "d-block" : "d-none"}`} > */}

                    <div className={`row d-flex`} >
                        <div className="col-md-10">
                            <input value={newFolder} onChange={(e:any)=>setNewFolder(e.target.value)} className="bg-light text-secondary border w-100" type="text" placeholder="Enter folder name"/>
                        </div>
                        <div className="col-md-2 p-0 ">
                            <AddCircleOutlinedIcon fontSize="medium" onClick={()=>handleAddNewFolder()} />
                        </div>
                    </div>
                </div>
            </div>
            

            {/* right part of fileManager*/}
            <div className="col-md-8 col-lg-8 col-xl-8 imageBoxLeftRight">

                {/* body header */}
                <div className="d-flex justify-content-between">

                    {/* <div className=" d-flex align-items-center">
                    
                        <img className="mb-3" src={`${ENV.serverPath}images/folderimg/folderClose.png`} width={15} height={13} alt="logo"/>
                        <nav aria-label="breadcrumb ml-3">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">Home</li>
                                <li className="breadcrumb-item active" aria-current="page">{bread}</li>
                            </ol>
                        </nav>
                    </div> */}

                    {/* Open pop-up for image selection
                    {openFileManagerModal && 
                        <i className="bi bi-info-circle" onClick={()=>setPopup(true)} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    } */}
                  
                </div>


                {/* folder body */}
                <div className="imageInnerContent">

                    {selectedBody!== undefined ? 
                    <div className="d-flex flex-wrap">
                        {
                            (searchData === undefined ||  searchType.length === 0)? selectedBody&&selectedBody.files.map((item:any, index:number)=>{
                                return(
                                    <FilesList
                                        key={`file1${index}`} 
                                        index={index} 
                                        openModal={openModal} 
                                        setImagePath={setImagePath} 
                                        body={body}
                                        setSearchData={setSelectedBody} 
                                        searchData= {selectedBody} 
                                        setBody={setBody} 
                                        item={item} 
                                        setHandleRename={setHandleRename} 
                                        renameFile={renameFile} 
                                        setRenameFile={setRenameFile} 
                                    />
                                    )
                                    
                                }): searchData.map((item:any, index:number)=>{
                                return(
                                    <FilesList
                                        key={`file2${index}`}  
                                        index={index} 
                                        openModal={openModal} 
                                        setImagePath={setImagePath}
                                        body={body} 
                                        setSearchData={setSelectedBody} 
                                        searchData= {selectedBody} 
                                        setBody={setBody} 
                                        item={item} 
                                        setHandleRename={setHandleRename} 
                                        renameFile={renameFile} 
                                        setRenameFile={setRenameFile} 
                                    />
                                    )
                            })
                        }
                    </div>: <p className=" text-secondary m-3 ">Please Select a folder</p>}


                        {handleRenmae? 
                            <div className="bg-light my-3 row">
                                <input 
                                    value={renameFile.name} 
                                    onChange={(e)=>setRenameFile({...renameFile, name: e.target.value})} 
                                    // onBlur={()=>setHandleRename(false)}
                                    type="text" 
                                    className="bg-light shadow-sm border-0 text-secondary px-3 py-1 col"
                                    placeholder="Enter new name..."
                                />
                                <button className="btn btn-primary col-2" onClick={()=>RenameFile()}>Save</button>
                            </div>:
                            <>
                                {selectedBody !== undefined && 
                                <div className=" mt-5 docUplod">
                                    <DocumentUpload type = "files" folderId={folderId} setBody={setBody}/>
                                </div>}
                            </>
                        }
                </div>
            </div>
        </div>

        
    </div>
  );
}



const FolderList = ({title,setSearchData,setSearchType,setBody, id,item,setFolderId, style,setSelectedBody, index}:any) => {

    const { setIsProcessing } = usePushCtx();
    const handleDelete = async({id}:any) => {

        setIsProcessing(true);
        await FolderDelete({id});
        toast.success("Folder deleted successfully.");
        setIsProcessing(false);
        setTimeout(()=>{
            FetchFolders({setBody}).then((doc)=>{
                const filterdata = doc.filter((item:any)=>{
                    return item._id === id
                })
                
                setSelectedBody(filterdata[0])
            })
        
        },1000) 

        
    }

    const handleClick = () => {
        setSearchType("")
        setFolderId(id)
        setSelectedBody(item)
        setSearchData([])
    }

    return(
            <div onClick={()=>handleClick()} style={style} key={index}>
                <div className="d-flex justify-content-between addHoverCls">

                
                <div className="d-flex align-items-center folderIconColor">
                    <FolderIcon fontSize="medium" />
                    <p className="ml-3 text-secondary fs-6 text-break pl-3"> {title}</p>
                </div>
                   <DeleteOutlineOutlinedIcon fontSize="medium" onClick={()=>handleDelete({id: item._id})} style={{cursor: "pointer", color: "#e01818"}} />
                </div>
            </div>
)}


const FilesList = ({setImagePath, setSearchData, searchData, setHandleRename,setRenameFile, setBody, item, index}:any)=>{
    
    const { setIsProcessing } = usePushCtx();

    let defaultImage = defaultImageProvider({title: item.name})


    const handleDelete = async({id, key}:any) =>{

        setIsProcessing(true);
        await deleteFile({id, key});
        toast.success("File deleted successfully.");
        setIsProcessing(false);
        setTimeout(()=>{
            FetchFolders({setBody}).then((doc)=>{
                const filterdata = doc.filter((item:any)=>{
                    return item._id === searchData._id
                })
                
                setSearchData(filterdata[0])
            })
            
        },1000)

        
       
    }

    const handleEdit = (e:any) => {
        setHandleRename(true)
        setRenameFile({name: item.name.split(".")[0], id: item.key})
    }

    const image_name = item?.name?.split(".")
    const imageType = image_name[1] === "png" ||image_name[1] === "jpg" ||image_name[1] === "jpeg" ||image_name[1] === "gif" ||image_name[1] === "ico" || image_name[1] === "PNG" ||image_name[1] === "JPG" ||image_name[1] === "JPEG" 
    

    const url = image_name!==undefined && imageType ? `https://d105z293na9jky.cloudfront.net/${item.key}`:defaultImage
    return(
        <div className={styles.FolderImage} key={index}>
                <div className={styles.dataToolTip}>
                    <div className="btn-group mr-2 shadow-sm" role="group" aria-label="First group">
                        <button type="button" className="btn btn-light">
                            <a href={`https://d105z293na9jky.cloudfront.net/${item.key}`} target="_blank" >
                                <VisibilityIcon fontSize="medium" />
                            </a>
                        </button>
                        <button type="button" className="btn btn-light" onClick={(e)=>handleEdit(e)}>
                            <BorderColorIcon fontSize="medium" />
                        </button>
                        {/* <button type="button" className="btn btn-light">
                            <a download href={`https://d105z293na9jky.cloudfront.net/${item.key}`} target="_blank" >
                                <i className="bi bi-download"></i>
                            </a>
                        </button> */}
                        
                        <button type="button" className="btn btn-light"  onClick={()=>handleDelete({id: item._id, key: item.key})}>
                            <DeleteOutlineOutlinedIcon fontSize="medium" />
                        </button>
                    </div>
                </div>

                    <div className="imageSetting" onClick={()=>{
                        if(setImagePath !== undefined){
                            setImagePath(`https://d105z293na9jky.cloudfront.net/${item.key}`)
                        }
                    }}>{
                        setImagePath!==undefined ? 
                        <>
                            <img src={url} width={100} height={100} alt="logo" data-bs-dismiss="modal" aria-label="Close"/>
                            
                        </>
                        :
                        <>
                            <img src={url} width={100} height={100} alt="logo"/>
                            <p className={styles.folderImageTitle}>{item.name}</p>
                        </>
                    }
                    </div>
                    <p className={styles.folderImageTitle}>{item.name}</p>
            </div>

)}



const defaultImageProvider = ({title}:any) => {

    const checkFileType = ( str:any) => (
        title.split(".")[title.split(".").length-1].includes(str)
    )
        
    if(checkFileType("pdf")){
        return `${ENV.serverPath}images/folderimg/pdf.png`
    }else if(checkFileType("json")){
        return `${ENV.serverPath}images/folderimg/nojson.jpg`
    }else if(checkFileType("png") || checkFileType("jpg") || checkFileType("jpeg") || checkFileType("gif") || checkFileType("svg") || checkFileType("ico")){
        return `${ENV.serverPath}images/folderimg/noimageP.png`
    }else if(checkFileType("webm") || checkFileType("mp4")|| checkFileType("mpg")|| checkFileType("mpeg")|| checkFileType("m4p")|| checkFileType("m4v")){
        return `${ENV.serverPath}images/folderimg/novideo.png`
    }else if(checkFileType("docx")){
        return `${ENV.serverPath}images/folderimg/noword.png`
    }else if(checkFileType("ppt") || checkFileType("pptx")){
        return `${ENV.serverPath}images/folderimg/noppt.png`
    }else if(checkFileType("css")){
        return `${ENV.serverPath}images/folderimg/nocss.png`
    }else if(checkFileType("csv")){
        return `${ENV.serverPath}images/folderimg/nocsv.png`
    }else if (checkFileType("xlsx")){
        return `${ENV.serverPath}images/folderimg/noxls.png`
    }else if(checkFileType("html")){
        return `${ENV.serverPath}images/folderimg/nohtml.png`
    }else {
        return `${ENV.serverPath}images/folderimg/notxt.png`
    }
}

export default FolderManager;