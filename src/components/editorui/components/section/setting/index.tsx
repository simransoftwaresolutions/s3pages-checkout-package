import { Fragment } from 'react';
import BoxShadowSetting from "../../commonsettings/BoxShadowSetting";
import StyleSelectorSettings from "../../commonsettings/StyleSelectorSettings";
import Border from "../../commonsettings/Border";
import Padding from "../../commonsettings/Padding";
import Margin from "../../commonsettings/Margin";
import Background from "../../commonsettings/Background";
import Mobile from "../../commonsettings/Mobile";
import Animation from "../../commonsettings/Animation";
import SectionGenSettings from "./SectionGenSettings";
import MyTemplatesSettings from "./MyTemplatesSettings";
import OverlaySectionSettings from "./OverlaySectionSettings";
import MyComponentSettings from "./MyComponentSettings";

const SectionComponentSettings = () => {
    return (
        <Fragment>
            <StyleSelectorSettings />
            <SectionGenSettings />
            <Border />
            <Padding />
            <Margin />
            <Background />
            <Mobile />
            <Animation />
            <BoxShadowSetting />
        </Fragment>
    )
}

const MyTemplatesComponentSettings = () => {
    return (
        <Fragment>
            <MyTemplatesSettings />
        </Fragment>
    )
}

const OverlayComponentSettings = () => {
    return (
        <Fragment>
            <OverlaySectionSettings />
        </Fragment>
    )
}

const MyComponentSectionSettings = () => {
    return (
        <Fragment>
            <MyComponentSettings />
        </Fragment>
    )
}

export { SectionComponentSettings, MyTemplatesComponentSettings, OverlayComponentSettings, MyComponentSectionSettings };