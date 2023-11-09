import styles from './UrlAtom.module.css';
import { Radio, Text, Select } from "../../Input";
import { useState, useEffect, useRef } from 'react';
import { usePagesCtx } from '../../../../../../context/pagepreview/PagesContext';
import { useContentCtx } from '../../../../../../context/pagepreview/ContentsContext';

interface UrlAtomProps {
    urlTypeVal:string,
    menuUrlVal:string,
    label?:string,
    getUrl:(url:string)=>void,
    getUrlType:(urlType:string)=>void
}

const UrlAtom = ({
        urlTypeVal,
        menuUrlVal,
        label="URL",
        getUrl,
        getUrlType,
        }:UrlAtomProps
    ) => {

    const [ urlType, setUrlType ] = useState<string>("internal");
    const [ menuUrl, setMenuUrl ] = useState<string>("");
    const [ isLoaded, setIsLoaded ] = useState<boolean>(false);
    const [ internalUrls, setInternalUrls ] = useState<any[]>([]);
    const { funnelPages } = usePagesCtx();
    const intUrlRef = useRef<any>(null);
    const { changeStyleOfElement } = useContentCtx();

    useEffect(()=>{

        if(isLoaded) return;
        setUrlType(urlTypeVal);
        setMenuUrl(menuUrlVal || "");

        const _intUrls = [{
            key:"",
            label:"Select Internal URLs"
        }];
        for(let i=0; i<funnelPages?.length; i++){
            _intUrls.push({
                key:funnelPages[i]?.pageData?.id,
                label:funnelPages[i]?.pageData?.title
            });
        }
        setInternalUrls(_intUrls);
    }, [urlTypeVal, menuUrlVal, isLoaded])

    useEffect(()=>{
        setIsLoaded(false);
    }, [changeStyleOfElement])

    useEffect(()=>{
        if(intUrlRef?.current) intUrlRef.current.value = menuUrlVal;
    }, [intUrlRef?.current, internalUrls])

    const handleRadioChange = (event:any) => {
        setUrlType(event.target.value);
        getUrlType(event.target.value);
        setIsLoaded(true);
    }

    const handleMenuUrl = (event:any) => {
        setMenuUrl(event.target.value);
        getUrl(event.target.value);
        setIsLoaded(true);
    }

    return (
        <div>

            <div>
                <span className={styles.fisrtRadioBtn}>
                    <Radio 
                        checked={urlType === "internal"} 
                        defaultValue="internal" 
                        label="Internal" 
                        onChange={(e:any)=>{handleRadioChange(e);setMenuUrl("")}}
                    />
                </span>
                <span>
                    <Radio 
                        checked={urlType === "external"} 
                        defaultValue="external" 
                        label="External"
                        onChange={(e:any)=>{handleRadioChange(e);setMenuUrl("")}}
                    />
                </span>
            </div>

            <div>
                {
                    urlType === "internal" &&
                    <Select selRef={intUrlRef} label={label || "URL"} items={internalUrls} onChange={handleMenuUrl} />
                }
                {
                    urlType === "external" &&
                    <Text label={label || "URL"} defaultValue={menuUrl ? menuUrl : ""} type="text" onChange={handleMenuUrl} />
                }
                {
                    urlType !== "internal" && urlType !== "external" && ("Select Internal/External for URL")
                }
            </div>
            
        </div>
    )
}

export default UrlAtom;