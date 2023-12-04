"use client";

import { Fragment, memo } from "react";
import { useSettingsCtx } from '../../context/pagepreview/SettingsContext';
import DragdropPopup from './components/Atoms/DragdropPopup';

const ComponentSettings = () => {

  const { isSettingsOpen } = useSettingsCtx();

  return <Fragment>
    {isSettingsOpen && <div style={{position:"absolute", top:"0", zIndex: "999" }}><DragdropPopup /></div>}
  </Fragment>
}

export default memo(ComponentSettings);
