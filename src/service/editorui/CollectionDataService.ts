import ENV from "../../utils/env";

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
