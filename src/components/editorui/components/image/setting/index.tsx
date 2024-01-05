import { Fragment } from 'react';
import BoxShadowSetting from "../../commonsettings/BoxShadowSetting";
import StyleSelectorSettings from "../../commonsettings/StyleSelectorSettings";
import Border from "../../commonsettings/Border";
import Padding from "../../commonsettings/Padding";
import Margin from "../../commonsettings/Margin";
import Background from "../../commonsettings/Background";
import Mobile from "../../commonsettings/Mobile";
import Animation from "../../commonsettings/Animation";
import ImageGeneralSetting from "./ImageGeneralSetting";

const ImageComponentSettings = () => {
    return (
        <Fragment>
            <StyleSelectorSettings />
            <ImageGeneralSetting />
            <Border />
            <Padding />
            <Margin />
            <Mobile />
            <Background />
            <Animation />
            <BoxShadowSetting />
        </Fragment>
    )
}

export default ImageComponentSettings;