import { Box, Container, Typography } from "@mui/material";
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
export default function index() {
  return (
    <Box>
      <Container>
        <Box>
          <Box textAlign="center">
            <Typography variant="h5">Built for Every Sales Process</Typography>
          </Box>
          <Box sx={{ padding: "50px 0px", overflow: "hidden" }}>
            <div className="slider">
              <div className="slide-track">
                {data.map((item: any) => (
                  <div className="slide">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        src={
                          item?.img
                            ? item?.img
                            : "https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg"
                        }
                        height="100px"
                        width="100px"
                        alt=""
                      />
                      <Box pt={1}>
                        <Typography variant="h6">{item?.head}</Typography>
                      </Box>
                    </Box>
                  </div>
                ))}

                {/* <div className="slide">
                  <Box sx={{ display:"flex",justifyContent:"center",flexDirection:"column" }}>
                    <img
                      src="https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg"
                      height="100px"
                      width="100px"
                      alt=""
                    />
                    <Box>
                      <Typography variant="h6">
                       Insurance
                      </Typography>
                    </Box>
                  </Box>
                </div>
                <div className="slide">
                  <Box sx={{ display:"flex",justifyContent:"center",flexDirection:"column" }}>
                    <img
                      src="https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg"
                      height="100px"
                      width="100px"
                      alt=""
                    />
                    <Box>
                      <Typography variant="h6">
                       Insurance
                      </Typography>
                    </Box>
                  </Box>
                </div>
                <div className="slide">
                  <Box sx={{ display:"flex",justifyContent:"center",flexDirection:"column" }}>
                    <img
                      src="https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg"
                      height="100px"
                      width="100px"
                      alt=""
                    />
                    <Box>
                      <Typography variant="h6">
                       Insurance
                      </Typography>
                    </Box>
                  </Box>
                </div>
                <div className="slide">
                  <Box sx={{ display:"flex",justifyContent:"center",flexDirection:"column" }}>
                    <img
                      src="https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg"
                      height="100px"
                      width="100px"
                      alt=""
                    />
                    <Box>
                      <Typography variant="h6">
                       Insurance
                      </Typography>
                    </Box>
                  </Box>
                </div>
                <div className="slide">
                  <Box sx={{ display:"flex",justifyContent:"center",flexDirection:"column" }}>
                    <img
                      src="https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg"
                      height="100px"
                      width="100px"
                      alt=""
                    />
                    <Box>
                      <Typography variant="h6">
                       Insurance
                      </Typography>
                    </Box>
                  </Box>
                </div>
                <div className="slide">
                  <Box sx={{ display:"flex",justifyContent:"center",flexDirection:"column" }}>
                    <img
                      src="https://www.salesassist.io/_next/static/media/Icons3_Machinery.8f219f3f.svg"
                      height="100px"
                      width="100px"
                      alt=""
                    />
                    <Box>
                      <Typography variant="h6">
                       Insurance
                      </Typography>
                    </Box>
                  </Box>
                </div> */}
              </div>
            </div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
