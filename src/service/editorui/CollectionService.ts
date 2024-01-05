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