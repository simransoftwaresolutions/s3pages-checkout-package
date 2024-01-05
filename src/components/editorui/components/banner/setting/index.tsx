import BannerContentSetting from "./BannerContentSetting";
import BannerGenSetting from "./BannerGenSetting";
import BannerImageSetting from "./BannerImageSetting";
import BannerLabelSetting from "./BannerLabelSetting";
import BoxShadowSetting from "../../commonsettings/BoxShadowSetting";
import { Fragment } from 'react';

const BannerComponentSettings = () => {
    return (
        <Fragment>
            <BannerGenSetting />
            <BannerImageSetting />
            <BannerLabelSetting />
            <BannerContentSetting />
            <BoxShadowSetting />
        </Fragment>
    )
}

export default BannerComponentSettings;