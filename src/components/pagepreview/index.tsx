"use client";
// import type { NextPage } from 'next';
import Previeweditor from './previeweditor';
import '../../styles/pagepreview/globals.css';
// import '../styles/globals.css';
import "../../styles/pagepreview/bootstrap-grid.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css';
import { Fragment, useEffect } from "react";
import { SettingsProvider } from "../../context/pagepreview/SettingsContext";
import { PushProvider } from "../../context/pagepreview/PushContext";
import { PagesProvider } from '../../context/pagepreview/PagesContext';
import { ContentsProvider } from '../../context/pagepreview/ContentsContext';
import { CollectionProvider } from '../../context/pagepreview/CollectionModal';
import { CollectionDataProvider } from '../../context/pagepreview/CollectionDataModal';
import { SettingProvider } from '../../context/pagepreview/SettingModal';
// import 'react-quill/dist/quill.snow.css';
import '../../styles/pagepreview/custom.css';

const PreviewPage = () => {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap" as any);
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
                    <Previeweditor />
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
