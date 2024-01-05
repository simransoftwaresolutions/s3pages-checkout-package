import { Fragment } from 'react';
import BoxShadowSetting from "../../commonsettings/BoxShadowSetting";
import StyleSelectorSettings from "../../commonsettings/StyleSelectorSettings";
import Border from "../../commonsettings/Border";
import Padding from "../../commonsettings/Padding";
import Margin from "../../commonsettings/Margin";
import Mobile from "../../commonsettings/Mobile";
import Animation from "../../commonsettings/Animation";
import VideoSetting from "./VideoSetting";

const VideoComponentSettings = () => {
    return (
        <Fragment>
            <StyleSelectorSettings />
            <VideoSetting />
            <Border />
            <Padding />
            <Margin />
            <Mobile />
            <Animation />
            <BoxShadowSetting />
        </Fragment>
    )
}

export default VideoComponentSettings;