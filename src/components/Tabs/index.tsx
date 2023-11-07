import React from "react";
import MenuButton from "./MenuButton";
import SideMenuButton from "./SideMenuButton";

export default function index({ position, type, TabData }: any) {
  const defaultData = [
    {
      icon: "fa-solid fa-barcode",
      heading: "Overview",
      image:
        "https://s3commerce.com/home/wp-content/themes/s3commerce-sass/images/macbook-overview.png",
      description:
        "Centralised command center for your business. Integrated with leading marketplaces, shopping carts, shipping providers and accounting systems.",
    },
    {
      icon: "fa-solid fa-cart-shopping",
      heading: "Orders",
      image:
        "https://s3commerce.com/home/wp-content/themes/s3commerce-sass/images/macbook-overview.png",
      description:
        "Centralised command center for your business. Integrated center for your business. Integrated center for your business. Integrated with leading marketplaces, shopping carts, shipping providers and accounting systems.",
    },
    {
      icon: "fa-solid fa-truck-fast",
      heading: "Shipping",
      image:
        "https://s3commerce.com/home/wp-content/themes/s3commerce-sass/images/macbook-overview.png",
      description:
        "Centralised command center for your business. Integrated with leading marketplaces, shopping carts, shipping providers and accounting systems.",
    },
    {
      icon: "fa-solid fa-boxes-stacked",
      heading: "Centralized Inventory",
      image:
        "https://s3commerce.com/home/wp-content/themes/s3commerce-sass/images/macbook-overview.png",
      description:
        "Centralised command center for your business. Integrated with leading marketplaces, shopping carts, shipping providers and accounting systems.",
    },
    {
      icon: "fa-solid fa-chart-line",
      heading: "Sales Analytics",
      image:
        "https://s3commerce.com/home/wp-content/themes/s3commerce-sass/images/macbook-overview.png",
      description:
        "Centralised command center for your business. Integrated with leading marketplaces, shopping carts, shipping providers and accounting systems.",
    },
    {
      icon: "fa-solid fa-hand-holding-dollar",
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
