"use client";
// import type { NextPage } from 'next';
import Myeditor from './myeditor';
import '../../styles/preview/globals.css';
// import '../styles/globals.css';
import "../../styles/preview/bootstrap-grid.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css';
import { Fragment, useEffect } from "react";
import { SettingsProvider } from "../../context/preview/SettingsContext";
import { PushProvider } from "../../context/preview/PushContext";
import { PagesProvider } from '../../context/preview/PagesContext';
import { ContentsProvider } from '../../context/preview/ContentsContext';
import { CollectionProvider } from '../../context/preview/CollectionModal';
import { CollectionDataProvider } from '../../context/preview/CollectionDataModal';
import { SettingProvider } from '../../context/preview/SettingModal';
// import 'react-quill/dist/quill.snow.css';
import HeadTag from './components/Atoms/HeadTag';
import '../../styles/preview/custom.css';

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
                    <HeadTag />
                    <Myeditor />
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
