import { Container, Grid } from "@mui/material";
import React from "react";
import MainCard from "./MainCard";
import Slider from "./SliderComponent";

export default function index() {
  return (
    <div>
      <Container>
        <Slider />
      </Container>
    </div>
  );
}
