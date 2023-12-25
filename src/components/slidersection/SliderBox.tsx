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
    autoplay: true,
  autoplaySpeed: 0,
  speed: 3000, // Adjust speed as needed
  cssEase: 'linear',
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: true,
  arrows: false,
  pauseOnHover: false,
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
