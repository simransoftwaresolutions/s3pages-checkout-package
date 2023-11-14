import React, { useState } from "react";
import { Box, Container, Divider, Button } from "@mui/material";
import BodyComponent from "./BodyComponent";

export default function SideMenuButton({ position, type, setTabData }: any) {
  const [activeTab, setActiveTab] = useState(0);
  const [maindata, setMainData] = useState(setTabData[0]);

  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };

  return (
    <div>
      <Container>
        <Box display="flex">
          {position === "left" && (
            <>
              <Box
                display="flex"
                sx={
                  type === "tabs"
                    ? {
                        padding: "25px 0px 15px 15px",
                        background: "#e3e3e3",
                      }
                    : type === "arrow"
                    ? {
                        // overflow: { xs: "auto", sm: "auto", md: "hidden" },
                        padding: "0px 15px",
                        background: "#2f2f2f",
                        marginRight:"10px"

                      }
                    : {
                        padding: "25px 15px",
                      }
                }
              >
                <Box
                  sx={{ width: "200px" }}
                  // pr={1}
                  display="block"
                  justifyContent="space-between"
                >
                  {setTabData.map((item: any, index: any) => (
                    <>
                      {type === "button" ? (
                        <>
                          <Box py={2}>
                            <Button
                              onClick={() => {
                                setMainData(item);
                                handleTabClick(index);
                              }}
                              fullWidth
                              className={
                                activeTab === index
                                  ? "activeTabs"
                                  : "inActiveTabs"
                              }
                            >
                              {item?.heading}
                            </Button>
                          </Box>
                        </>
                      ) : type === "underline" ? (
                        <>
                          <Box
                            onClick={() => {
                              setMainData(item);
                              handleTabClick(index);
                            }}
                            className={
                              activeTab === index
                                ? "active-tab-left-underline"
                                : "tab-left-underline"
                            }
                            textAlign="center"
                            p={2}
                            style={{
                              color: activeTab === index ? "blue" : "black",
                              borderColor:
                                activeTab === index ? "blue" : "black",
                            }}
                          >
                            {/* <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              color:
                                activeTab === index ? "#d87df9" : "#9c9494",
                              fontSize: "40px",
                            }}
                          >
                            {item.icon}
                          </Box> */}
                            <div
                              style={{
                                color:
                                  activeTab === index ? "#d87df9" : "#9c9494",
                              }}
                            >
                              {item?.heading}
                            </div>
                          </Box>
                        </>
                      ) : type === "tabs" ? (
                        <>
                          <Box
                            onClick={() => {
                              setMainData(item);
                              handleTabClick(index);
                            }}
                            className={
                              activeTab === index
                                ? "active-tab-tabs-left"
                                : "tab-tabs-left"
                            }
                            textAlign="center"
                            sx={{ cursor: "pointer" }}
                          >
                            <div
                              style={{
                                color:
                                  activeTab === index ? "#d87df9" : "#9c9494",
                              }}
                            >
                              {item?.heading}
                            </div>
                          </Box>
                        </>
                      ) : type === "arrow" ? (
                        <>
                          <Box
                            onClick={() => {
                              setMainData(item);
                              handleTabClick(index);
                            }}
                            className={
                              activeTab === index
                                ? "active-tab-arrow-left"
                                : "tab-arrow-left"
                            }
                            textAlign="center"
                            sx={{ cursor: "pointer" }}
                          >
                            <Box
                              sx={{
                                color:
                                  activeTab === index ? "#d87df9" : "#9c9494",
                               
                                "&:hover": {
                                  color: "#d87df9",
                                },
                              }}
                            >
                              {item?.heading}
                            </Box>
                          </Box>
                        </>
                      ) : (
                        <Box
                          onClick={() => {
                            setMainData(item);
                            handleTabClick(index);
                          }}
                          className={
                            activeTab === index ? "active-tab-left" : "tab-left"
                          }
                          textAlign="center"
                          p={2}
                          style={{
                            color: activeTab === index ? "blue" : "black",
                            borderColor: activeTab === index ? "blue" : "black",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              color:
                                activeTab === index ? "#d87df9" : "#9c9494",
                              fontSize: "40px",
                            }}
                          >
                            {item.icon}
                          </Box>
                          <div
                            style={{
                              color:
                                activeTab === index ? "#d87df9" : "#9c9494",
                            }}
                          >
                            {item?.heading}
                          </div>
                        </Box>
                      )}
                    </>
                  ))}
                </Box>
                {type === "button" ? (
                  ""
                ) : type === "underline" ? (
                  ""
                ) : type === "tabs" ? (
                  ""
                ) : type === "arrow" ? (
                  ""
                ) : (
                  <>
                    <Divider
                      orientation="vertical"
                      sx={{
                        position: "relative",
                        right: "24px",
                        borderRight: "2px solid #d87df9",
                      }}
                    />
                  </>
                )}
              </Box>
          
              <BodyComponent data={maindata} />
            </>
          )}
        </Box>
        <Box
          sx={{
            display: { xs: "block", sm: "flex" },
          }}
        >
          {position === "right" && (
            <>
              <BodyComponent data={maindata} />
              <Box
                display="flex"
                sx={
                  type === "tabs"
                    ? {
                        padding: "25px 15px 15px 0px",
                        background: "#e3e3e3",
                      }
                    : type === "arrow"
                    ? {
                        // overflow: { xs: "auto", sm: "auto", md: "hidden" },
                        padding: "0px 15px",
                        background: "#2f2f2f",
                        marginLeft:"10px"

                      }
                    :{
                        padding: "25px 15px",
                      }
                }
              >
                {type === "button" ? (
                  ""
                ) : type === "underline" ? (
                  ""
                ) : type === "tabs" ? (
                  ""
                ) : type === "arrow" ? (
                  ""
                ) : (
                  <>
                    <Divider
                      orientation="vertical"
                      sx={{
                        position: "relative",
                        left: "16px",
                        borderRight: "2px solid #d87df9",
                      }}
                    />
                  </>
                )}

                <Box
                  sx={{ width: "200px" }}
                  pr={1}
                  display="block"
                  justifyContent="space-between"
                >
                  {setTabData.map((item: any, index: any) => (
                    <>
                      {type === "button" ? (
                        <>
                          <Box py={2} display="flex" justifyContent="end">
                            <Button
                              onClick={() => {
                                setMainData(item);
                                handleTabClick(index);
                              }}
                              fullWidth
                              className={
                                activeTab === index
                                  ? "activeTabs"
                                  : "inActiveTabs"
                              }
                            >
                              {item?.heading}
                            </Button>
                          </Box>
                        </>
                      ) : type === "underline" ? (
                        <>
                          <Box
                            onClick={() => {
                              setMainData(item);
                              handleTabClick(index);
                            }}
                            className={
                              activeTab === index
                                ? "active-tab-right-underline"
                                : "tab-right-underline"
                            }
                            textAlign="center"
                            p={2}
                            style={{
                              color: activeTab === index ? "blue" : "black",
                              borderColor:
                                activeTab === index ? "blue" : "black",
                            }}
                          >
                            {/* <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              color:
                                activeTab === index ? "#d87df9" : "#9c9494",
                              fontSize: "40px",
                            }}
                          >
                            {item.icon}
                          </Box> */}
                            <div
                              style={{
                                color:
                                  activeTab === index ? "#d87df9" : "#9c9494",
                              }}
                            >
                              {item?.heading}
                            </div>
                          </Box>
                        </>
                      ) : type === "tabs" ? (
                        <>
                          <Box
                            onClick={() => {
                              setMainData(item);
                              handleTabClick(index);
                            }}
                            className={
                              activeTab === index
                                ? "active-tab-tabs-right"
                                : "tab-tabs-right"
                            }
                            textAlign="center"
                            sx={{ cursor: "pointer" }}
                          >
                            <div
                              style={{
                                color:
                                  activeTab === index ? "#d87df9" : "#9c9494",
                              }}
                            >
                              {item?.heading}
                            </div>
                          </Box>
                        </>
                      ) : type === "arrow" ? (
                        <>
                          <Box
                            onClick={() => {
                              setMainData(item);
                              handleTabClick(index);
                            }}
                            className={
                              activeTab === index
                                ? "active-tab-arrow-right"
                                : "tab-arrow-right"
                            }
                            textAlign="center"
                            sx={{ cursor: "pointer" }}
                          >
                            <Box
                              sx={{
                                color:
                                  activeTab === index ? "#d87df9" : "#9c9494",
                               
                                "&:hover": {
                                  color: "#d87df9",
                                },
                              }}
                            >
                              {item?.heading}
                            </Box>
                          </Box>
                        </>
                      ) :  (
                        <Box
                          onClick={() => {
                            setMainData(item);
                            handleTabClick(index);
                          }}
                          className={
                            activeTab === index
                              ? "active-tab-right"
                              : "tab-right"
                          }
                          textAlign="center"
                          p={2}
                          style={{
                            color: activeTab === index ? "blue" : "black",
                            borderColor: activeTab === index ? "blue" : "black",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              color:
                                activeTab === index ? "#d87df9" : "#9c9494",
                              fontSize: "40px",
                            }}
                          >
                            {item.icon}
                          </Box>
                          <div
                            style={{
                              color:
                                activeTab === index ? "#d87df9" : "#9c9494",
                              // whiteSpace: "pre",
                            }}
                          >
                            {item?.heading}
                          </div>
                        </Box>
                      )}
                    </>
                  ))}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </div>
  );
}
