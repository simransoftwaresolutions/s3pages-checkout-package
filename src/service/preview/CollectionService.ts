import ENV from "../../utils/env";

export const GetAllCollection = async (siteId:any) =>{
    try{
        const response = await fetch(ENV.apiRoot + `api/collection?site=${siteId}`,{
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
export const ViewCollection = async ({ id}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot + `api/collection/${id}`,{
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
export const AddCollection = async (data:any) =>{
    try{
        const response = await fetch(ENV.apiRoot+'api/collection',{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseJSON = await response.json()

        return response.status === 200 ? responseJSON: (responseJSON?.error?.message ?? responseJSON?.errors?.msg ?? responseJSON?.data?.message?? responseJSON?.data?.msg)
            
    }catch(error){
        return undefined
    }
}


export const UpdateCollection = async ({data, id}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot+`api/collection/${id}`,{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })

        return response.status === 200 ? true: false
    }catch(error){
        return undefined
    }
}

export const DeleteCollection = async ({id, site}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot+`api/collection/${id}`,{
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`,
                "Content-Type" :"application/json"
            },
            body: JSON.stringify({site})
        })

        return response.status === 200 ? true: false
    }catch(error){
        return undefined
    }
}
export const AddField = async ({type, id}:any) =>{

    try{
        const response = await fetch(ENV.apiRoot+`api/collection/${id}/fields`,{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({fields: [{type}]})
        })
        const responseJSON = await response.json()

        return response.status === 200 ? responseJSON.collection: false
    }catch(error){
        return undefined
    }
}
export const AddFieldAtDefault = async ({type, id, site}:any) =>{

    try{
        const response = await fetch(ENV.apiRoot+`api/collection/${id}/fields`,{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({fields: type, site:site})
        })
        const responseJSON = await response.json()

        return response.status === 200 ? responseJSON.collection: false
    }catch(error){
        return undefined
    }
}


export const DeleteField = async ({type, id}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot+`api/collection/${id}/field?name=${type}`,{
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
export const UpdateField = async ({data, id}:any) =>{
    try{
        const response = await fetch(ENV.apiRoot+`api/collection/${id}/fieldUpdate`,{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${ENV.auth}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({fields: [data]})
        })

        const responseJSON = await response.json()
        return response.status === 200 ? responseJSON.fields: false
    }catch(error){
        return undefined
    }
}