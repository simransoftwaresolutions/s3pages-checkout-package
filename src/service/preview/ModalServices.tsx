import ENV from "../../utils/env";

export const CalendarFetcher = async({id, year, month, yearCode, data}:any)=>{
    await fetch(`${ENV.apiRoot}api/attendance/${id}`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${ENV.auth}`
            },
            body: JSON.stringify({data})
        })
}


export const addHolidayFetcher = async({holiday}:any)=>{
    await fetch(`${ENV.apiRoot}api/holidays`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${ENV.auth}`
        },
        body: JSON.stringify({date: holiday.date, title: holiday.title})
    })
}
export const addLeave = async({leave}:any)=>{
    await fetch(`${ENV.apiRoot}api/leaves`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer${ENV.auth}`
        },
        body: JSON.stringify({...leave})
    })
}
export const editHolidayFetcher = async({holiday,id}:any)=>{
    await fetch(`${ENV.apiRoot}api/holidays/${id}`,{
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${ENV.auth}`
        },
        body: JSON.stringify({...holiday})
    })
}



export const masterServiceFetch = async({setBody, data}:any)=>{
    const response = await fetch(`${ENV.apiRoot}api/settings/master?type=${data}`,{
        headers: {
            "Authorization" : `Bearer ${ENV.auth}`
        }
    })
    const resJSON = await response.json()
    setBody&&setBody(resJSON)
    return resJSON
}


export const masterService = async({data}:any)=>{
    await fetch(`${ENV.apiRoot}api/settings/master`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${ENV.auth}`
        },
        body: JSON.stringify({[data.type]: data.title})
    })
}


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




