import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function Step2({ setStep }:any) {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
      label: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
  ];
  return (
    <Box sx={{ background: "#F6F6F6", height: "100%" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "89vh",
          }}
        >
          <Box
            sx={{
              padding: "70px 50px",
              width: "500px",
              position: "relative",
              borderRadius: "20px",
              backgroundColor: "#fff",
              boxShadow:
                " rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;",
            }}
          >
            
            <Box
              sx={{
                borderRadius: "100px",
               
                backgroundColor: "#fff",
                display: "block",
                textAlign:"center",
                position:"relative",
                top:"-20px",
              }}
            >
              <FmdGoodIcon sx={{ color: "#9234e0", fontSize: "50px" }} />
            </Box>
            <Box pb={1}>
              <IconButton
                sx={{ borderRadius: "10px", color: "#492cdd" }}
                onClick={() => setStep("step1")}
              >
                <ArrowBackIcon />
                <Typography variant="body1" color="#492cdd" >
                  Back
                </Typography>
              </IconButton>
            </Box>
            <Typography variant="h6">
              Where is your business located?
            </Typography>
            <Box pt={2}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={top100Films.map((option) => option.label)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Coaching, Photography, Landscaping..."
                  />
                )}
              />
            </Box>
            <Box>
              <Button
                className={`bg-warning  text-secondary footerButton`}
                sx={{
                  fontFamily: "sans-serif",
                  textAlign: "center !important",
                  backgroundColor: "#ffc300 !important",

                  borderRadius: "105px !important",
                  textDecoration: "none !important",
                  fontSize: "15px !important",
                  fontWeight: "600 !important",

                  margin: "0 auto !important",
                  lineHeight: "30px !important",
                  marginTop: "40px !important",
                  marginBottom: "20px !important",
                  color: "#000c !important",
                  textTransform: "uppercase !important",
                  padding: "0px",
                  width: "100% !important",
                  maxWidth: "100% !important",
                  height: "50px",
                }}
                onClick={() => setStep("step3")}
              >
                Next <ArrowForwardIcon/>
              </Button>
            </Box>
            <Box textAlign="center">
              <Typography variant="body1">
                Website language
                <span style={{ color: "#492cdd" }}>English</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}