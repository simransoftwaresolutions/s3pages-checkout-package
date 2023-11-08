import React from "react";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";

export default function BodyComponent({ data }: any) {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <img src={data.image} width="100%" alt="" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box py={2}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "700", wordBreak: "break-all" }}
            >
              {data?.heading}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1">{data?.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
