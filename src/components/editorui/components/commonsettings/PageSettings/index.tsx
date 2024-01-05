import PageSettings from "./PageSettings";
import StyleSelectorSettings from "../StyleSelectorSettings";
import { Fragment } from 'react';

const PageGenralSettings = () => {
    return (
        <Fragment>
            <StyleSelectorSettings />
            <PageSettings />
        </Fragment>
    )
}
export { PageGenralSettings, PageSettings } ;