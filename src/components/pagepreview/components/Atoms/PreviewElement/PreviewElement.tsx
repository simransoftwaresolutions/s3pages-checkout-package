import styles from '../../../../../styles/pagepreview/PreviewElement.module.css';
import { 
    ButtonElements, 
    HeadingElements, 
    ProgressElements,
    SocialIconElements, 
    SeparatorElements, 
    MenuElements, 
    TimerElements, 
    HtmlElements, 
    ImageElements,
    VideoElements, 
    FormElements, 
} from "../../../components/MainContent/MainSubElement";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useState, useRef} from "react";
import { usePushCtx } from '../../../../../context/pagepreview/PushContext';
import ENV from '../../../../../utils/env';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';

interface PreviewEleType {
    data?:any;
    type?:string;
}

const PreviewElement = ({data, type}:PreviewEleType) => {

    const { showSettingCtx, setShowSettingCtx } = usePushCtx();
    const { saveElementsData, setSaveElementsData, queryData } = usePagesCtx();
    const [ viewState, setViewState ] = useState('desktop');
    const btnRef = useRef<any>(null);
    const progRef = useRef<any>(null);
    const sIconRef = useRef<any>(null);
    const sepRef = useRef<any>(null);
    const menuRef = useRef<any>(null);
    const timerRef = useRef<any>(null);
    const htmlRef = useRef<any>(null);
    const imgRef = useRef<any>(null);
    const videoRef = useRef<any>(null);
    const formRef = useRef<any>(null);
    const textRef = useRef<any>(null);

    const topBar = (type:string, data:any) => {
        if(ENV.isViewReadOnly === true) return <></>;
        return (
            <div className={`${styles.headBtnContain} row`}>
            
                <div className="col-md-1">
                  <FormatListBulletedIcon className={`${styles.curPointer}`} fontSize='medium' onClick={() => setShowSettingCtx(!showSettingCtx)} />
                </div>
                <div className="col-md-4">
                    
                    <div className={`${styles.viewSizes}`}>
                    
                    <span className={`${styles.SetSizes}`}>
                        <button className={viewState === 'desktop' ? styles.activeDevice : ''} onClick={() => setViewState('desktop')}>
                        <div className="tooltip">
    
                        <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25">
                            <path d="M336 936v-35l84-85H140q-24 0-42-18t-18-42V276q0-24 
                        18-42t42-18h680q24 0 42 18t18 42v480q0 24-18 42t-42 18H540l84 85v35H336ZM140 
                        660h680V276H140v384Zm0 0V276v384Z"/></svg>
                         <span className="tooltiptext">Desktop View</span>
                                </div>
                        </button>
                        <button className={viewState === 'tablet' ? styles.activeDevice : ''} onClick={() => setViewState('tablet')}>
                        <div className="tooltip">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20">
                            <path d="M260 1016q-24 0-42-18t-18-42V196q0-24 18-42t42-18h440q24 0 42 18t18 42v760q0 24-18 42t-42 
                            18H260Zm0-150v90h440v-90H260Zm220.175 75q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 
                            0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM260 
                        806h440V286H260v520Zm0-580h440v-30H260v30Zm0 640v90-90Zm0-640v-30 30Z"/></svg>
                             <span className="tooltiptext">Tablet View</span>
                        </div>
    
                        </button>
                        <button className={viewState === 'phone' ? styles.activeDevice : ''} onClick={() => setViewState('phone')}>
                        <div className="tooltip">
                        <svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 96 960 960" width="15">
                            <path d="M260 1016q-24 0-42-18t-18-42V196q0-24 18-42t42-18h440q24 0 42 18t18 42v760q0 24-18 42t-42 
                        18H260Zm0-90v30h440v-30H260Zm0-60h440V286H260v580Zm0-640h440v-30H260v30Zm0 0v-30 30Zm0 700v30-30Z"/></svg>
                        <span className="tooltiptext">Phone View</span>
                                </div>
                        </button>
                        </span>
                    </div>
                </div>
    
                <div className="col-md-7">
                    <div className={`${styles.prevSve}`}>
                        <div className={`${styles.viewSizes1}`}>
                            <button>
                                <div className="tooltip"> <SaveOutlinedIcon fontSize="medium" data-bs-toggle="modal" data-bs-target="#saveElesModal" onClick={()=>handleSaveElements(type, data)} />
                                    <span className="tooltiptext">Save</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const handleSaveElements = (type:string, data:any) => {
        const siteId = queryData?.funnelId;
        const themeId = queryData?.funnelId;
        setSaveElementsData({...saveElementsData, action:"edit", data:data, siteId:siteId, themeId:themeId, type:type, tags:type});
    }

    const drawElement = () => {
        switch(type){
            case "button":
                return (
                    <>
                        {topBar(type, data)}
                        <div><ButtonElements refBtn={btnRef} type={data?.eleInfo?.type} props={data?.eleInfo?.props} /></div>
                    </> 
                )
                break;
            case "progressBar":
                return (
                    <>
                        {topBar(type, data)}
                        <div style={{width:"300px"}}><ProgressElements refBtn={progRef} type={data?.eleInfo?.type} props={data?.eleInfo?.props} /></div>
                    </>
                )
                break;
            case "socialIcons":
                return (
                    <>
                        {topBar(type, data)}
                        <div><SocialIconElements refBtn={sIconRef} type={data?.eleInfo?.type} props={data?.eleInfo?.props} /></div>
                    </>
                )
                break;
            case "seprator":
                return (
                    <>
                        {topBar(type, data)}
                        <div style={{width:"300px"}}><SeparatorElements refBtn={sepRef} type={data?.eleInfo?.type} props={data?.eleInfo?.props} /></div>
                    </>
                )
                break;
            case "menu":
                return (
                    <>
                        {topBar(type, data)}
                        <div><MenuElements refBtn={menuRef} type={data?.eleInfo.type} props={data?.eleInfo?.props} /></div>
                    </>
                )
                break;
            case "timers":
                return (
                    <>
                        {topBar(type, data)}
                        <div><TimerElements refBtn={timerRef} type={data?.eleInfo.type} props={data?.eleInfo.props} /></div>
                    </>
                )
                break;
            case "html":
                return (
                    <>
                        {topBar(type, data)}
                        <div><HtmlElements refBtn={htmlRef} type={data?.eleInfo.type} props={data?.eleInfo.props} /></div>
                    </>
                )
                break;
            case "image":
                return (
                    <>
                        {topBar(type, data)}
                        <div><ImageElements refBtn={imgRef} type={data?.eleInfo.type} props={data?.eleInfo.props} /></div>
                    </>
                )
                break;
            case "video":
                return (
                    <>
                        {topBar(type, data)}
                        <div><VideoElements refBtn={videoRef} type={data?.eleInfo.type} props={data?.eleInfo.props} /></div>
                    </>
                )
                break;
            case "form":
                return (
                    <>
                        {topBar(type, data)}
                        <div><FormElements refBtn={formRef} type={data?.eleInfo.type} props={data?.eleInfo.props} /></div>
                    </>
                )
                break;
            case "headings":
                const eleRefIndex = "gridele_0_0_0_0";
                return (
                    <>
                        {topBar(type, data)}
                        <div><HeadingElements curEleSIndex={0} gridIdxs={[0,0,0]} headEleIdx={eleRefIndex} refBtn={textRef} type={data?.eleInfo.type} props={data?.eleInfo.props} /></div>
                    </>
                )
                break;
        }
    }

    return (
        <div className='section-print'>
            {drawElement()}
        </div>
    )

};

export default PreviewElement;