import * as React from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../../styles/page-template/index.module.css";

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
      <div className="p-3">
      <p className="fs-5">{children}</p>
    </div>
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
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleThisTempate = () => {};

  return (
    <div className={` ${styles.gray}`}>
    <div className={`d-flex justify-content-around ${styles.previewHeaderContainer}`}>
      <div className={`d-flex ${styles.headerTitle}`}>
        <button className="btn btn-link" onClick={() => setShowPreview(false)}>
        <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>
          {previewTitle.length > 20 ? `${previewTitle.substring(0, 20)}...` : previewTitle}
        </h1>
      </div>
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${value === 1 ? "active" : ""}`}
            id="desktop-tab"
            data-bs-toggle="tab"
            data-bs-target="#desktop"
            type="button"
            role="tab"
            aria-controls="desktop"
            aria-selected={value === 1}
            onClick={() => handleChange}
          >
            Desktop
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${value === 0 ? "active" : ""}`}
            id="mobile-tab"
            data-bs-toggle="tab"
            data-bs-target="#mobile"
            type="button"
            role="tab"
            aria-controls="mobile"
            aria-selected={value === 0}
            onClick={() => handleChange}
          >
            Mobile
          </button>
        </li>
      </ul>
      <button
        type="button"
        className={`btn btn-primary ${styles.headerButton}`}
        onClick={() => handleThisTempate()}
      >
        Use this template
      </button>
    </div>
  
    <div className="tab-content">
      <div className={`tab-pane fade ${value === 0 ? "show active" : ""}`} id="mobile" role="tabpanel" aria-labelledby="mobile-tab">
        <div className={`container ${styles.previewMobileContainer}`}>
          <div className={styles.previewMobile}>
            <div className={styles.previewMobileHeader}>
              <span></span>
              <span></span>
            </div>
            <div className={styles.previewMobileBody}>
              <iframe src={previewImage && previewImage} width="100%" height="100%" title="Mobile Preview"></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className={`tab-pane fade ${value === 1 ? "show active" : ""}`} id="desktop" role="tabpanel" aria-labelledby="desktop-tab">
        <div className={`container ${styles.previewDesktopContainer}`}>
          <div className={styles.previewDesktop}>
            <div className={styles.previewDesktopHeader}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={styles.previewDesktopBody}>
              <iframe src={previewImage && previewImage} width="100%" height="100%" title="Desktop Preview"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  
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
