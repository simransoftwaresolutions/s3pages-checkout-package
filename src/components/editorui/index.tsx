"use client";
import Previeweditor from './previeweditor';
import '../../styles/editorui/globals.css';
import 'animate.css';
import { Fragment, memo, useEffect } from "react";
import { SettingsProvider } from "../../context/editorui/SettingsContext";
import { PushProvider } from "../../context/editorui/PushContext";
import { PagesProvider } from '../../context/editorui/PagesContext';
import { ContentsProvider } from '../../context/editorui/ContentsContext';
import { CollectionProvider } from '../../context/editorui/CollectionModal';
import { CollectionDataProvider } from '../../context/editorui/CollectionDataModal';
import { SettingProvider } from '../../context/editorui/SettingModal';

interface EditorUiProps {
  siteInfo?: any;
  uriInfo?: any;
}

const EditorUi = ({ siteInfo, uriInfo }: EditorUiProps) => {

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

export default memo(EditorUi);
