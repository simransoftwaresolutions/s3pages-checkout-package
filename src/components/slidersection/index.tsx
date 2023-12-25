import { Box, Container, Typography } from "@mui/material";
import SliderBox from "./SliderBox";


export default function index() {
  return (
    <Box>
      <Container>
        <Box>
          <Box textAlign="center">
            <Typography variant="h5" sx={{fontWeight:"700"}}>Built for Every Sales Process</Typography>
          </Box>
          <Box sx={{ padding: "10px 0px", overflow: "hidden" }}>
            <SliderBox/>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
