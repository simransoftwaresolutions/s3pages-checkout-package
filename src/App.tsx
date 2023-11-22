import { CheckoutProduct } from "./components/checkout";
import PreviewPage from "./components/pagepreview";
// import { getSiteInfo, getUriInfo } from './service/pagepreview/PagesServices';
// import { useState, useEffect, useRef } from "react";
import "./styles/pagepreview/custom.css";
import "./styles/pagepreview/globals.css";
import "./styles/pagepreview/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Tabs from "./components/Tabs/index";
import SliderComponent from "../src/components/slidercomponent/index";
import Ourachievement from "./components/ourachievements/index"
import Eventgallery from "./components/Eventgallery/index"

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
      {/* <Tabs  position="left" type="arrow"  /> */}
      {/* <SliderComponent
        slidesToShowlg={4}
        slidesToShowmd={3}
        slidesToShowsm={2}
        slidesToShowxs={1}
        cardData={cardData}
        
      /> */}
      {/* <Ourachievement /> */}
      <Eventgallery />
      <PreviewPage />
    </>
  );
}
