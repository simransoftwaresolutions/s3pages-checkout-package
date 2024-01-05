import { Fragment, memo, useCallback } from 'react';
// import MainContent from '../pagepreview/components/MainContent';
import SectionUI from './components/section/ui';
import sectionStyles from '../../styles/editorui/MainContent.module.css';
import styles from '../../styles/editorui/Home.module.css';
import ENV from '../../utils/env';
import { usePushCtx } from "../../context/editorui/PushContext";
import { usePagesCtx } from "../../context/editorui/PagesContext";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StyleGenerater from './atoms/StyleGenerater';
import { GetSiteData, GetThemeSiteStyles } from "../../service/editorui/PagesServices";
import { GetAllSectionTags } from '../../service/editorui/ElementServices';
import { deepCloneArray } from '../../utils/functions';
import { useContentCtx } from "../../context/editorui/ContentsContext";
import { Typography } from '@mui/material';
import PageTemplate from "../page-template/index"
import Templategen from "../templategen/index"
import Bannersection from "../bannersection/index"
import Slidersection from "../slidersection/index"
import Tabs from "../Tabs/index"
interface PreviewPageProps {
  siteInfo?: any;
  uriInfo?: any;
}

const Previeweditor = ({ siteInfo, uriInfo }: PreviewPageProps) => {
  ENV.isViewReadOnly = true;
  ENV.isPackage = true;

  const secRefs = useRef<any>([]);
  const id = "64661c4927827070ff3212e5";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmZmZGZiOGJkM2QwMWU3OWE5MGE5OCIsImlhdCI6MTY4NzkyODcxMywiZXhwIjoxNzE5NDY0NzEzfQ.ITTlkhQCZyu-hHDPOa0PKC83p6cWMl6ab_p-0p-FOcM";

  const { isProcessing } = usePushCtx();
  const { queryData, setQueryData, stylesGlobCtx, setStylesGlobCtx, setCssFromSettings } = usePagesCtx();
  const { stylesCtx, setStylesCtx } = usePagesCtx();
  const { sectionCtx, setSectionCtx, setPageSeoUrlCtx, setMyTemplatesCtx, setMyOverlayCtx, setMyTemplatesNameCtx, setMyOverlayNameCtx } = useContentCtx();

  useEffect(() => {
    if (token) {
      ENV.auth = token.toString();
    }
  }, [token]);

  const getNewData = useCallback(async () => {
    if (uriInfo?.status === false) {
      return;
    } else {
      let _themeId = siteInfo?.data?.themeId || siteInfo?.data?._id;
      if (uriInfo?.data?.page?.variants?.length) {
        const testJson = JSON.parse(uriInfo?.data?.page?.variants[0]?.content);
        const _tempContents = uriInfo?.data?.page?.variants[0]?.content !== ' ' ? testJson : [];
        setSectionCtx(_tempContents);
      }

      const _styleCtx = deepCloneArray(stylesCtx); // set styles 
      _styleCtx.styles = siteInfo?.data?.styles ? siteInfo?.data?.styles : [];
      setStylesCtx(_styleCtx);

      const _styleGlobCtx = deepCloneArray(stylesGlobCtx); // set global styles 
      let _siteType = siteInfo?.data?._id !== _themeId ? "site" : "themesite";
      if (_themeId !== siteInfo?.data?._id) {
        const globSiteData = await GetThemeSiteStyles(_themeId);
        if (globSiteData.status && siteInfo?.data?._id !== _themeId) {
          _styleGlobCtx.styles = globSiteData?.styles ? globSiteData?.styles : [];
        }
      }

      // SEO URL array creation
      if (siteInfo?.status && siteInfo?.data?.pages?.length) {

        const _seoUrl: any[] = [];
        for (let j = 0; j < siteInfo?.data?.pages?.length; j++) {
          _seoUrl.push({
            pageId: siteInfo?.data?.pages[j]?._id,
            seourl: siteInfo?.data?.pages[j]?.seourl,
            domainname: siteInfo?.data?.domainname,
          });
        }
        setPageSeoUrlCtx(_seoUrl);
      }

      setStylesGlobCtx(_styleGlobCtx);

      setQueryData({ ...queryData, funnelId: siteInfo?.data?._id, siteType: _siteType, themeId: _themeId, pageId: uriInfo?.data?.page?._id });

    }
  }, [uriInfo?.data?._id, siteInfo?.data?._id])

  const getDatas = useCallback(async () => {

    if (!id) return;

    let _themeId = "";
    const siteData = await GetSiteData(id);

    // set sections ctx
    if (siteData?.status && siteData?.data?.pages[0]) {
      _themeId = siteData?.data?.themeId || id;

      const _gFntFamily = (siteData?.data?.settings);

      if (_gFntFamily?.styles?.length) {
        setCssFromSettings(_gFntFamily?.styles || []);
      }

      if (siteData?.data?.pages[0]?.variants[0]) {
        const testJson = JSON.parse(siteData?.data?.pages[0]?.variants[0]?.content);
        const _tempContents = siteData?.data?.pages[0]?.variants[0]?.content !== ' ' ? testJson : [];
        setSectionCtx(_tempContents);
      }
    }

    // setPagesArr(_finalPagesData);
    const _styleCtx = deepCloneArray(stylesCtx); // set styles 
    _styleCtx.styles = siteData?.data?.styles ? siteData?.data?.styles : [];
    setStylesCtx(_styleCtx);


    let _siteType = id !== _themeId ? "site" : "themesite";

    const _styleGlobCtx = deepCloneArray(stylesGlobCtx); // set global styles 
    if (id !== _themeId) {
      const globSiteData = await GetThemeSiteStyles(_themeId);
      if (globSiteData.status && id !== _themeId) {
        _styleGlobCtx.styles = globSiteData?.styles ? globSiteData?.styles : [];
        _siteType = "site";
      }
    }

    // SEO URL array creation
    if (siteData?.status && siteData?.data?.pages?.length) {

      const _seoUrl: any[] = [];
      for (let j = 0; j < siteData?.data?.pages?.length; j++) {
        _seoUrl.push({
          pageId: siteData?.data?.pages[j]?.id,
          seourl: siteData?.data?.pages[j]?.seourl,
          domainname: siteData?.data?.domainname,
        });
      }
      setPageSeoUrlCtx(_seoUrl);
    }

    setQueryData({ ...queryData, funnelId: id, siteType: _siteType, themeId: _themeId, pageId: siteData?.data?.pages[0]?.id });
    setStylesGlobCtx(_styleGlobCtx);

  }, [])

  useEffect(() => {
    if (uriInfo && siteInfo) {
      getNewData();
    } else {
      getDatas();
    }
  }, [uriInfo?.data?._id, siteInfo?.data?._id])

  useEffect(() => {

    const getMyTemplates = async() => {
      if(queryData?.funnelId && queryData?.themeId){
        const _myTemplatesData = await GetAllSectionTags("my-templates", queryData?.funnelId, queryData?.themeId);

        if(_myTemplatesData?.status){
          const _templatesData = [];
          const _templatesNameData = [];
          for(let i=0; i<_myTemplatesData?.data?.length; i++){
            const _tempContents = _myTemplatesData?.data[i]?.content ? JSON.parse(_myTemplatesData?.data[i]?.content) : "";
            _templatesData[_myTemplatesData?.data[i]?.id] = _tempContents;

            const _tempImg = _myTemplatesData?.data[i]?.screenshot;
            _templatesNameData[i] = {
              id:_myTemplatesData?.data[i]?.id,
              img:_tempImg
            }
          }
          setMyTemplatesCtx(_templatesData);
          setMyTemplatesNameCtx(_templatesNameData);
        }
      }
    }

    const getMyOverlay = async() => {
      if(queryData?.funnelId && queryData?.themeId){
        const _myOverlayData = await GetAllSectionTags("overlays", queryData?.funnelId, queryData?.themeId);

        if(_myOverlayData?.status){
          const _overlayData = [];
          const _overlayNameData = [];
          for(let i=0; i<_myOverlayData?.data?.length; i++){
            const _tempContents = _myOverlayData?.data[i]?.content ? JSON.parse(_myOverlayData?.data[i]?.content) : "";
            _overlayData[_myOverlayData?.data[i]?.id] = _tempContents;

            const _tempImg = _myOverlayData?.data[i]?.screenshot;
            _overlayNameData[i] = {
              id:_myOverlayData?.data[i]?.id,
              img:_tempImg
            }
          }
          setMyOverlayCtx(_overlayData);
          setMyOverlayNameCtx(_overlayNameData);
        }
      }
    }

    getMyTemplates();
    getMyOverlay();

  }, [queryData?.funnelId, queryData?.themeId])

  return (
    <Fragment>
      {
        id && token &&
        <>
       
          <div className='container-fluid'>
            <div className={`row`} >
              <div className={`${styles.previewPage} col-md-12}`}>
                {sectionCtx && stylesCtx ? 
                  <SectionUI 
                    secRefs={secRefs}
                    styles={sectionStyles}
                  /> 
                  : <img src={`${ENV.serverPath}images/dragndrop.png`} />}
                {isProcessing && <div className={styles.processingText}>Processing...</div>}
              </div>
            </div>
          </div>
          <ToastContainer position="bottom-right" theme="light" />
        </>
      }

      <StyleGenerater />
    </Fragment>
  )
}

export default memo(Previeweditor);