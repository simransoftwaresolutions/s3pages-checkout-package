import React from "react";
import { Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function Step1({ setStep }:any) {
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
            height:{  xs:"92.1vh", md:"89.4vh"},
          }}
        >
          <Box
            sx={{
              padding: "70px 50px",
              width:"500px",
              borderRadius: "20px",
              backgroundColor: "#fff",
              position:"relative",
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
                <BusinessCenterIcon sx={{color:"#9234e0",fontSize:"50px"}}/>
            </Box>
            <Typography variant="h6">
              What type of business are you building?
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
                fullWidth
                sx={{
                  padding: "0px",
                  width: "100% !important",
                  maxWidth: "100% !important",
                  height: "50px",
                  color: "#181723 !important"
                }}
                onClick={() => setStep("step2")}
              >
                Next <ArrowForwardIcon/>
              </Button>
            </Box>
            <Box textAlign="center">
              <Typography variant="body1">
                Not sure?
                <span style={{ color: "#492cdd" }}> See some suggestions</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
