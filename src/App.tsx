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
const cardData = [
  {
    img: "https://alukas.presslayouts.com/wp-content/uploads/2023/02/Blue-Stripes-Stone-Earrings-3.jpg",
    hoverimg:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/Circle-of-Light-Heart-Earrings-1.jpg",
    chiphead: "Hot",
    head: "Necklaces",
    description: "Birds of Paradise Pendant",
    price: "345",
  },
  {
    img: "https://alukas.presslayouts.com/wp-content/uploads/2023/02/Kalvesna-Diamond-Twig-Ring-1.jpg",
    hoverimg:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/Cross-of-Light-Pendant-1.jpg",
    chiphead: "20% Off",

    head: "Necklaces",
    description: "Birds of Paradise Pendant",
    price: "345",
  },
  {
    img: "https://alukas.presslayouts.com/wp-content/uploads/2023/02/Sterling-Silver-Dangles-Earrings-1-360x360.jpg",
    hoverimg:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/Birds-of-Paradise-Pendant-1.jpg",
    chiphead: "Hot",
    head: "Necklaces",
    description: "Birds of Paradise Pendant",
    price: "345",
  },
  {
    img: "https://alukas.presslayouts.com/wp-content/uploads/2023/04/Gift-360x360.jpg",
    hoverimg:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/Kalvesna-Diamond-Twig-Ring-1.jpg",
    chiphead: "Hot",
    head: "Necklaces",
    description: "Birds of Paradise Pendant",
    price: "345",
  },
  {
    img: "https://alukas.presslayouts.com/wp-content/uploads/2023/02/Kalvesna-Diamond-Twig-Ring-1.jpg",
    hoverimg:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/Cross-Stripes-Stone-Bracelet-1.jpg",
    chiphead: "Hot",
    head: "Necklaces",
    description: "Birds of Paradise Pendant",
    price: "345",
  },
  {
    img: "https://alukas.presslayouts.com/wp-content/uploads/2023/02/Blue-Stripes-Stone-Earrings-3.jpg",
    hoverimg:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/Cross-Stripes-Stone-Bracelet-1-325x325.jpg",
    chiphead: "Hot",
    head: "Necklaces",
    description: "Birds of Paradise Pendant",
    price: "345",
  },
];
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
      <SliderComponent
        slidesToShowlg={4}
        slidesToShowmd={3}
        slidesToShowsm={2}
        slidesToShowxs={1}
        cardData={cardData}
        
      />
      <PreviewPage />
    </>
  );
}
