import {useState, useEffect, createContext, useContext} from "react"
import {getCollectionData, getSingleCollectionData} from "../../service/pagepreview/CollectionDataService"
import { useCollection } from "./CollectionModal"
const CollectionContext = createContext({})

export function CollectionDataProvider({children}:any) {
    const {
        selectedCollection,
        previewListFlag,
      } = useCollection() as any

    const [selectedCollectionData, setSelectedCollectionData] = useState() as any
    const [flag, setFlag] = useState(false) as any 
    const [data, setData] = useState() as any
    const [selectedCollectionDataValid, setSelectedCollectionDataValid] = useState(selectedCollectionData?.data)
    const [selectedCollectionDataValidFlag, setSelectedCollectionDataValidFlag] = useState()
    const [collectionDataList, setCollectionDataList] = useState([]) as any
    const [errList, setErrList] = useState([]) as any

    const id = selectedCollection?._id
        
    useEffect(()=>{
        if(selectedCollection !== undefined){

            const request = async () => {
                const data = await getCollectionData({id})
                setData(data)
                setSelectedCollectionData(data)
                setCollectionDataList(data?.data)
                const list = data?.data?.fields?.map((item:any)=>{
                    return item?.required ? true: false
                })
                setErrList(list)
            }
            request()
        }
        
        return () => {}
    },[previewListFlag, flag])



    useEffect(()=>{
        if(selectedCollection !== undefined){

            const request = async () => {
                const data = await getSingleCollectionData({id: selectedCollectionData._id})
                setSelectedCollectionDataValid(data?.data)
                const list = data?.data?.fields?.map((item:any)=>{
                    return item?.required ? true: false
                })
                setErrList(list)
            }
            request()
        }
        
        return () => {}
    },[selectedCollectionDataValidFlag])


        if(selectedCollection !== undefined && selectedCollectionData===undefined){

            const request = async () => {
                const data = await getCollectionData({id})
                setData(data)
                setSelectedCollectionData(data)
                setCollectionDataList(data?.data)
                const list = data?.data?.fields?.map((item:any)=>{
                    return item?.required ? true: false
                })
                setErrList(list)
            }
            request()
        }
        
    return (
        <CollectionContext.Provider 
          value={{
            selectedCollectionDataValidFlag, setSelectedCollectionDataValidFlag,
            selectedCollectionDataValid, setSelectedCollectionDataValid,
            selectedCollectionData, setSelectedCollectionData,
            flag, setFlag, data, setData,
            collectionDataList, setCollectionDataList,
            errList, setErrList
          }}>
            {children}
        </CollectionContext.Provider>
    )
}

export const useCollectionData = ()=> useContext(CollectionContext)

const SettingContext = createContext({}) as any 

export function SettingProvider({children}:any) {
    const [fieldType, setFieldType] = useState("")
    const [activeHoverField, setActiveHoverField] = useState() as any
    const [fields, setFields] = useState()as any
    const [isEmpty, setIsEmpty] = useState(false) as any
  

    return (
        <SettingContext.Provider 
            value={{
                activeHoverField, 
                setActiveHoverField, 
                fields, setFields,
                fieldType, setFieldType,
                isEmpty, setIsEmpty,
            }}>
            {children}
        </SettingContext.Provider>
    )
}

export const useSetting = () => useContext(SettingContext)