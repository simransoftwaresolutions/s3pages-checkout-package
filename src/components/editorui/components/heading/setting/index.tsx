import { Fragment } from 'react';
import BoxShadowSetting from "../../commonsettings/BoxShadowSetting";
import StyleSelectorSettings from "../../commonsettings/StyleSelectorSettings";
import Border from "../../commonsettings/Border";
import Padding from "../../commonsettings/Padding";
import Margin from "../../commonsettings/Margin";
import Background from "../../commonsettings/Background";
import Mobile from "../../commonsettings/Mobile";
import Animation from "../../commonsettings/Animation";
import GeneralText from "./GeneralText";

const HeadingComponentSettings = () => {
    return (
        <Fragment>
            <StyleSelectorSettings />
            <GeneralText />
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

export default HeadingComponentSettings;