import { CheckoutProduct } from './components/checkout';
import PreviewPage from "./components/pagepreview";
// import { getSiteInfo, getUriInfo } from './service/pagepreview/PagesServices';
// import { useState, useEffect, useRef } from "react";

export default function componentName() {

    // const [ sInfo, setSInfo ] = useState<any>([]);
    // const [ uInfo, setUInfo ] = useState<any>([]);

    // useEffect(()=>{
    //     const getNewData = async() => {
    //         const siteInfo = await getSiteInfo('www.funnelbuilder.in');
    //         if (siteInfo.status === false) {
    //           return;
    //         }
    //         setSInfo(siteInfo);
          
    //         const uriInfo = await getUriInfo(siteInfo.data._id);
    //         if(uriInfo?.status){
    //             setUInfo(uriInfo);
    //         }
    //     }
    //     getNewData();
    // }, [])

    return (
        <>
            {/* <CheckoutProduct data={{ product: {} }} /> */}
            {/* <PreviewPage siteInfo={sInfo} uriInfo={uInfo} /> */}
            <PreviewPage />
        </>
    );
}
