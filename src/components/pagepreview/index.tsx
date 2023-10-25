"use client";
// import type { NextPage } from 'next';
import Previeweditor from './previeweditor';

// import '../styles/globals.css';
import "../../styles/pagepreview/bootstrap-grid.css";
import 'bootstrap/dist/css/bootstrap.css';
// import 'animate.css';
import { Fragment, useEffect } from "react";
import { SettingsProvider } from "../../context/pagepreview/SettingsContext";
import { PushProvider } from "../../context/pagepreview/PushContext";
import { PagesProvider } from '../../context/pagepreview/PagesContext';
import { ContentsProvider } from '../../context/pagepreview/ContentsContext';
import { CollectionProvider } from '../../context/pagepreview/CollectionModal';
import { CollectionDataProvider } from '../../context/pagepreview/CollectionDataModal';
import { SettingProvider } from '../../context/pagepreview/SettingModal';
// import 'react-quill/dist/quill.snow.css';

interface PreviewPageProps {
  siteInfo?:any;
  uriInfo?:any;
}

const PreviewPage = ({siteInfo, uriInfo}:PreviewPageProps) => {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <Fragment>
      <PagesProvider>
        <ContentsProvider>
          <PushProvider>
            <SettingsProvider>
              <CollectionProvider>
                <CollectionDataProvider>
                  <SettingProvider>
                    <Previeweditor siteInfo={siteInfo} uriInfo={uriInfo} />
                  </SettingProvider>
                </CollectionDataProvider>
              </CollectionProvider>
            </SettingsProvider>
          </PushProvider>
        </ContentsProvider>
      </PagesProvider>
    </Fragment>
  )
}

export default PreviewPage;
