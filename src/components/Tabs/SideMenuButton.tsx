import React, { useState } from "react";
import { Box, Container, Divider, Button } from "@mui/material";
import BodyComponent from "./BodyComponent";

export default function SideMenuButton({
  position ,
  type,
  setTabData,
}: any) {
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
                sx={{
                  // overflow: { xs: "auto", sm: "auto", md: "hidden" },
                  padding: "0px 15px",
                }}
              >
                <Box pr={1} display="block" justifyContent="space-between">
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
                              variant={
                                activeTab === index ? "contained" : "outlined"
                              }
                              //   className={activeTab === index ? "active-tab" : "tab"}
                            >
                              {item?.heading}
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <Box
                          onClick={() => {
                            setMainData(item);
                            handleTabClick(index);
                          }}
                          className={activeTab === index ? "active-tab" : "tab"}
                          textAlign="center"
                          p={2}
                          style={{
                            color: activeTab === index ? "blue" : "black",
                            borderColor: activeTab === index ? "blue" : "black",
                          }}
                        >
                          {/* <i
                            className={item.icon}
                            style={{
                              color:
                                activeTab === index ? "#d87df9" : "#9c9494",
                              fontSize: "40px",
                            }}
                          ></i> */}
                            <Box
                          sx={{
                            display:"flex",
                            justifyContent:"center",
                            color: activeTab === index ? "#d87df9" : "#9c9494",
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
                {/* {type !== "button" && <>   <Divider
              orientation="vertical"
                      sx={{
                        position: "relative",
                        top: "-16px",
                        borderBottom: "2px solid #d87df9",
                      }}
                    /></> } */}
              </Box>
              <BodyComponent data={maindata} />
            </>
          )}
        </Box>
        <Box  sx={{
          display:{ xs:"block" ,  sm:"flex"}

        }} >
          {position === "right" && (
            <>
              <BodyComponent data={maindata} />
              <Box
                display="flex"
                sx={{
                  // overflow: { xs: "auto", sm: "auto", md: "hidden" },
                  padding: "0px 15px",
                }}
              >
                <Box pr={1} display="block" justifyContent="space-between">
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
                              variant={
                                activeTab === index ? "contained" : "outlined"
                              }
                              //   className={activeTab === index ? "active-tab" : "tab"}
                            >
                              {item?.heading}
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <Box
                          onClick={() => {
                            setMainData(item);
                            handleTabClick(index);
                          }}
                          className={activeTab === index ? "active-tab" : "tab"}
                          textAlign="center"
                          p={2}
                          style={{
                            color: activeTab === index ? "blue" : "black",
                            borderColor: activeTab === index ? "blue" : "black",
                          }}
                        >
                          {/* <i
                            className={item.icon}
                            style={{
                              color:
                                activeTab === index ? "#d87df9" : "#9c9494",
                              fontSize: "40px",
                            }}
                          ></i> */}
                            <Box
                          sx={{
                            display:"flex",
                            justifyContent:"center",
                            color: activeTab === index ? "#d87df9" : "#9c9494",
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
                {/* {type !== "button" && <>   <Divider
              orientation="vertical"
                      sx={{
                        position: "relative",
                        top: "-16px",
                        borderBottom: "2px solid #d87df9",
                      }}
                    /></> } */}
              </Box>
            
            </>
          )}
        </Box>
      </Container>
    </div>
  );
}
