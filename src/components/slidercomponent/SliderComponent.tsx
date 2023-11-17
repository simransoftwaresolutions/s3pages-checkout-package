import { Box } from '@mui/material';
import React from 'react'
import MainCard from './MainCard';
import Slider from "react-slick";
const cardData = [
    {
      id: "",
    },
    {
      id: "",
    },
    {
      id: "",
    },
    {
      id: "",
    },
    {
      id: "",
    },
    {
      id: "",
    },
  ];
export default function SliderComponent() {
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        // autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              arrows: true,
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: true,
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              arrows: true,
              slidesToShow: 1,
              dots: true,
            },
          },
        ],
      };
  return (
    <div>
        <Slider {...settings} className="slickbottomslider">
            {cardData.map((item, index) => (
              <Box key={index} p={1}>
                <MainCard/>
              </Box>
            ))}
          </Slider>
    </div>
  )
}
