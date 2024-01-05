import { Fragment } from 'react';
import BoxShadowSetting from "../../commonsettings/BoxShadowSetting";
import FaqGenSetting from './FaqGenSetting';
import FaqRowSetting from './FaqRowSetting';
import FaqQuestionSetting from './FaqQuestionSetting';
import FaqAnswerSetting from './FaqAnswerSetting';

const FaqComponentSettings = () => {
    return (
        <Fragment>
            <FaqGenSetting />
            <FaqRowSetting />
            <FaqQuestionSetting />
            <FaqAnswerSetting />
            <BoxShadowSetting />
        </Fragment>
    )
}

export default FaqComponentSettings;