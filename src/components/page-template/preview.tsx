import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./index.module.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Preview({
  setShowPreview,
  previewId,
  previewTitle,
  previewImage,
}: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleThisTempate = () => {};

  return (
    <div className={styles.gray}>
      <div
        className={`d-flex justify-content-around ${styles.previewHeaderContainer}`}
      >
        <div className={`d-flex ${styles.headerTitle}`}>
          <ArrowBackIcon onClick={() => setShowPreview(false)} />
          <h1>
            {previewTitle.length > 20 ? `${previewTitle}...` : previewTitle}
          </h1>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: "transparent" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                height: " 3px !important",
                /* opacity: 0.5; */
                backgroundColor: "#8836dd !important",
              },
            }}
          >
            <Tab
              sx={{
                "&.Mui-selected": {
                  color: " #333 !important",
                  // opacity: 0.5;
                  fontWeight: "700",
                },
              }}
              label="Desktop"
              {...a11yProps(1)}
            />
            <Tab
              sx={{
                "&.Mui-selected": {
                  color: " #333 !important",
                  // opacity: 0.5;
                  fontWeight: "700",
                },
              }}
              label="Mobile"
              {...a11yProps(0)}
            />
          </Tabs>
        </Box>
        <button
          type="button"
          className={`btn btn-primary h-1 ${styles.headerButton}`}
          onClick={() => handleThisTempate()}
        >
          Use this template
        </button>
      </div>

      <TabPanel value={value} index={0}>
        <div className={styles.previewDesktopContainer}>
          <div className={styles.previewDesktop}>
            <div className={styles.previewDesktopHeader}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={styles.previewDesktopBody}>
              <iframe
                src={previewImage && previewImage}
                width="100%"
                height="100%"
              ></iframe>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={styles.previewMobileContainer}>
          <div className={styles.previewMobile}>
            <div className={styles.previewMobileHeader}>
              <span></span>
              <span></span>
            </div>
            <div className={styles.previewMobileBody}>
              <iframe
                src={previewImage && previewImage}
                width="100%"
                height="100%"
              ></iframe>
            </div>
          </div>
        </div>
      </TabPanel>

      <div className="d-flex justify-content-center">
        <button
          type="button"
          onClick={() => {
            setShowPreview(false);
          }}
          className={`btn btn-outline-primary ${styles.headerButton}`}
        >
          Back to All Template
        </button>
      </div>
    </div>
  );
}
