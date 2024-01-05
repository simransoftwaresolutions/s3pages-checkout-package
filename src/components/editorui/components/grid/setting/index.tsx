import { Fragment } from 'react';
import BoxShadowSetting from "../../commonsettings/BoxShadowSetting";
import StyleSelectorSettings from "../../commonsettings/StyleSelectorSettings";
import Border from "../../commonsettings/Border";
import Padding from "../../commonsettings/Padding";
import Margin from "../../commonsettings/Margin";
import Background from "../../commonsettings/Background";
import Mobile from "../../commonsettings/Mobile";
import Animation from "../../commonsettings/Animation";
import GridGenSettings from "./GridGenSettings";
import ColumnGenSettings from "./ColumnGenSettings";

const GridComponentSettings = () => {
    return (
        <Fragment>
            <StyleSelectorSettings />
            <GridGenSettings />
            <Border />
            <Padding />
            <Margin />
            <Background />
            <Mobile />
            <Animation />
        </Fragment>
    )
}

const ColumnComponentSettings = () => {
    return (
        <Fragment>
            <StyleSelectorSettings />
            <ColumnGenSettings />
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

export { GridComponentSettings, ColumnComponentSettings };