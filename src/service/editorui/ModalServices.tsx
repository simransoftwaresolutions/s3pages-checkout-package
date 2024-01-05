import ENV from "../../utils/env";

export const AddFolder = async({folder, folderId}:any)=>{

    const response = await fetch(`${ENV.apiRoot}api/folders`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${ENV.auth}`
        },
        body: JSON.stringify({folderName:folder, folderId})
    })

    return response.status === 201 ? true: "Please provide valid folder name"
}


export const uploadFileToFolder = async({file, folderId}:any)=>{

    const response = await fetch(`${ENV.apiRoot}api/files/folder/${folderId}`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${ENV.auth}`
        },
        body: JSON.stringify({file})

    })
    if(response.status === 200){
        return 1
    }

}


export const FetchFolders = async({setBody}:any)=>{
    const response = await fetch(`${ENV.apiRoot}api/folders`,{
        headers: {
            "Authorization" : `Bearer ${ENV.auth}`
        },
    })

    if(response.status === 200){
        const data = await response.json()
        setBody(data.data)

        return data.data
    }
    return 0
}
export const FolderDelete = async({id}:any)=>{
    const response = await fetch(`${ENV.apiRoot}api/folders/${id}`,{
        method: "DELETE",
        headers: {
            "Authorization" : `Bearer ${ENV.auth}`
        },
    })

    if(response.status === 200){
        return  await response.json()
    }
}




