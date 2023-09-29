// import type { NextPage } from 'next';
import { Fragment } from 'react';
import MainContent from '../preview/components/MainContent';
import styles from '../../styles/preview/Home.module.css';
import ENV from '../../utils/env';
import { usePushCtx } from "../../context/preview/PushContext";
import { usePagesCtx } from "../../context/preview/PagesContext";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StyleGenerater from '../preview/components/Atoms/StyleGenerater';
import { GetSiteData, GetThemeSiteStyles } from "../../service/preview/PagesServices";
import { deepCloneArray } from '../../utils/functions';
import { useContentCtx } from "../../context/preview/ContentsContext";

interface MyeditorProps {
  id?:any;
  token?:any;
}

const Myeditorcomp  = ({id, token}:MyeditorProps) => {

  ENV.isViewReadOnly = true;

  const { isProcessing } = usePushCtx();
  const { pageAction, setPageAction } = usePagesCtx();
  const { queryData, setQueryData, setGFonts, stylesGlobCtx, setStylesGlobCtx, setCssFromSettings } = usePagesCtx();
  const { funnelPages, setFunnelPages, stylesCtx, setStylesCtx } = usePagesCtx();
  const { sectionCtx,setSectionCtx } = useContentCtx();

  // const {token} = router.query;
  // const {id} = router.query;

  useEffect(() => {
    if(id && token){
      ENV.auth = token.toString();
      setQueryData({...queryData, funnelId: id, token:token});
    }
   }, [id, token]);


  useEffect(() => {
    
    const getDatas = async() => {
  
      if(!queryData.funnelId) return;

      let _themeId = "";
      // let _themeId = "64661c4927827070ff3212e5";
      const siteData = await GetSiteData(queryData.funnelId);
      
      // set sections ctx
      if(siteData?.status && siteData?.data?.pages[0]){
        _themeId = siteData?.data?.themeId || queryData.funnelId;

        const _gFntFamily = (siteData?.data?.settings);

        if(_gFntFamily?.styles?.length){
          setCssFromSettings(_gFntFamily?.styles || []);
        }

        if(siteData?.data?.pages[0]?.variants[0]){
          const testJson = JSON.parse(siteData?.data?.pages[0]?.variants[0]?.content);
          const _tempContents = siteData?.data?.pages[0]?.variants[0]?.content !== ' ' ? testJson : [];
          setSectionCtx(_tempContents);
        }
      }

      // setPagesArr(_finalPagesData);
      const _styleCtx = deepCloneArray(stylesCtx); // set styles 
      _styleCtx.styles = siteData?.data?.styles ? siteData?.data?.styles: [];
      setStylesCtx(_styleCtx);


      let _siteType = queryData.funnelId !== _themeId ? "site" : "themesite";

      const _styleGlobCtx = deepCloneArray(stylesGlobCtx); // set global styles 
      if(_themeId){
        const globSiteData = await GetThemeSiteStyles(_themeId);
        if(globSiteData.status && queryData.funnelId !== _themeId){
          _styleGlobCtx.styles = globSiteData?.styles ? globSiteData?.styles: [];
          _siteType = "site";
        }
      }

      setQueryData({...queryData, siteType:_siteType, themeId:_themeId});
      setStylesGlobCtx(_styleGlobCtx);

    }

    getDatas();
    
  }, [queryData.funnelId])

  return (
    <Fragment>
      {
      id && token && ENV.auth &&
        <>
          <div className='container-fluid'>
            <div  className={`row`} >
              <div className={`${styles.previewPage} col-md-12}`}>
                {sectionCtx && stylesCtx ? <MainContent /> : <img src={`${ENV.serverPath}images/dragndrop.png`} /> }
                {isProcessing && <div className={styles.processingText}>Processing...</div>}
              </div>
            </div>
          </div>
          <ToastContainer position="bottom-right" theme="light"/>
        </> 
      }

      <StyleGenerater />
    </Fragment>
  )
}

export default Myeditorcomp;
