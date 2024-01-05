import { Fragment } from 'react';
import BoxShadowSetting from "../../commonsettings/BoxShadowSetting";
import StyleSelectorSettings from "../../commonsettings/StyleSelectorSettings";
import Border from "../../commonsettings/Border";
import Padding from "../../commonsettings/Padding";
import Margin from "../../commonsettings/Margin";
import Background from "../../commonsettings/Background";
import Mobile from "../../commonsettings/Mobile";
import Animation from "../../commonsettings/Animation";
import HtmlSetting from "./HtmlSetting";

const HtmlComponentSettings = () => {
    return (
        <Fragment>
            <StyleSelectorSettings />
            <HtmlSetting />
            <Background />
            <Border />
            <Padding />
            <Margin />
            <Mobile />
            <Animation />
            <BoxShadowSetting />
        </Fragment>
    )
}

export default HtmlComponentSettings;