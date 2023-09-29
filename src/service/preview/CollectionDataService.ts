import ENV from "../../utils/env";

export const CloneCollectionData = async (id:string, name: string, slug:string) =>{
    try{
        const response = await fetch(ENV.apiRoot + `api/collectionData/${id}/clone`,{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`,
                "Content-Type" :"application/json"
            },
            body: JSON.stringify({name, slug})
        })
        const responseJSON = await response.json()

        return response.status === 200 ? responseJSON: false
    }catch(error){
        return undefined
    }
}
export const getCollectionData = async ({id}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot + `api/collectionData/all/${id}`,{
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`
            },
        })
        const responseJSON = await response.json()

        return response.status === 200 ? responseJSON: false
    }catch(error){
        return undefined
    }
}
export const getSingleCollectionData = async ({id}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot + `api/collectionData/${id}`,{
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`
            },
        })
        const responseJSON = await response.json()

        return response.status === 200 ? responseJSON: false
    }catch(error){
        return undefined
    }
}
export const createCollectionData = async ({ data}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot+`api/collectionData`,{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return response.status === 200 ? true: false
    }catch(error){
        return undefined
    }
}

export const deleteCollectionData = async ({id}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot+`api/collectionData?id=${id}`,{
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`
            },
        })

        return response.status === 200 ? true: false
    }catch(error){
        return undefined
    }
}
export const deleteCollectionDataImage = async ({key, id}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot+`api/collectionData/${id}/deleteImage?key=${key}`,{
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`
            },
        })

        return response.status === 200 ? true: false
    }catch(error){
        return undefined
    }
}

export const deleteCollectionDataImageMulti = async ({key, id, index}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot+`api/collectionData/${id}/deleteImage/multi/${index}?key=${key}`,{
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`
            },
        })

        return response.status === 200 ? true: false
    }catch(error){
        return undefined
    }
}
export const deleteS3Image = async ({list}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot+`api/collectionData/deleteS3Image`,{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({keys: list})
        })

        return response.status === 200 ? true: false
    }catch(error){
        return undefined
    }
}
export const updateCollectionData = async ({id, data}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot+`api/collectionData/${id}`,{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return response.status === 200 ? true: false
    }catch(error){
        return undefined
    }
}
export const publishCollectionData = async ({id, data}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot+`api/collectionData/${id}/publish`,{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return response.status === 200 ? true: false
    }catch(error){
        return undefined
    }
}


export const UploadCollectionData = async (data:any) =>{
    try{
        const response = await fetch(ENV.apiRoot+`api/files`,{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`
            },
            body: data
        })
        const responseJSON = await response.json()
        return response.status === 200 ? responseJSON: false
    }catch(error){
        return undefined
    }
}