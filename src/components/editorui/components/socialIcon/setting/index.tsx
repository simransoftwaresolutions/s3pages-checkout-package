import { Fragment } from 'react';
import BoxShadowSetting from "../../commonsettings/BoxShadowSetting";
import StyleSelectorSettings from "../../commonsettings/StyleSelectorSettings";
import Border from "../../commonsettings/Border";
import Padding from "../../commonsettings/Padding";
import Margin from "../../commonsettings/Margin";
import Background from "../../commonsettings/Background";
import Mobile from "../../commonsettings/Mobile";
import Animation from "../../commonsettings/Animation";
import SocialIconSetting from "./SocialIconSetting";
import RatingSetting from "./RatingSetting";

const SocialIconComponentSettings = () => {
    return (
        <Fragment>
            <StyleSelectorSettings />
            <SocialIconSetting />
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

const RatingComponentSettings = () => {
    return (
        <Fragment>
            <StyleSelectorSettings />
            <RatingSetting />
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

export { SocialIconComponentSettings, RatingComponentSettings };