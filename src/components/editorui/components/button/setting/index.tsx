import { Fragment } from 'react';
import BoxShadowSetting from "../../commonsettings/BoxShadowSetting";
import StyleSelectorSettings from "../../commonsettings/StyleSelectorSettings";
import Border from "../../commonsettings/Border";
import Padding from "../../commonsettings/Padding";
import Margin from "../../commonsettings/Margin";
import Background from "../../commonsettings/Background";
import Mobile from "../../commonsettings/Mobile";
import Animation from "../../commonsettings/Animation";
import ButtonFont from "./ButtonFont";
import MainButton from "./MainButton";
import ButtonSubText from "./ButtonSubText";

const ButtonComponentSettings = () => {
    return (
        <Fragment>
            <StyleSelectorSettings />
            <ButtonFont />
            <MainButton />
            <ButtonSubText />
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

export default ButtonComponentSettings;