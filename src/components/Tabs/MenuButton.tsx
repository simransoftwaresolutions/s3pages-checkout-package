import React, { useState } from "react";
import { Box, Container, Divider, Button } from "@mui/material";
import BodyComponent from "./BodyComponent";
import { FaBarcode } from "react-icons/fa6";
export default function MenuButton({
  position = "top",
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
        {position === "top" && (
          <>
            <Box
              sx={{
                overflow: { xs: "auto", sm: "auto", md: "hidden" },
                padding: "0px 15px",
              }}
            >
              <Box pt={4} display="flex" justifyContent="space-between">
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
                        className={activeTab === index ? "active-tab-underline" : "tab-underline"}
                        textAlign="center"
                        p={2}
                        style={{
                          color: activeTab === index ? "blue" : "black",
                          borderColor: activeTab === index ? "blue" : "black",
                        }}
                      >
                        {/* <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: activeTab === index ? "#d87df9" : "#9c9494",
                            fontSize: "40px",
                          }}
                        >
                          {item.icon}
                        </Box> */}
                        <div
                          style={{
                            color: activeTab === index ? "#d87df9" : "#9c9494",whiteSpace:"pre"
                          }}
                        >
                          {item?.heading}
                        </div>
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
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: activeTab === index ? "#d87df9" : "#9c9494",
                            fontSize: "40px",
                          }}
                        >
                          {item.icon}
                        </Box>
                        <div
                          style={{
                            color: activeTab === index ? "#d87df9" : "#9c9494",whiteSpace:"pre"
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
            {type === "button"  ? (""):type === "underline"  ? (""): (
              <>              
                <Divider
                  sx={{
                    position: "relative",
                    top: "-16px",
                    borderBottom: "2px solid #d87df9",
                  }}
                />
              </>
            )}
          </>
        )}
        <Box>
          <BodyComponent data={maindata} />
        </Box>
        {position === "bottom" && (
          <>
           {type === "button" ? "":type === "underline" ? "": (
              <>
                {" "}
                <Divider
                  sx={{
                    position: "relative",
                    top: "48px",
                    borderBottom: "2px solid #d87df9",
                  }}
                />
              </>
            )}
            <Box
              sx={{
                overflow: { xs: "auto", sm: "auto", md: "hidden" },
                padding: "0px 15px",
              }}
            >
              <Box pt={4} display="flex" justifyContent="space-between">
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
                    ) :type === "underline" ? (
                      <>
                      <Box
                      onClick={() => {
                        setMainData(item);
                        handleTabClick(index);
                      }}
                      className={activeTab === index ? "active-tab-underline-bottom" : "tab-underline-bottom"}
                      textAlign="center"
                      p={2}
                      style={{
                        color: activeTab === index ? "blue" : "black",
                        borderColor: activeTab === index ? "blue" : "black",
                      }}
                    >
                      {/* <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          color: activeTab === index ? "#d87df9" : "#9c9494",
                          fontSize: "40px",
                        }}
                      >
                        {item.icon}
                      </Box> */}
                      <div
                        style={{
                          color: activeTab === index ? "#d87df9" : "#9c9494",whiteSpace:"pre"
                        }}
                      >
                        {item?.heading}
                      </div>
                    </Box>
                    </>
                    ) : (
                      <Box
                        onClick={() => {
                          setMainData(item);
                          handleTabClick(index);
                        }}
                        className={activeTab === index ? "active-tab-bottom" : "tab-bottom"}
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
                            color: activeTab === index ? "#d87df9" : "#9c9494",
                            fontSize: "40px",
                          }}
                        >
                          {item.icon}
                        </Box>
                        <div
                          style={{
                            color: activeTab === index ? "#d87df9" : "#9c9494",whiteSpace:"pre"
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
      </Container>
    </div>
  );
}
