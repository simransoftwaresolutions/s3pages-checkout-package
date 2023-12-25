import { createContext, useContext, ReactNode, useState } from 'react';
import { sectionType } from "./PushContext";

interface PagesContextData {
    showSectionPopup?:boolean;
    pageIndex?:number;
    activePage?:number;
    activeVariant?:number;
    pageVariants?:number[];
    isPageLoading?:boolean;
    splitVariant?:boolean;
    showMainContent?:string;
    showPageSetting?:boolean;
    tags?:any[];
}

interface PagesType {
    pageName:string;
    pageSectionCtx:any[];
    pageEleNumCtx:number;
}

interface PagesInfoType { // page info like title, meta title, url etc
    title?:string;
    metaTitle?:string;
    headTracking?:string;
    redirectUrl?:string;
    url?:string;
    isDefault?:number;
    metaDesc?:string;
    bodyTracking?:string;
    openGraphTitle?:string;
    openGraphDesc?:string;
    openGraphImage?:string;
    searchTitle?:string;
    searchDesc?:string;
    searchImage?:string;
    isInfoUpdate?:boolean;
    pageId:number;
}

export const defaultPagesInfo:PagesInfoType = {
    title:"",
    metaTitle:"",
    headTracking:"",
    redirectUrl:"",
    url:"",
    isDefault:0,
    metaDesc:"",
    bodyTracking:"",
    openGraphTitle:"",
    openGraphDesc:"",
    openGraphImage:"",
    searchTitle:"",
    searchDesc:"",
    searchImage:"",
    isInfoUpdate:false,
    pageId:-1,
}

interface UpdateSectionType {
    sectionEditEnable?:boolean;
    tagsName?:string;
    title?:string;
    id?:string;
    funnel?:string;
    deleteSection?:boolean;
    copySection?:boolean;
    copySectionDetails?:any;
    editSection?:boolean;
    editSectionDetails?:any;
    addSection?:boolean;
    addSectionDetails?:any;
    sectionIdx?:number;
}

const defaultUpdateSection:UpdateSectionType = {
    sectionEditEnable:false,
    tagsName:"",
    title:"",
    id:"",
    funnel:"",
    deleteSection:false,
    copySection:false,
    copySectionDetails:null,
    editSection:false,
    editSectionDetails:null,
    addSection:false,
    addSectionDetails:null,
    sectionIdx:0,
}

interface SaveElementsDataType {
    data?:any;
    action?:string;
    siteId?:string;
    themeId?:string;
    type?:string;
    tags?:string;
    id?:string;
    title?:string;
    showElement?:boolean;
    editId?:number;
}

const defaultSaveElementsData:SaveElementsDataType = {
    data:"",
    action:"",
    siteId:"",
    themeId:"",
    type:"",
    tags:"",
    id:"",
    title:"",
    showElement:false,
    editId:0,
}

export interface UserInfoType {
    role: string;
}

export const defaultUserInfo:UserInfoType = {
    role: "admin",
}

interface QueryDataType {
    funnelId:any;
    themeId:any;
    pageId:any;
    token:any;
    siteType:string;
}

export const defaultQueryData:QueryDataType = {
    funnelId:"",
    themeId:"",
    pageId:"",
    token:"",
    siteType:"",
}

// for css class array strat
interface CssClassDataType {
    type:string;
    name:string;
    selector:string;
    styles:string;
    device?:string;
    children?:CssClassDataType[];
  }
  
  interface CssStyleType {
    _id:string;
    data:CssClassDataType;
  }
  
  interface StylesCtxType { // array of all css class
    _id:string;
    styles:CssStyleType[];
  }
  
  
  const defaultCssClassData:CssClassDataType = {
    type:"",
    name:"",
    selector:"",
    styles:"",
    device:"desktop",
    children:[],
  }
  
  const defaultCssStyle:CssStyleType = {
    _id:"123456789000",
    data:defaultCssClassData,
  }
    
  const defaultStylesCtx:StylesCtxType = {
    _id:"236985471025",
    styles:[],
  }
  // for css class array end

  export interface ElementsArrType {
    button?:any[],
    html?:any[],
    progressBar?:any[],
    form?:any[],
    timers?:any[],
    video?:any[],
    image?:any[],
    socialIcons?:any[],
    menu?:any[],
    headings?:any[],
    seprator?:any[],
  }

  const defaultElementsArr:ElementsArrType = {
    button:[],
    html:[],
    progressBar:[],
    form:[],
    timers:[],
    video:[],
    image:[],
    socialIcons:[],
    menu:[],
    headings:[],
    seprator:[],
  }

type pagesContextType = {
    pagesArr: PagesType[];
    setPagesArr:(ele:PagesType[]) => void;

    hideOverlayArr: number[];
    setHideOverlayArr:(hideOverlayArr:number[]) => void;

    funnelPages: any[];
    setFunnelPages:(ele:any[]) => void;

    pageAction:PagesContextData;
    setPageAction: (pageAction:PagesContextData) => void,

    userInfo:UserInfoType;
    setUserInfo: (userInfo:UserInfoType) => void,

    pagesInfo:PagesInfoType;
    setPagesInfo: (pagesInfo:PagesInfoType) => void,

    stylesCtx:StylesCtxType;
    setStylesCtx: (stylesCtx:StylesCtxType) => void,

    stylesGlobCtx:StylesCtxType;
    setStylesGlobCtx: (stylesGlobCtx:StylesCtxType) => void,

    queryData:QueryDataType;
    setQueryData: (queryData:QueryDataType) => void,

    updateSection:UpdateSectionType;
    setUpdateSection: (updateSection:UpdateSectionType) => void,

    saveElementsData:SaveElementsDataType;
    setSaveElementsData: (saveElementsData:SaveElementsDataType) => void,

    elementsArr:ElementsArrType;
    setElementsArr: (ele:ElementsArrType) => void,

    commonStyleSelector:string;
    setCommonStyleSelector: (ele:string) => void,

    tags:any[];
    setTags: (ele:any[]) => void,

    gFonts:any[];
    setGFonts: (ele:any[]) => void,

    cssFromSettings:any[];
    setCssFromSettings: (ele:any[]) => void,
    
    elementChanged:boolean;
    setElementChanged: (ele:boolean) => void,
    
    statesName:string;
    setStatesName: (ele:string) => void,
    
    activeDevice:string;
    setActiveDevice: (ele:string) => void,
    
};

const defaultPageActionProps: PagesContextData = {
    showSectionPopup:false,
    pageIndex:0,
    activePage:0,
    activeVariant:0,
    pageVariants:[],
    isPageLoading:false,
    showMainContent:"main_content",
    splitVariant:false,
    showPageSetting:false,
    tags:[],
}

const defaultPagesProps: PagesType[] = [];

const pagesContextDefaultValues: pagesContextType = {
    pagesArr: defaultPagesProps,
    setPagesArr:(ele:PagesType[]) => {},

    hideOverlayArr: [],
    setHideOverlayArr:(hideOverlayArr:number[]) => {},

    funnelPages: [],
    setFunnelPages:(ele:any[]) => {},

    pageAction:defaultPageActionProps,
    setPageAction: (pageAction:PagesContextData) => {},

    userInfo:defaultUserInfo,
    setUserInfo: (userInfo:UserInfoType) => {},

    pagesInfo:defaultPagesInfo,
    setPagesInfo: (pagesInfo:PagesInfoType) => {},

    stylesCtx:defaultStylesCtx,
    setStylesCtx: (stylesCtx:StylesCtxType) => {},

    stylesGlobCtx:defaultStylesCtx,
    setStylesGlobCtx: (stylesGlobCtx:StylesCtxType) => {},

    queryData:defaultQueryData,
    setQueryData: (queryData:QueryDataType) => {},

    updateSection:defaultUpdateSection,
    setUpdateSection: (updateSection:UpdateSectionType) => {},

    saveElementsData:defaultSaveElementsData,
    setSaveElementsData: (saveElementsData:SaveElementsDataType) => {},

    elementsArr:defaultElementsArr,
    setElementsArr: (ele:ElementsArrType) => {},

    commonStyleSelector:"",
    setCommonStyleSelector: (ele:string) => {},

    tags:[],
    setTags: (ele:any[]) => {},

    gFonts:[],
    setGFonts: (ele:any[]) => {},

    cssFromSettings:[],
    setCssFromSettings: (ele:any[]) => {},

    elementChanged:false,
    setElementChanged: (ele:boolean) => {},

    statesName:"",
    setStatesName: (ele:string) => {},

    activeDevice:"desktopview",
    setActiveDevice: (ele:string) => {},
};

const PagesContext = createContext<pagesContextType>(pagesContextDefaultValues);

export function usePagesCtx() {
    return useContext(PagesContext);
}

type Props = {
    children: ReactNode;
};


export const PagesProvider = ({ children }: Props) => {
    const [pagesArr, _setPagesArr] = useState<PagesType[]>(defaultPagesProps);
    const [hideOverlayArr, _setHideOverlayArr] = useState<number[]>([]);
    const [funnelPages, _setFunnelPages] = useState<any[]>([]);
    const [pageAction, _setPageAction] = useState<PagesContextData>(defaultPageActionProps);
    const [userInfo, _setUserInfo] = useState<UserInfoType>(defaultUserInfo);
    const [pagesInfo, _setPagesInfo] = useState<PagesInfoType>(defaultPagesInfo);
    const [stylesCtx, _setStylesCtx] = useState<StylesCtxType>(defaultStylesCtx);
    const [stylesGlobCtx, _setStylesGlobCtx] = useState<StylesCtxType>(defaultStylesCtx);
    const [queryData, _setQueryData] = useState<QueryDataType>(defaultQueryData);
    const [updateSection, _setUpdateSection] = useState<UpdateSectionType>(defaultUpdateSection);
    const [saveElementsData, _setSaveElementsData] = useState<SaveElementsDataType>(defaultSaveElementsData);
    const [elementsArr, _setElementsArr] = useState<ElementsArrType>(defaultElementsArr);
    const [commonStyleSelector, _setCommonStyleSelector] = useState<string>("");
    const [elementChanged, _setElementChanged] = useState<boolean>(false);
    const [statesName, _setStatesName] = useState<string>("");
    const [activeDevice, _setActiveDevice] = useState<string>("desktopview");
    const [tags, _setTags] = useState<any[]>([]);
    const [gFonts, _setGFonts] = useState<any[]>([]);
    const [cssFromSettings, _setCssFromSettings] = useState<any[]>([]);

    const setPagesArr = (ele:PagesType[]) => {
        _setPagesArr(ele);
    };

    const setHideOverlayArr = (hideOverlayArr:number[]) => {
        _setHideOverlayArr(hideOverlayArr);
    };

    const setFunnelPages = (ele:any[]) => {
        _setFunnelPages(ele);
    };

    const setPageAction = (newPageAction:PagesContextData) => {
        const newState = {...pageAction, ...newPageAction};
        if (newState !== pageAction) {
            _setPageAction(newState);
        }
    }

    const setUserInfo = (newUserInfo:UserInfoType) => {
        const newState = {...userInfo, ...newUserInfo};
        if (newState !== userInfo) {
            _setUserInfo(newState);
        }
    }

    const setPagesInfo = (newPagesInfo:PagesInfoType) => {
        const newState = {...pagesInfo, ...newPagesInfo};
        if (newState !== pagesInfo) {
            _setPagesInfo(newState);
        }
    }

    const setStylesCtx = (newStylesCtx:StylesCtxType) => {
        const newState = {...stylesCtx, ...newStylesCtx};
        if (newState !== stylesCtx) {
            _setStylesCtx(newState);
        }
    }

    const setStylesGlobCtx = (newStylesGlobCtx:StylesCtxType) => {
        const newState = {...stylesGlobCtx, ...newStylesGlobCtx};
        if (newState !== stylesCtx) {
            _setStylesGlobCtx(newState);
        }
    }

    const setQueryData = (newQueryData:QueryDataType) => {
        const newState = {...queryData, ...newQueryData};
        if (newState !== queryData) {
            _setQueryData(newState);
        }
    }

    const setUpdateSection = (newUpdateSection:UpdateSectionType) => {
        const newState = {...updateSection, ...newUpdateSection};
        if (newState !== updateSection) {
            _setUpdateSection(newState);
        }
    }

    const setSaveElementsData = (newSaveElementsData:SaveElementsDataType) => {
        const newState = {...saveElementsData, ...newSaveElementsData};
        if (newState !== saveElementsData) {
            _setSaveElementsData(newState);
        }
    }

    const setElementsArr = (ele:ElementsArrType) => {
        _setElementsArr(ele);
    };

    const setCommonStyleSelector = (ele:string) => {
        _setCommonStyleSelector(ele);
    };

    const setElementChanged = (ele:boolean) => {
        _setElementChanged(ele);
    };

    const setStatesName = (ele:string) => {
        _setStatesName(ele);
    };

    const setActiveDevice = (ele:string) => {
        _setActiveDevice(ele);
    };

    const setTags = (ele:any[]) => {
        _setTags(ele);
    };

    const setGFonts = (ele:any[]) => {
        _setGFonts(ele);
    };

    const setCssFromSettings = (ele:any[]) => {
        _setCssFromSettings(ele);
    };
    const value = {
        pagesArr,
        setPagesArr,
        hideOverlayArr,
        setHideOverlayArr,
        funnelPages,
        setFunnelPages,
        pageAction,
        setPageAction,
        userInfo,
        setUserInfo,
        pagesInfo,
        setPagesInfo,
        stylesCtx,
        setStylesCtx,
        stylesGlobCtx,
        setStylesGlobCtx,
        queryData,
        setQueryData,
        updateSection,
        setUpdateSection,
        saveElementsData,
        setSaveElementsData,
        elementsArr,
        setElementsArr,
        tags,
        setTags,
        gFonts,
        setGFonts,
        cssFromSettings,
        setCssFromSettings,
        commonStyleSelector,
        setCommonStyleSelector,
        elementChanged,
        setElementChanged,
        statesName,
        setStatesName,
        activeDevice,
        setActiveDevice,
    };

    return (
        <>
            <PagesContext.Provider value={value}>
                {children}
            </PagesContext.Provider>
        </>
    );
}