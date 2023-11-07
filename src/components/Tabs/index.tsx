import React from "react";
import MenuButton from "./MenuButton";
import SideMenuButton from "./SideMenuButton";
import { FaBarcode, FaCartShopping } from "react-icons/fa6";
import {FaShippingFast} from "react-icons/fa"
import {MdAllInbox} from "react-icons/md"
import {SiAnalogue} from "react-icons/si"
import {RiSecurePaymentFill } from "react-icons/ri"
export default function index({ position, type, TabData }: any) {
  const defaultData = [
    {
      icon: <FaBarcode/>,
      heading: "Overview",
      image:
        "https://s3commerce.com/home/wp-content/themes/s3commerce-sass/images/macbook-overview.png",
      description:
        "Centralised command center for your business. Integrated with leading marketplaces, shopping carts, shipping providers and accounting systems.",
    },
    {
      icon: <FaCartShopping/>,
      heading: "Orders",
      image:
        "https://s3commerce.com/home/wp-content/themes/s3commerce-sass/images/macbook-overview.png",
      description:
        "Centralised command center for your business. Integrated center for your business. Integrated center for your business. Integrated with leading marketplaces, shopping carts, shipping providers and accounting systems.",
    },
    {
      icon: <FaShippingFast/>,
      heading: "Shipping",
      image:
        "https://s3commerce.com/home/wp-content/themes/s3commerce-sass/images/macbook-overview.png",
      description:
        "Centralised command center for your business. Integrated with leading marketplaces, shopping carts, shipping providers and accounting systems.",
    },
    {
      icon: <MdAllInbox/>,
      heading: "Centralized Inventory",
      image:
        "https://s3commerce.com/home/wp-content/themes/s3commerce-sass/images/macbook-overview.png",
      description:
        "Centralised command center for your business. Integrated with leading marketplaces, shopping carts, shipping providers and accounting systems.",
    },
    {
      icon: <SiAnalogue />,
      heading: "Sales Analytics",
      image:
        "https://s3commerce.com/home/wp-content/themes/s3commerce-sass/images/macbook-overview.png",
      description:
        "Centralised command center for your business. Integrated with leading marketplaces, shopping carts, shipping providers and accounting systems.",
    },
    {
      icon: <RiSecurePaymentFill />,
      heading: "Payments",
      image:
        "https://s3commerce.com/home/wp-content/themes/s3commerce-sass/images/macbook-overview.png",
      description:
        "Centralised command center for your business. Integrated with leading marketplaces, shopping carts, shipping providers and accounting systems.",
    },
  ];
  const setTabData = TabData ? TabData : defaultData;
  return (
    <div>
      {position === "left"  ? (
        <>
          <SideMenuButton
            position={position}
            type={type}
            setTabData={setTabData}
          />
        </>
      ) :position === "right"  ? (
        <>
          <SideMenuButton
            position={position}
            type={type}
            setTabData={setTabData}
          />
        </>
      ) : (
        <>
          <MenuButton position={position} type={type} setTabData={setTabData} />
        </>
      )}
    </div>
  );
}
