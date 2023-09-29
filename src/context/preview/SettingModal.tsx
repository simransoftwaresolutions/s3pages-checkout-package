import {useState, useEffect, createContext, useContext} from "react"
import {getCollectionData} from "../../service/preview/CollectionDataService"
import { useCollection } from "./CollectionModal"
const CollectionContext = createContext({})

const SettingContext = createContext({}) as any 

export function SettingProvider({children}:any) {
    const [fieldType, setFieldType] = useState<any>("")
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
                isEmpty, setIsEmpty
            }}>
            {children}
        </SettingContext.Provider>
    )
}

export const useSetting = () => useContext(SettingContext)