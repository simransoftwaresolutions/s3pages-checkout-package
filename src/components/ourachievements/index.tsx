import { Box, Container, Grid, Typography } from "@mui/material";
import { BiUser } from "react-icons/bi";
import { IoLayersOutline } from "react-icons/io5";
import { LuAlarmClock } from "react-icons/lu";
import { PiPencilLineLight } from "react-icons/pi";

const deafultcardData = [
  {
    id: "1",
    icon: <BiUser />,
    heading: "Happy Clients",
    unit: "2,140",
  },
  {
    id: "2",
    icon: <IoLayersOutline />,
    heading: "Projects Completed",
    unit: "2,580",
  },
  {
    id: "3",
    icon: <LuAlarmClock />,
    heading: "Hours Worked",
    unit: "4,500+",
  },
  {
    id: "4",
    icon: <PiPencilLineLight />,
    heading: "Articles Published",
    unit: "100+",
  },
];
export default function index({cardData}:any) {
    const cardData1 = cardData ? cardData:deafultcardData;
  return (
    <div>
      <Box sx={{ padding: "100px 0px" }}>
        <Container>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "600" }}>
              Our achievements
            </Typography>
            <Box pt={1} maxWidth="700px">
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr diam
                nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                erat, sed diam voluptua.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ paddingTop: "70px" }}>
            <Grid container spacing={3}>
              {cardData1.map((item:any) => (
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    pt={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box className="circleBox">{item.icon}</Box>
                    <Box pt={2}>
                      <Typography variant="h2" sx={{ fontWeight: "500" }}>
                       {item.unit}
                      </Typography>
                    </Box>
                    <Box sx={{ paddingTop: { md: "16px", xs: "0px" } }}>
                      <Typography variant="body2" sx={{ fontWeight: "500" }}>
                        {item?.heading}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
