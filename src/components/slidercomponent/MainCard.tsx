import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
export default function MainCard({ item }: any) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };
  return (
    <Box
      className="Card_body"
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
    >
      <Box className="image_body">
        <img src={item.img} width="100%" alt="" />
        <img className="img1" src={item.hoverimg} width="100%" alt="" />
        {item.chiphead.toLowerCase() === "hot" ? (
          <>
            <Box
              sx={{
                padding: "1px 5px",
                background: "#ff554e",
                position: "absolute",
                zIndex: "1",
                left: "15px",
                top: "15px",
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "#fff", fontSize: "12px", fontWeight: "600" }}
              >
                {item.chiphead}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                padding: "1px 5px",

                background: "#ffa965",
                position: "absolute",
                zIndex: "1",
                left: "15px",
                top: "15px",
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "#fff", fontSize: "12px", fontWeight: "600" }}
              >
                {item.chiphead}
              </Typography>
            </Box>
          </>
        )}

        <Box
          className="icon_box"
          sx={{
            display: "grid",
            gap: "6px",
            position: "absolute",
            zIndex: "1",
            right: "15px",
            top: "15px",
          }}
        >
          <IconButton sx={{ background: "#fff" }}>
            <FavoriteBorderOutlinedIcon />
          </IconButton>

          <IconButton sx={{ background: "#fff" }}>
            <SearchRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Box className="des_box">
        <Box py={1} sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              color: "#777777",
              fontSize: "12px",
              textTransform: "uppercase",
              fontWeight: "500",
            }}
            variant="body2"
          >
            {item.head}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              color: "#222222",
              fontSize: "14px",
              textTransform: "uppercase",
              fontWeight: "500",
            }}
            variant="body2"
          >
            {item.description}
          </Typography>
        </Box>
        <Box mt={0.5}>
          <Box
            p={1}
            sx={{
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box className="btn1" sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  background: "none",

                  color: "#222222",
                  fontWeight: "600",
                  lineHeight: "1.2",
                  padding: "0",
                  whiteSpace: "pre",
                }}
                variant="body2"
              >
                $ {item.price}
              </Typography>
            </Box>
            <Box className="btn2" sx={{ width: "100%", textAlign: "center" }}>
              <Typography
                sx={{
                  background: "none",

                  color: "#222222",
                  fontWeight: "600",
                  lineHeight: "1.2",
                  padding: "0",
                  whiteSpace: "pre",
                }}
                variant="body2"
              >
                <span style={{ borderBottom: "1.5px solid #e5e5e5" }}>
                  ADD TO CART
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
