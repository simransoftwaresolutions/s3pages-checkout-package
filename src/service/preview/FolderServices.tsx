import ENV from "../../utils/env";

export async function deleteFile({ id, key}:any) {
  await fetch(`${ENV.apiRoot}api/files/${id}`,{
      method: "DELETE",
      headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${ENV.auth}`
      },
      body: JSON.stringify({key})

  })
  return 1
}


export async function renameFileService({data}:any) {
  await fetch(`${ENV.apiRoot}api/files/${data.id}/rename`,{
      method: "POST",
      headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${ENV.auth}`
      },
      body: JSON.stringify({name: data.name})
  })
  return 1
}





export const exportMultipleDocs = async ({form_data}:any)=>{
    try{
      const res = await fetch(`${ENV.apiRoot}api/files/multi`,{
          method: 'POST',
          headers:{
            "Authorization": `Bearer ${ENV.auth}`
          },
          body: form_data
        },
      )
  
      return await res.json()
  
    }catch(error){
      console.log("error", error)
    }
}
