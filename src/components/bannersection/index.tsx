import { Box, Container, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function index({heading,option}:any) {
  const [dynamicText, setDynamicText] = useState('Efforts');

  useEffect(() => {
    const interval = setInterval(() => {
      const options = option;
      const randomIndex = Math.floor(Math.random() * options.length);
      setDynamicText(options[randomIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  // const [changingText, setChangingText] = useState("Efforts");

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setChangingText((prevText) => {
  //       switch (prevText) {
  //         case "Efforts":
  //           return "Back-and-forth";
  //         case "Back-and-forth":
  //           return "Energy";
  //         case "Energy":
  //           return "Efforts";
  //         default:
  //           return "Efforts";
  //       }
  //     });
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);
  return (
    <Box sx={{ padding: "100px 0px" }}>
      <Container>
        {/* <Typography>No More Wasted </Typography><Box  className="changing-text" >{dynamicText}</Box> */}
        <Box>
          <Typography
            variant="h2"
            sx={{ fontSize: { md: "4.5rem", sm: "2.5rem" }, fontWeight: "700" }}
          >
            Supercharge Your CRM
          </Typography>
        </Box>
        <Box sx={{ display: { sm: "flex", xs: "block" } }}>
          <Box pr={1}>
            <Typography
              sx={{
                fontSize: { md: "4.5rem", xs: "2.5rem" },
                color: "#ff7c28",
                fontWeight: "500",
              }}
            >
            {heading}  
            </Typography>
          </Box>
          <Box
            className="changing-text"
            sx={{
              fontSize: { md: "4.5rem", xs: "2.5rem" },
              color: "#ff7c28",
              fontWeight: "700",
            }}
          >
            {dynamicText}
          </Box>
        </Box>
        <Box sx={{ paddingTop: "50px",overflow:"hidden" }}>
          <Typography variant="h6">
            Gather information from customers securely and easily with
            SalesAssist, the Ultimate CRM Booster that streamlines your
            information collection process with data encryption and automation,
            from within your CRM.
          </Typography>
        </Box>
        <Box pt={2}>
          <Button
            sx={{
              background: "#ffc300ff",
              color: "#000",
              borderRadius: "100px",
              padding: "8px 25px",
              '&:hover': {
                background: "#ffc300ff",
              },
            }}
          >
            Your Ultimate CRM Booster - Book Demo!
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
