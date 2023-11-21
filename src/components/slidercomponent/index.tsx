import { Container, Grid } from "@mui/material";
import Slider from "./SliderComponent";

export default function index({
  slidesToShowlg,
  slidesToShowmd,
  slidesToShowsm,
  slidesToShowxs,
  cardData,
  cardType,
}: any) {
  return (
    <div>
      <Container>
        <Slider
          slidesToShowlg={slidesToShowlg}
          slidesToShowmd={slidesToShowmd}
          slidesToShowsm={slidesToShowsm}
          slidesToShowxs={slidesToShowxs}
          cardData={cardData}
          cardType={cardType}
        />
      </Container>
    </div>
  );
}
