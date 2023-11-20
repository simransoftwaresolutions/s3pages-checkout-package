import { Box } from "@mui/material";
import React from "react";
import MainCard from "./MainCard";
import Slider from "react-slick";
const defaultCardData = [
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
    chiphead: "Hot",
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
export default function SliderComponent({
  slidesToShowlg = 4,
  slidesToShowmd = 3,
  slidesToShowsm = 2,
  slidesToShowxs = 1,
  cardData,
}: any) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    // autoplay: true,
    slidesToShow: slidesToShowlg,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          arrows: true,
          slidesToShow: slidesToShowmd,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: slidesToShowsm,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          slidesToShow: slidesToShowxs,
          dots: true,
        },
      },
    ],
  };
  const cardData1 = cardData ? cardData : defaultCardData;
  return (
    <div>
      <Slider {...settings} className="slickbottomslider">
        {cardData1.map((item: any, index: any) => (
          <Box key={index} p={1}>
            <MainCard item={item} />
          </Box>
        ))}
      </Slider>
    </div>
  );
}
