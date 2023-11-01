import { Box, Container, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function Index({ heading, option }: any) {
  const defaultOption = ['Efforts', 'Back-and-forth', 'Energy', "SDfsdf", "Sfdfsdf"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const options = option ? option : defaultOption;
      setCurrentIndex((prevIndex) => (prevIndex + 1) % options.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const dynamicText = option ? option[currentIndex] : defaultOption[currentIndex];

  return (
    <Box sx={{ padding: "100px 0px" }}>
      <Container>
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
              {heading ? heading : "No More Wasted"}
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
        <Box sx={{ paddingTop: "50px", overflow: "hidden" }}>
          <Typography variant="h6">
            Gather information from customers securely and easily with
            SalesAssist, the Ultimate CRM Booster that streamlines your
            information collection process with data encryption and automation,
            from within your CRM.
          </Typography>
        </Box>
        <Box pt={2}>
          <Button
            variant="contained"
            sx={{
              background: "#ffc300ff !important",
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
