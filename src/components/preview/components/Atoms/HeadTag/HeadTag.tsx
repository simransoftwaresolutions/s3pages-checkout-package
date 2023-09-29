import styles from './HeadTag.module.css';
import { usePagesCtx } from '../../../../../context/preview/PagesContext';
import Head from 'next/head';
import { useState, useEffect } from 'react'; 
import { deepCloneArray } from "../../../../../utils/functions";


const HeadTag = () => {

    const { funnelPages, pageAction } = usePagesCtx();

    const [ pageData, setPageData] = useState<any>(null);

    useEffect(() => {

        const _fPages = deepCloneArray(funnelPages);

        let pIdx = pageAction?.activePage ? pageAction?.activePage : 0;
    
        const _setData = _fPages[pIdx]?.pageData?.settings?.length ? JSON.parse(_fPages[pIdx]?.pageData?.settings[0]) : null;
    
        const _pInfo = {
          title:_fPages[pIdx]?.pageData?.title,
          metaTitle:_setData && _setData.metaTitle ? _setData.metaTitle : "",
          headTracking:_setData && _setData.headTracking ? _setData.headTracking : "",
          url:_fPages[pIdx]?.pageData?.seourl,
          metaDesc:_setData && _setData.metaDesc ? _setData.metaDesc : "",
          bodyTracking:_setData && _setData.bodyTracking ? _setData.bodyTracking : "",
          openGraphTitle:_setData && _setData.openGraphTitle ? _setData.openGraphTitle : "",
          openGraphDesc:_setData && _setData.openGraphDesc ? _setData.openGraphDesc : "",
          openGraphImage:_setData && _setData.openGraphImage ? _setData.openGraphImage : "",
          searchTitle:_setData && _setData.searchTitle ? _setData.searchTitle : "",
          searchDesc:_setData && _setData.searchDesc ? _setData.searchDesc : "",
          searchImage:_setData && _setData.searchImage ? _setData.searchImage : "",
          isInfoUpdate:false,
          pageId:pIdx,
        }

        setPageData(_pInfo);

    }, [pageAction?.activePage, funnelPages])

    return (
        <>
            <Head>
                <title>{"Theme site"}</title>
                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta property="og:url" content="" />
                <meta property="og:type" content="" />
                <meta property="og:title" content="" />
                <meta property="og:description" content="" />
                <meta property="og:image" content="" />
                <meta charSet="UTF-8" />
                {/* <link rel="stylesheet" href="../../css/google.font.css"></link> */}
            </Head>
        </>
    );
};

export default HeadTag;