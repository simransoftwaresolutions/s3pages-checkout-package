// import MainPageSetting from "./MainPageSetting";
import GeneralPageSetting from "./GeneralPageSetting";
import SeoPageSetting from "./SeoPageSetting";
import GraphPageSetting from "./GraphPageSetting";
import SiteSearchPageSetting from "./SiteSearchPageSetting";
import CustomPageSetting from "./CustomPageSetting";

import { Fragment } from 'react';

const PageMetadataSettings = () => {
    return (
        <Fragment>
            <GeneralPageSetting />
            <SeoPageSetting />
            <GraphPageSetting />
            <SiteSearchPageSetting />
            <CustomPageSetting />
        </Fragment>
    )
}

export { GeneralPageSetting, SeoPageSetting, GraphPageSetting, SiteSearchPageSetting, CustomPageSetting, PageMetadataSettings }