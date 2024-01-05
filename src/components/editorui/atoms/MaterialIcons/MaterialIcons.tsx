import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined';
import ViewHeadlineOutlinedIcon from '@mui/icons-material/ViewHeadlineOutlined';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import SmartButtonOutlinedIcon from '@mui/icons-material/SmartButtonOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import CropLandscapeOutlinedIcon from '@mui/icons-material/CropLandscapeOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import WebIcon from '@mui/icons-material/Web';
import SourceIcon from '@mui/icons-material/Source';
import StorageIcon from '@mui/icons-material/Storage';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

interface ButtonProps{
    name:string;
    // fontSize?:string;
    iconclass?:string;
}

const MaterialIcons = ({ name, iconclass="" }:ButtonProps) => {

    switch(name){
        case 'Pages':
            return <WebIcon className={`${iconclass}`} />;
        break;    
        case 'Settings':
            return <SettingsSuggestOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Blocks':
            return <ViewInArOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Elements':
            return <ViewCompactOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Collections':
            return <StorageIcon className={`${iconclass}`} />;
        break;    
        case 'Banner':
            return <ViewCarouselIcon className={`${iconclass}`} />;
        break;    
        case 'Sections':
            return <AccountTreeOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Popups':
            return <CallToActionOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Grids':
            return <GridOnOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Buttons':
            return <SmartButtonOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Forms':
            return <InsertDriveFileOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Timers':
            return <TimerOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Video':
            return <VideocamOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Image':
            return <BrokenImageOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Progress Bar':
            return <CropLandscapeOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Social Icons':
            return <FacebookOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Menu':
            return <MenuOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Text':
            return <TitleOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Seperators':
            return <RemoveOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'HTML':
            return <CodeOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'Twitter':
            return <TwitterIcon className={`${iconclass}`} />;
        break;    
        case 'Instagram':
            return <InstagramIcon className={`${iconclass}`} />;
        break;
        case 'Facebook':
            return <FacebookOutlinedIcon className={`${iconclass}`} />;
        break;    
        case 'LinkedIn':
            return <LinkedInIcon className={`${iconclass}`} />;
        break;    
        case 'YouTube':
            return <YouTubeIcon className={`${iconclass}`} />;
        break;    
        case 'Pinterest':
            return <PinterestIcon className={`${iconclass}`} />;
        break;    
        default:
            return <></>;
        break;    
    }

};

export default MaterialIcons;