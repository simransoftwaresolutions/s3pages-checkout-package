import { Fragment } from 'react';
import { useState, useEffect, useRef } from 'react';
import PageSettings from '../../StyleSettings/PageSettings'
import Border from '../../StyleSettings/Border'
import Background from '../../StyleSettings/Background'
import Margin from '../../StyleSettings/Margin'
import Padding from '../../StyleSettings/Padding'
import Mobile from '../../StyleSettings/Mobile'
import Animation from '../../StyleSettings/Animation'
import MainButton from '../../StyleSettings/MainButton'
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import ButtonSubText from '../../StyleSettings/ButtonSubText'
import ButtonFont from '../../StyleSettings/ButtonFont'
import GeneralText from '../../StyleSettings/GeneralText'
import ProBarSettings from '../../StyleSettings/ProBarSettings'

import BannerSetting from '../../StyleSettings/BannerSetting'
import SocialIconSetting from '../../StyleSettings/SocialIconSetting'
import RatingSetting from '../../StyleSettings/RatingSetting';
import SeparatorSettings from '../../StyleSettings/SeparatorSettings'
import MenuSetting from '../../StyleSettings/MenuSetting'
import TimerFormatSetting from '../../StyleSettings/TimerFormatSetting'
import TimerLabelSetting from '../../StyleSettings/TimerLabelSetting'
import TimerGeneralSetting from '../../StyleSettings/TimerGeneralSetting'
import HtmlSetting from '../../StyleSettings/HtmlSetting'
import VideoSetting from '../../StyleSettings/VideoSetting'
import ImageGeneralSetting from '../../StyleSettings/ImageGeneralSetting'
import FormSetting from '../../StyleSettings/FormSetting'
import FormEditSetting from '../../StyleSettings/FormEditSetting'
import { GeneralPageSetting, SeoPageSetting, GraphPageSetting, SiteSearchPageSetting, CustomPageSetting } from '../../StyleSettings/MainPageSetting';
import SectionGenSettings from '../../StyleSettings/SectionGenSettings';
import OverlaySectionSettings from '../../StyleSettings/OverlaySectionSettings';
import GridGenSettings from '../../StyleSettings/GridGenSettings';
import ColumnGenSettings from '../../StyleSettings/ColumnGenSettings';
import StyleSelectorSettings from '../../StyleSettings/StyleSelectorSettings';
import FaqStyleSelectorSetting from '../../StyleSettings/FaqStyleSelectorSetting';
import FaqGenSetting from '../../StyleSettings/FaqGenSetting';
import FaqQuestionSetting from '../../StyleSettings/FaqQuestionSetting';
import FaqAnswerSetting from '../../StyleSettings/FaqAnswerSetting';
import FaqRowSetting from '../../StyleSettings/FaqRowSetting';
import FaqSetting from '../../StyleSettings/FaqSetting';
import BannerGenSetting from '../../StyleSettings/BannerGenSetting';
import BannerImageSetting from '../../StyleSettings/BannerImageSetting';
import BannerLabelSetting from '../../StyleSettings/BannerLabelSetting';
import BannerContentSetting from '../../StyleSettings/BannerContentSetting';
import { useSettingsCtx } from "../../../../../context/pagepreview/SettingsContext";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { usePagesCtx } from "../../../../../context/pagepreview/PagesContext";
import { useContentCtx } from "../../../../../context/pagepreview/ContentsContext";
import BoxShadowSetting from '../../StyleSettings/BoxShadowSetting';
import MyTemplatesSettings from '../../StyleSettings/MyTemplatesSettings';
import MyComponentSettings from '../../StyleSettings/MyComponentSettings';

const Settings = () => {

  const { openForm, setOpenForm, setIsSettingsOpen, setSelectedSetting } = useSettingsCtx();
  const { pageAction, setPageAction } = usePagesCtx();

  ///////////////////////////////////////////////////////////////////////////////////////////////
  const { 
    changeStyleOfElement,
  } = useContentCtx();
  ///////////////////////////////////////////////////////////////////////////////////////////////
  console.log("slider----------",changeStyleOfElement)
  useEffect(() => {
    setOpenForm(false);
    defaultOpenedSetting();
    if(changeStyleOfElement.type !== "") setPageAction({...pageAction, showPageSetting:false});
  }, [changeStyleOfElement.type]);

  const backToSetting = () => {
    setOpenForm(false);
  }

  const defaultOpenedSetting = () => {
    if(pageAction?.showPageSetting){
      setSelectedSetting("gen_sub_page_setting");
      return;
    }
    setSelectedSetting("style_sel_gen_setting");
    return;
  }

  return (
    <Fragment>
        <div className='sectionSettingTop'>
          {
            openForm && (
              <span onClick={backToSetting} title="Back" className='cursorPointer'>
                <ArrowBackOutlinedIcon fontSize='large' />
              </span>
            )
          }
        </div>
        {
          pageAction?.showPageSetting && (
            <>
              <GeneralPageSetting />
              <SeoPageSetting />
              <GraphPageSetting />
              <SiteSearchPageSetting />
              <CustomPageSetting />
            </>
          )
        }
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Page' && (
            <>
              <StyleSelectorSettings />
              <PageSettings />
            </>
          )
        }
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Button' && (
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
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Heading' && (
            <Fragment>
              <StyleSelectorSettings />
              <GeneralText />
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
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Progress' && (
            <Fragment>
              <StyleSelectorSettings />
              <ProBarSettings />
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
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'SocialIcon' && (
            <Fragment>
              <StyleSelectorSettings />
              { changeStyleOfElement?.data?.eleInfo?.props?.sType === "SocialIcon" && <SocialIconSetting /> }
              { changeStyleOfElement?.data?.eleInfo?.props?.sType === "Rating" && <RatingSetting /> }
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
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Faq' && (
            <Fragment>
              <FaqGenSetting />
              <FaqRowSetting />
              <FaqQuestionSetting />
              <FaqAnswerSetting />
              <BoxShadowSetting />
            </Fragment>
          )
        }
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Separator' && (
            <Fragment>
              <StyleSelectorSettings />
              <SeparatorSettings />
              <Border />
              <Padding />
              <Margin />
              <Mobile />
              <Animation />
              <BoxShadowSetting />
            </Fragment>
          )
        }
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Banner' && (
            <Fragment>
              <BannerGenSetting />
              <BannerImageSetting />
              <BannerLabelSetting />
              <BannerContentSetting />
              <BoxShadowSetting />
            </Fragment>
          )
        }
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Menu' && (
            <Fragment>
              <StyleSelectorSettings />
              <MenuSetting />
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
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Timer' && (
            <Fragment>
              <StyleSelectorSettings />
              <TimerGeneralSetting />
              <TimerFormatSetting />
              <TimerLabelSetting />
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
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Html' && (
            <Fragment>
              <StyleSelectorSettings />
              <HtmlSetting />
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
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Image' && (
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
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Video' && (
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
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Form' && (
            <Fragment>
              <StyleSelectorSettings />
              {
                openForm ?
                (
                  <FormEditSetting />
                ):(
                  <Fragment>
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
            </Fragment>
          )
        }
        {
          !pageAction.showPageSetting && ( changeStyleOfElement.type == 'Section') && 
          (changeStyleOfElement?.data?.eleInfo?.myTemplateId) && 
          (!changeStyleOfElement?.data?.eleInfo?.myOverlayId) && 
          (!changeStyleOfElement?.data?.eleInfo?.myComponentKey) &&
          (
            <Fragment>
              <MyTemplatesSettings />
            </Fragment>
          )
        }
        {
          !pageAction.showPageSetting && ( changeStyleOfElement.type == 'Section') && 
          (changeStyleOfElement?.data?.eleInfo?.myOverlayId) && 
          (!changeStyleOfElement?.data?.eleInfo?.myTemplateId) &&
          (!changeStyleOfElement?.data?.eleInfo?.myComponentKey) &&
          (
            <Fragment>
              <OverlaySectionSettings />
            </Fragment>
          )
        }
        {
          !pageAction.showPageSetting && ( changeStyleOfElement.type == 'Section') && 
          (changeStyleOfElement?.data?.eleInfo?.myComponentKey) &&
          (!changeStyleOfElement?.data?.eleInfo?.myOverlayId) &&  
          (!changeStyleOfElement?.data?.eleInfo?.myTemplateId) && 
          (
            <Fragment>
              <MyComponentSettings />
            </Fragment>
          )
        }
        {
          !pageAction.showPageSetting && ( changeStyleOfElement.type == 'Section') && 
          (!changeStyleOfElement?.data?.eleInfo?.myTemplateId) && 
          (!changeStyleOfElement?.data?.eleInfo?.myComponentKey) &&
          (!changeStyleOfElement?.data?.eleInfo?.myOverlayId) &&  
          (
            <Fragment>
              <StyleSelectorSettings />
              <SectionGenSettings />
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
        {
          !pageAction.showPageSetting && ( changeStyleOfElement.type == 'Column') && (
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
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Grid' && (
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
        {
          !pageAction.showPageSetting && changeStyleOfElement.type == 'Slider' && (
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
    </Fragment>
  )
}

export default Settings;
