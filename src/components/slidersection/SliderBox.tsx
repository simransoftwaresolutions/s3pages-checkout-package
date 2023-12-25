import { Box, Typography } from "@mui/material";

import Slider from "react-slick";
const data = [
  {
    img: "https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg",
    head: "Automotive",
  },
  {
    img: "https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg",
    head: "Automotive",
  },
  {
    img: "https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg",
    head: "Automotive",
  },
  {
    img: "https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg",
    head: "Automotive",
  },
  {
    img: "https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg",
    head: "Automotive",
  },
  {
    img: "https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg",
    head: "Automotive",
  },
  {
    img: "https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg",
    head: "Automotive",
  },
  {
    img: "https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg",
    head: "Automotive",
  },
];
export default function SliderBox({
  slidesToShowlg = 6,
  slidesToShowmd = 5,
  slidesToShowsm = 4,
  slidesToShowxs = 3,
  
}: any) {
  const settings = {
    dots: false,
    infinite: true,
    speed:2000, // Set speed to 0 to disable slide transition animation
    autoplay: true,
    autoplaySpeed: 0, // Set autoplay speed to 0 for continuous scrolling
    cssEase: 'linear', // Adjust the speed (in milliseconds) between slide transitions
    pauseOnHover: false, // Pause autoplay on hover

    slidesToShow: slidesToShowlg,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          arrows: false,
          slidesToShow: slidesToShowmd,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: slidesToShowsm,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: slidesToShowxs,
          dots: false,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings} className="slickbottomslider">
        {data.map((item: any, index: any) => (
            <Box sx={{padding:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>

                <img src={item?.img} alt="" />
                <Box sx={{textAlign:"center",paddingTop:"10px",paddingLeft:"10px"}}>

                <Typography variant="h6">{item?.head}</Typography>
                </Box>
            </Box>
        ))}
      </Slider>
    </div>
  );
}
