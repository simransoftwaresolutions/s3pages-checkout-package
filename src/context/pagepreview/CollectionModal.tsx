import {useState, useEffect, createContext, useContext} from "react"
import { GetAllCollection } from "../../service/pagepreview/CollectionService"
import { usePagesCtx } from "./PagesContext"

const CollectionContext = createContext({})

export function CollectionProvider({children}:any) {
    const [previewList, setPreviewList] = useState(true)
    const [previewListFlag, setPreviewListFlag] = useState(false)
    const [IsCreateCollectionPage, setIsCreateCollectionPage] = useState(false)
    const [deleteCollectionFlag, setDeleteCollectionFlag] = useState(false)
    const [collectionList, setCollectionList] = useState() as any
    const [selectedCollection , setSelectedCollection] = useState() as any
    const [creating, setCreating] = useState(false)
    const [listOrDisplay, setMark] = useState(true)
    const [fieldFlag, setFieldFlag] = useState('') as any
    const [ activeCollection, setActiveCollection ] = useState<number>(0);
  
    const { queryData } = usePagesCtx() as any


    useEffect(()=>{
      const fetchCollectionList =async () => {
          if(!queryData?.funnelId) return;
          const data = await GetAllCollection(queryData?.funnelId)
          setCollectionList(data?.data)
          setDeleteCollectionFlag(false)
      }
      fetchCollectionList()

      return () => {}
    },[IsCreateCollectionPage, deleteCollectionFlag])


   

  
    useEffect(()=>{
      setPreviewListFlag((prev: any)=>!prev)
  
      return () => {}
    }, [selectedCollection])


    return (
        <CollectionContext.Provider 
          value={{
            createCollection: IsCreateCollectionPage, 
            setCreateCollection: setIsCreateCollectionPage,
            collectionList,
            selectedCollection , 
            setSelectedCollection,
            setCollectionList,
            setDeleteCollectionFlag,
            creating, setCreating,
            listOrDisplay, setMark,
            previewList, setPreviewList,
            previewListFlag, setPreviewListFlag,
            fieldFlag, setFieldFlag,
            activeCollection, setActiveCollection
          }}>
            {children}
        </CollectionContext.Provider>
    )
}

export const useCollection = ()=> useContext(CollectionContext)
