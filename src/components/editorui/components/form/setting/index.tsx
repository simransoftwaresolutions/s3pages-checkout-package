import { Fragment } from 'react';
import BoxShadowSetting from "../../commonsettings/BoxShadowSetting";
import StyleSelectorSettings from "../../commonsettings/StyleSelectorSettings";
import Border from "../../commonsettings/Border";
import Padding from "../../commonsettings/Padding";
import Margin from "../../commonsettings/Margin";
import Background from "../../commonsettings/Background";
import Mobile from "../../commonsettings/Mobile";
import Animation from "../../commonsettings/Animation";
import FormEditSetting from "./FormEditSetting";
import FormSetting from "./FormSetting";

const FormComponentSettings = () => {
    return (
        <Fragment>
            <StyleSelectorSettings />
            <FormSetting />
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

const OpenedFormComponentSettings = () => {
    return (
        <Fragment>
            <StyleSelectorSettings />
            <FormEditSetting />
        </Fragment>
    )
}

export { FormComponentSettings, OpenedFormComponentSettings };