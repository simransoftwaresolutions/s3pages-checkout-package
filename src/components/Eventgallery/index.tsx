import {
  Box,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Slider from "react-slick";
import { IoClose } from "react-icons/io5";

const defaultGalleryData = [
  {
    img: "http://landingpages.rgenesis.com/demos/images/party_800x600_01.jpg",
    heading: "Consetetur sadipscing",
    date: "30 Dec, 2014",
  },
  {
    img: "http://landingpages.rgenesis.com/demos/images/party_800x600_02.jpg",
    heading: "Consetetur sadipscing",
    date: "30 Dec, 2014",
  },
  {
    img: "http://landingpages.rgenesis.com/demos/images/party_800x600_03.jpg",
    heading: "Consetetur sadipscing",
    date: "30 Dec, 2014",
  },
  {
    img: "http://landingpages.rgenesis.com/demos/images/party_800x600_04.jpg",
    heading: "Consetetur sadipscing",
    date: "30 Dec, 2014",
  },
  {
    img: "	http://landingpages.rgenesis.com/demos/images/party_800x600_05.jpg",
    heading: "Consetetur sadipscing",
    date: "30 Dec, 2014",
  },
  {
    img: "http://landingpages.rgenesis.com/demos/images/party_800x600_06.jpg",
    heading: "Consetetur sadipscing",
    date: "30 Dec, 2014",
  },
  {
    img: "http://landingpages.rgenesis.com/demos/images/party_800x600_07.jpg",
    heading: "Consetetur sadipscing",
    date: "30 Dec, 2014",
  },
  {
    img: "http://landingpages.rgenesis.com/demos/images/party_800x600_08.jpg",
    heading: "Consetetur sadipscing",
    date: "30 Dec, 2014",
  },
];
export default function index({GalleryData}:any) {
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleImageClick = (index: any) => {
    setSelectedImageIndex(index);
    setOpen(true);
  };
  const GalleryData1 = GalleryData ? GalleryData :defaultGalleryData
  return (
    <Box>
      <Container>
        <Box sx={{ padding: "50px 0px" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ fontWeight: "700" }}>
              Event Gallery
            </Typography>
          </Box>
          <Box sx={{ paddingTop: "40px" }}>
            <Grid container spacing={1.5}>
              {GalleryData1.map((item:any, index:any) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Box>
                    <Box className="main_card">
                      <img src={item.img} width="100%" alt="" />
                      <Box
                        className="content"
                        sx={{ position: "absolute", zIndex: "999", top: "0" }}
                      >
                        <Box sx={{ padding: "20px" }}>
                          <Box
                            onClick={() => handleImageClick(index)}
                            sx={{
                              background: "#ff6858",
                              padding: "5px",
                              fontSize: "26px",
                              display: "flex",
                              width: "fit-content",
                              color: "#fff",
                              borderRadius: "4px",
                              marginBottom: "16px",
                              ":hover": {
                                background: "#0062cc",
                              },
                            }}
                          >
                            <MdOutlineZoomOutMap />
                          </Box>
                          <Typography variant="h6" sx={{ color: "#fff" }}>
                            {item.heading}
                          </Typography>
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{ fontSize: "12px", color: "#ffffffd4" }}
                            >
                              {item.date}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen
        PaperProps={{
          sx: {
            "&.MuiPaper-root": {
              background: "#0a0a0a99",
            },
          },
        }}
      >
        <DialogContent>
          <Container maxWidth="md">
            <Box sx={{ paddingTop: "40px" }}>
              <Box sx={{ textAlign: "right" }}>
                <IconButton onClick={() => setOpen(false)}>
                  <IoClose style={{ color: "#fff", fontSize: "28px" }} />
                </IconButton>
              </Box>
              <Slider
                {...settings}
                initialSlide={selectedImageIndex}
                className="slickbottomslider1"
                beforeChange={(oldIndex, newIndex) =>
                  setSelectedImageIndex(newIndex)
                }
              >
                {GalleryData1.map((item:any, index:any) => (
                  <div key={index}>
                    <img src={item.img} width="100%" alt={item.heading} />
                  </div>
                ))}
              </Slider>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "400", color: "#fff" }}
                >
                  {selectedImageIndex + 1} of {GalleryData1.length}
                </Typography>
              </Box>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
