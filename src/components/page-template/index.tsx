import styles from "./index.module.css";
// import Image from "next/image";
import { useEffect, useState, SyntheticEvent, useRef } from "react";
// import Link from "next/link";
import Typography from "@mui/material/Typography";
import {
  Button,
  IconButton,
  Pagination,
  Skeleton,
  Tooltip,
} from "@mui/material";
import Preview from "./preview";
// import useSWR from "swr";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FilterListIcon from "@mui/icons-material/FilterList";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import { fetchAllTemplate } from "../../service/templateService";
import { Link } from "@mui/joy";
// import { Link } from "react-bootstrap/lib/Navbar";

export default function componentName({ pages }: any) {
  const [title, setTitle] = useState("");
  console.log("SFsadfsdfsdf", title);
  const [previewImage, setPreviewImage] = useState("");

  const [previewId, setPreviewId] = useState();
  const [filtericon, setFilterIcon] = useState(false);
  const [show, setShow] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTitle, setPreviewTitle] = useState(true);
  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  const [expanded, setExpanded] = useState<string | false>(false);
  const [search, setSearch] = useState("");
  console.log("SDfsdfsdfsdsd", search);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Number of items per page
  const [totalPages, setTotalPages] = useState(1);
  const [templates, setTemplates] = useState([]);

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  }) as any;
  const toggleWindow = useRef("") as any;
  const toogleDiv = useRef("") as any;
  useEffect(() => {
    const fetchData = async () => {
      setShow(true);
      try {
        const response = await fetchAllTemplate(
          currentPage,
          pageSize,
          title,
          search
        );
        setTemplates(response.data);
        setTotalPages(response.totalPages);
        setShow(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [currentPage, pageSize, title, search]);

  const [data, setData] = useState("") as any;
  console.log("ssdfsdfsdfsdfsdfsdfsdfsd", data);
  useEffect(() => {
    const fetchData = async () => {
      setShow(true);
      try {
        // Perform your data fetching here using the fetch function
        const response = await fetch("/files/doc.json");
        const dataList = await response.json();
        setData(dataList);
        // Process the fetched data as needed
        // For example, set the filters and templates state
        console.log("SDFsdfsdfsdfsdf", dataList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [currentPage, pageSize, title, search]);
  const handlePageChange = (event: any, newPage: any) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    // Handler to call on window resize

    function handleResize() {
      if (window.innerWidth < 990) {
        toggleWindow?.current?.classList.add(`${styles.show}`);
        toggleWindow?.current?.classList.add(`${styles.absolute}`);
      } else {
        toggleWindow?.current?.classList.remove(`${styles.show}`);
        toggleWindow?.current?.classList.remove(`${styles.absolute}`);
      }

      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // const { data, error } = useSWR("/files/doc.json", fetcher);

  // if (error) console.log(error);
  //   console.log("asdasdasdasd",data)
  // if (!data) console.log("no data");

  return (
    <div className="border-bottom">
      {showPreview ? (
        <Preview
          previewId={previewId}
          previewTitle={previewTitle}
          previewImage={previewImage}
          setShowPreview={setShowPreview}
        />
      ) : (
        <div className={`row d-flex ${styles.templateContainer}`}>
          <div className={`text-center  bg-white ${styles.tabsalignment}`}>
            <p className={`${styles.pageTopHeader} fs-2`}>
              {" "}
              Choose a template you love.
            </p>
            <p className={` fs-6 text-secondary mb-5 ${styles.font}`}>
              Grow your business faster when you start with a high-converting,
              mobile-responsive template.
            </p>
            <div className={styles.tab_btns}>
              <div className={styles.tab_btnsInner}>
                <button className={styles.active}>
                  <span>Landing Pages</span>
                </button>
                <button>
                  <span>Websites</span>
                </button>
              </div>
            </div>
          </div>

          <div
            className={`col-xl-2 col-lg-3 col-sm-3 pt-3 ${styles.filterList}`}
            ref={toggleWindow}
          >
            {/* { windowSize.width < 990 && 
                        <Button  className={styles.filterBTN1} onClick={()=>toggleWindow.current.classList.toggle(`${styles.show}`)}>
                        Done
                    </Button>
                    } */}

            {windowSize.width > 990 && (
              <div
                className={`d-flex align-items-center justify-content-between ${
                  toggleWindow?.current?.classList.contains(`${styles.show}`) &&
                  styles.filterToggleList
                } ${styles.filterListToggler}`}
              >
                <p className={`${styles.filterTop}`}>Sort By</p>
                <Tooltip title="filter">
                  <IconButton
                    onClick={() => {
                      toggleWindow.current.classList.toggle(`${styles.show}`);
                      setFilterIcon((prev) => !prev);
                    }}
                  >
                    {filtericon ? (
                      <KeyboardArrowLeftIcon />
                    ) : (
                      <ChevronRightIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </div>
            )}

            {data !== undefined &&
              data.filters?.map((item: any, index: number) => (
                <div>
                  {index === 0 ? (
                    <Typography
                      className={`${styles.cursor} ${styles.filterTop}`}
                      onClick={() => setTitle("")}
                    >
                      {item.key}
                    </Typography>
                  ) : (
                    <Accordion
                      className="border-bottom"
                      expanded={expanded === `panel${index + 1}`}
                      onChange={handleChange(`panel${index + 1}`)}
                      sx={{
                        background: "transparent",
                        boxShadow: "none !important",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        
                      >
                        <Typography
                          sx={{
                            color: "#444",
                            fontWeight: "700",
                            fontFamily: "'Open Sans', sans-serif",
                            fontSize: "14px", 
                          }}
                        >
                          {item.key}
                        </Typography>
                      </AccordionSummary>

                      {item.value.map((item2: any, index2: number) => (
                        <AccordionDetails
                          className={`${styles.cursor} ${styles.pre}`}
                        >
                          <Typography onClick={() => setTitle(item2.value)}>
                            {item2.value}
                          </Typography>
                        </AccordionDetails>
                      ))}
                    </Accordion>
                  )}
                </div>
              ))}
          </div>

          {windowSize.width < 990 && (
            <div
              className={`d-flex ${styles.filterSearchContainer} justify-content-between px-5 border-bottom py-3 mb-4`}
            >
              <div className={`${styles.setMobileSrch}`}>
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.filterInput}
                />
              </div>

              <Button
                className={styles.filterBTN}
                onClick={() => {
                  toggleWindow.current.classList.toggle(`${styles.show}`);
                  // document.getElementById("toggleDiv")?.classList.toggle(`${styles.show}`)
                }}
              >
                <FilterListIcon />
                Filter
              </Button>
            </div>
          )}

          <div
            ref={toogleDiv}
            className={`col-xl-10 col-lg-9 col-lg-7 border-left text-center pt-4`}
          >
            <div className={styles.filterInputSetting}>
              <div className={styles.setFillter}>
                <SearchIcon />
                {windowSize.width > 990 && (
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    className={`  mb-3 ${styles.filterInput}`}
                  />
                )}
              </div>
            </div>

            {title !== "" && (
              <div
                className={`d-flex justify-content-between ${styles.filterText}`}
              >
                <p>
                  Showing{" "}
                  <span className="text-primary fw-bold text-capitalize">
                    {title}
                  </span>{" "}
                  templates{" "}
                  <span
                    className={`${styles.cursor} px-4 text-primary`}
                    onClick={() => setTitle("")}
                  >
                    Clear
                  </span>
                </p>
              </div>
            )}

            <div className={` ${styles.templateBody}`} style={{overflow:"hidden"}}>
              {templates !== undefined && templates.length > 0 ? (
                <>
                  {templates &&
                    templates.map((template: any) => (
                      <TemplateImage
                        setPreviewId={setPreviewId}
                        setPreviewTitle={setPreviewTitle}
                        setPreviewImage={setPreviewImage}
                        setShowPreview={setShowPreview}
                        show={show}
                        key={template._id}
                        item={template}
                      />
                    ))}
                  <br />
                  {totalPages > 1 && (
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      variant="outlined"
                      shape="rounded"
                    />
                  )}
                </>
              ) : (
                <p>SORRY, No templates present</p>
              )}

              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const TemplateImage = ({
  show,
  item,
  setPreviewId,
  setShowPreview,
  setPreviewTitle,
  setPreviewImage,
}: any) => {
  const random = Math.ceil(Math.random() * 5);
  return (
    <>
      {show ? (
        <Skeleton
          key={item._id}
          animation="wave"
          variant="rectangular"
          className={styles.pagePanel}
        >
          <div key={item._id}>
            <div>
              <img
                src={`/template${random}.jpg`}
                width={200}
                height={200}
                alt="template panel"
              />
              <h1>{item.title}</h1>
            </div>
          </div>
          <div className={styles.pagePanelHover}>
            <Link target="_blank" href={`/template${random}.jpg`}>
              <p>Preview</p>
            </Link>
          </div>
        </Skeleton>
      ) : (
        <div className={styles.pagePanel} key={item._id}>
          <div className={styles.topPanel}>
            <div>
              <img
                src={
                  item?.thumbnail
                    ? "https://d105z293na9jky.cloudfront.net/" + item?.thumbnail
                    : "images/template1.jpg"
                }
                width={200}
                height={200}
                alt="template panel"
              />
              <p>{item.title}</p>
            </div>
            {/* <div className={styles.itmTitle}>
                     <p>{item.title}</p>
                    </div> */}
            <div className={styles.pagePanelHover}>
              <p
                onClick={() => {
                  setShowPreview(true);
                  setPreviewTitle(item.title.split("-").join(" "));
                  setPreviewImage(item.preview_image ?? "");
                  setPreviewId(item.id);
                }}
              >
                Preview
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};