import { Fragment, useEffect } from 'react';
import { useSettingsCtx } from "../../../../context/editorui/SettingsContext";
import { useContentCtx } from "../../../../context/editorui/ContentsContext";
import { usePagesCtx } from "../../../../context/editorui/PagesContext";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import { PageMetadataSettings } from "../../components/commonsettings/MainPageSetting";
import { PageGenralSettings } from "../../components/commonsettings/PageSettings";
import ButtonComponentSettings from '../../components/button/setting';
import HeadingComponentSettings from '../../components/heading/setting';
import ProgresBarComponentSettings from '../../components/progress/setting';
import { SocialIconComponentSettings, RatingComponentSettings } from '../../components/socialIcon/setting';
import FaqComponentSettings from '../../components/faq/setting';
import SeparatorComponentSettings from '../../components/separator/setting';
import BannerComponentSettings from '../../components/banner/setting';
import MenuComponentSettings from '../../components/menu/setting';
import TimerComponentSettings from '../../components/timer/setting';
import HtmlComponentSettings from '../../components/html/setting';
import ImageComponentSettings from '../../components/image/setting';
import VideoComponentSettings from '../../components/video/setting';
import { OpenedFormComponentSettings, FormComponentSettings } from "../../components/form/setting";
import { MyComponentSectionSettings, OverlayComponentSettings, MyTemplatesComponentSettings, SectionComponentSettings } from "../../components/section/setting";
import { GridComponentSettings, ColumnComponentSettings } from "../../components/grid/setting";

const Settings = () => {

  const { openForm, setOpenForm, setIsSettingsOpen, setSelectedSetting } = useSettingsCtx();
  const { pageAction, setPageAction } = usePagesCtx();
  const { changeStyleOfElement } = useContentCtx();

  useEffect(() => {
    setOpenForm(false);
    defaultOpenedSetting();
    if(changeStyleOfElement.type !== "") setPageAction({...pageAction, showPageSetting:false});
  }, [changeStyleOfElement.type]);

  const backToSetting = () => { setOpenForm(false); }

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
          { openForm && <span onClick={backToSetting} title="Back" className='cursorPointer'> <ArrowBackOutlinedIcon fontSize='large' /></span>}
      </div>
      { pageAction?.showPageSetting && <PageMetadataSettings />}
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Page' &&  <PageGenralSettings />}
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Button' && <ButtonComponentSettings />}
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Heading' && <HeadingComponentSettings />}
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Progress' && <ProgresBarComponentSettings />}
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'SocialIcon' && changeStyleOfElement?.data?.eleInfo?.props?.sType === "SocialIcon" && <SocialIconComponentSettings /> }
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'SocialIcon' && changeStyleOfElement?.data?.eleInfo?.props?.sType === "Rating" && <RatingComponentSettings /> }
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Faq' &&  <FaqComponentSettings />}
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Separator' && <SeparatorComponentSettings /> }
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Banner' && <BannerComponentSettings />}
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Menu' && <MenuComponentSettings />}
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Timer' && <TimerComponentSettings />}
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Html' &&  <HtmlComponentSettings />}
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Image' && <ImageComponentSettings />}
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Video' && <VideoComponentSettings />}
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Form' && openForm && <OpenedFormComponentSettings />}
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Form' && !openForm && <FormComponentSettings />}
      { !pageAction.showPageSetting && ( changeStyleOfElement.type == 'Section') && 
          (changeStyleOfElement?.data?.eleInfo?.myTemplateId) && (!changeStyleOfElement?.data?.eleInfo?.myOverlayId) && (!changeStyleOfElement?.data?.eleInfo?.myComponentKey) &&
          <MyTemplatesComponentSettings />
      }
      { !pageAction.showPageSetting && ( changeStyleOfElement.type == 'Section') && 
          (changeStyleOfElement?.data?.eleInfo?.myOverlayId) && (!changeStyleOfElement?.data?.eleInfo?.myTemplateId) && (!changeStyleOfElement?.data?.eleInfo?.myComponentKey) &&
          <OverlayComponentSettings />
      }
      { !pageAction.showPageSetting && ( changeStyleOfElement.type == 'Section') && 
          (changeStyleOfElement?.data?.eleInfo?.myComponentKey) && (!changeStyleOfElement?.data?.eleInfo?.myOverlayId) && (!changeStyleOfElement?.data?.eleInfo?.myTemplateId) && 
          <MyComponentSectionSettings />
      }
      { !pageAction.showPageSetting && ( changeStyleOfElement.type == 'Section') && 
          (!changeStyleOfElement?.data?.eleInfo?.myTemplateId) && (!changeStyleOfElement?.data?.eleInfo?.myComponentKey) && (!changeStyleOfElement?.data?.eleInfo?.myOverlayId) &&  
          <SectionComponentSettings />
      }
      { !pageAction.showPageSetting && ( changeStyleOfElement.type == 'Column') && <ColumnComponentSettings /> }
      { !pageAction.showPageSetting && changeStyleOfElement.type == 'Grid' && <GridComponentSettings /> }
    </Fragment>
  )
}

export default Settings;
