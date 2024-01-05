import { createContext, useContext, ReactNode, useState } from 'react';

export interface sectionType {
    secIndex:number;
    secNum:number;
    eleNum:number;
    secInfo:{};
    colNum:colType[];
}

interface colType {
    colIndex:number;
    colInfo?:{};
    element:eleTypeForSec[];
}

interface eleTypeForSec {
    eleNum:number;
    eleInfo:{};
    type:string;
    gridEle?:colType[];
}

interface eleType {
    eleNum:number;
    secIndex:number;
    colIndex:number;
    type:string;
}

interface sectionCtxType {
    secIndex:number;
    colIndex:number;
    element:eleType;
}

interface FolderType {
    subFolders?:SubFoldersType[];
    files?:FileType[];
}

interface SubFoldersType {
    folderName:string;    
    type?:string;
    files?:FileType[];
}

interface FileType {
    fileName:string;
    fileUrl:string;
    type?:string;
}

interface CreateNewElementType {
    data:any;
    sIndex:number;
    cIdx?:number; 
    tIdx?:number;
    isAllowed:boolean;
}

export interface GeneralSettingsType {
    title?: string;
    metaTitle?: string;
    headTracking?: string;
    redirectUrl?: string;
    url?: string;
    metaDesc?: string;
    bodyTracking?: string;
}

export const defaultGeneralSettings:GeneralSettingsType = {
    title: "",
    metaTitle: "",
    headTracking: "",
    redirectUrl: "",
    url: "",
    metaDesc: "",
    bodyTracking: "",
}

export interface TemplateCssType {
    fontFamily?: string;     
    fontSize?: number;     
    lineHeight?: number;     
    fontColor?: string;     
}

export const defaultTemplateCss:TemplateCssType = {
    fontFamily: "",
    fontSize: 16,
    lineHeight: 0, 
    fontColor: "#000",
}

type pushContextType = {
    styleCtx: any[];
    setStyleCtx:(ele:any) => void;
    eleNumCtx: number; // element number
    setEleNumCtx:(ele:any) => void;
    curEleCtx: eleType; // current element which is selected
    setCurEleCtx:(ele:eleType) => void;
    mobileView: string; // mobile view
    setMobileView:(ele:string) => void;
    gridArrayCtx: [];
    setGridArrayCtx:(ele:any) => void;
    gridLayerCtx: number;
    setGridLayerCtx:(ele:number) => void;
    gridFromArrayCtx: [];
    setGridFromArrayCtx:(ele:any) => void;
    gridFromLayerCtx: number;
    setGridFromLayerCtx:(ele:number) => void;
    selDragEleNum: number;
    setSelDragEleNum:(ele:number) => void;
    hoverEleSIndex: number;
    setHoverEleSIndex:(ele:number) => void;
    hoverEleCIndex: number;
    setHoverEleCIndex:(ele:number) => void;
    settingFlag: boolean;
    setSettingFlag:(ele:boolean) => void;

    pageLoader: boolean;
    setPageLoader:(ele:boolean) => void;

    overArrayCtx: [];
    setOverArrayCtx:(ele:any) => void;
    overArrayBaseCtx: any[];
    setOverArrayBaseCtx:(ele:any) => void;

    saveElementData: any;
    setSaveElementData:(ele:any) => void;

    saveElementDataUrl: any;
    setSaveElementDataUrl:(ele:any) => void;

    folderStruct: FolderType | undefined;
    setFolderStruct:(ele:any) => void;

    showSettingCtx: boolean;
    setShowSettingCtx:(ele:boolean) => void;

    leftToolSHoverIdx: number; // section index on hover in left side Sections tool  
    setLeftToolSHoverIdx:(ele:number) => void;
    sectionScrollIdx: number; // section index for scroll at click on popup Sections  
    setSectionScrollIdx:(ele:number) => void;
    leftToolCHoverIdx: number; // column index on hover in left side Sections tool
    setLeftToolCHoverIdx:(ele:number) => void;

    createNewElement: CreateNewElementType; // Save new section/column from left side Sections tool
    setCreateNewElement:(ele:CreateNewElementType) => void;

    templateCss: TemplateCssType; // template css style
    setTemplateCss:(ele:TemplateCssType) => void;

    generalSettings: GeneralSettingsType; // template css style
    setGeneralSettings:(ele:GeneralSettingsType) => void;

    fileBrowserRef: any[]; // template css style
    setFileBrowserRef:(ele:any[]) => void;

    isProcessing: boolean; // in processing 
    setIsProcessing:(ele:boolean) => void;
};

const pushContextDefaultValues: pushContextType = {
    // sectionCtx: [],
    // setSectionCtx:() => {},
    styleCtx: [],
    setStyleCtx:() => {},
    eleNumCtx: 0,
    setEleNumCtx:() => {},
    curEleCtx: {
                    eleNum:-1,
                    secIndex:-1,
                    colIndex:-1,
                    type:'',
                },
    setCurEleCtx:() => {},
    mobileView: "100%",
    setMobileView:() => {},
    gridArrayCtx: [],
    setGridArrayCtx:() => {},
    gridLayerCtx: 0,
    setGridLayerCtx:() => {},
    gridFromArrayCtx: [],
    setGridFromArrayCtx:() => {},
    gridFromLayerCtx: 0,
    setGridFromLayerCtx:() => {},
    selDragEleNum: -1,
    setSelDragEleNum:() => {},
    hoverEleSIndex: -1,
    setHoverEleSIndex:() => {},
    hoverEleCIndex: -1,
    setHoverEleCIndex:() => {},
    leftToolSHoverIdx: -1,
    setLeftToolSHoverIdx:() => {},
    sectionScrollIdx: -1,
    setSectionScrollIdx:() => {},
    leftToolCHoverIdx: -1,
    setLeftToolCHoverIdx:() => {},
    overArrayCtx: [],
    setOverArrayCtx:() => {},
    settingFlag: true,
    setSettingFlag:() => {},
    pageLoader: false,
    setPageLoader:() => {},
    overArrayBaseCtx: [-1, -1, -1],
    setOverArrayBaseCtx:() => {},
    saveElementData: {},
    setSaveElementData:() => {},
    saveElementDataUrl: '',
    setSaveElementDataUrl:() => {},
    folderStruct: undefined,
    setFolderStruct:() => {},

    showSettingCtx: true,
    setShowSettingCtx:() => {},

    createNewElement: {
        data: null,
        sIndex: -1,
        cIdx: -1, 
        tIdx: -1,
        isAllowed: false,
    },
    setCreateNewElement:() => {},

    templateCss: defaultTemplateCss,
    setTemplateCss:() => {},

    generalSettings: defaultGeneralSettings,
    setGeneralSettings:() => {},

    fileBrowserRef: [],
    setFileBrowserRef:() => {},

    isProcessing: false,
    setIsProcessing:() => {},
};

const PushContext = createContext<pushContextType>(pushContextDefaultValues);

export function usePushCtx() {
    return useContext(PushContext);
}

type Props = {
    children: ReactNode;
};

export const PushProvider = ({ children }: Props) => {

    const initValue:any = []; 

    // const [sectionCtx, setSection] = useState<sectionType[]>(initValue);
    const [styleCtx, setstyle] = useState<any[]>([]);
    const [eleNumCtx, setEleNum] = useState<number>(0);
    const [curEleCtx, setCurrEle] = useState<eleType>({
                                                            eleNum:-1,
                                                            secIndex:-1,
                                                            colIndex:-1,
                                                            type:'',
                                                        });
    const [mobileView, setMView] = useState<string>("100%");
    const [gridArrayCtx, setGArray] = useState<[]>([]);
    const [gridLayerCtx, setGLayer] = useState<number>(0);
    const [gridFromArrayCtx, setGFromArray] = useState<[]>([]);
    const [gridFromLayerCtx, setGFromLayer] = useState<number>(0);
    const [selDragEleNum, setGDragEle] = useState<number>(-1);
    const [hoverEleSIndex, setGDragEleS] = useState<number>(-1);
    const [hoverEleCIndex, setGDragEleC] = useState<number>(-1);
    const [leftToolSHoverIdx, _setLeftToolSHoverIdx] = useState<number>(-1);
    const [sectionScrollIdx, _setSectionScrollIdx] = useState<number>(-1);
    const [leftToolCHoverIdx, _setLeftToolCHoverIdx] = useState<number>(-1);
    const [settingFlag, setSetFlag] = useState<boolean>(true);
    const [pageLoader, _setPageLoader] = useState<boolean>(true);

    const [overArrayCtx, setOArray] = useState<[]>([]);
    const [overArrayBaseCtx, setOBArray] = useState<[]>([]);
    const [saveElementData, setSSaveElementData] = useState<{}>({});
    const [saveElementDataUrl, setSSaveElementDataUrl] = useState<any>();
    const [folderStruct, setSFolderStruct] = useState<FolderType | undefined>();
    const [showSettingCtx, setSShowSettingCtx] = useState<boolean>(true);

    const [createNewElement, _setCreateNewElement] = useState<CreateNewElementType>(
                                                                                        {
                                                                                            data: null,
                                                                                            sIndex: -1,
                                                                                            cIdx: -1, 
                                                                                            tIdx: -1,
                                                                                            isAllowed: false,
                                                                                        }
                                                                                    );

    const [templateCss, _setTemplateCss] = useState<TemplateCssType>(defaultTemplateCss);

    const [generalSettings, _setGeneralSettings] = useState<GeneralSettingsType>(defaultGeneralSettings);
    const [fileBrowserRef, _setFileBrowserRef] = useState<any>([]);
    const [isProcessing, _setIsProcessing] = useState<boolean>(false);

    // const setSectionCtx = (ele:any) => {
    //     setSection(ele);
    // }

    const setStyleCtx = (ele:any) => {
        setstyle(ele);
    };

    const setMobileView = (ele:string) => {
        setMView(ele);
    };

    const setEleNumCtx = (num:number) => {
        setEleNum(num);
    };

    const setCurEleCtx = (ele:eleType) => {
        setCurrEle(ele);
    };

    const setGridArrayCtx = (ele:any) => {
        setGArray(ele);
    };

    const setGridLayerCtx = (ele:number) => {
        setGLayer(ele);
    };

    const setGridFromArrayCtx = (ele:any) => {
        setGFromArray(ele);
    };

    const setGridFromLayerCtx = (ele:number) => {
        setGFromLayer(ele);
    };

    const setSelDragEleNum = (ele:number) => {
        setGDragEle(ele);
    };

    const setHoverEleSIndex = (ele:number) => {
        setGDragEleS(ele);
    };

    const setHoverEleCIndex = (ele:number) => {
        setGDragEleC(ele);
    };

    const setLeftToolSHoverIdx = (ele:number) => {
        _setLeftToolSHoverIdx(ele);
    };

    const setSectionScrollIdx = (ele:number) => {
        _setSectionScrollIdx(ele);
    };

    const setLeftToolCHoverIdx = (ele:number) => {
        _setLeftToolCHoverIdx(ele);
    };

    const setOverArrayCtx = (ele:any) => {
        setOArray(ele);
    };

    const setOverArrayBaseCtx = (ele:any) => {
        setOBArray(ele);
    };

    const setSettingFlag = (ele:boolean) => {
        setSetFlag(ele);
    };

    const setPageLoader = (ele:boolean) => {
        _setPageLoader(ele);
    };

    const setSaveElementData = (ele:any) => {
        setSSaveElementData(ele);
    };

    const setSaveElementDataUrl = (ele:any) => {
        setSSaveElementDataUrl(ele);
    };

    const setFolderStruct = (ele:any) => {
        setSFolderStruct(ele);
    };

    const setShowSettingCtx = (ele:boolean) => {
        setSShowSettingCtx(ele);
    };

    const setCreateNewElement = (newElement:CreateNewElementType) => {
        const newState = {...createNewElement, ...newElement};
        if (newState !== createNewElement) {
            _setCreateNewElement(newState);
        }
    }

    const setTemplateCss = (newTemplateCss:TemplateCssType) => {
        const newState = {...templateCss, ...newTemplateCss};
        if (newState !== templateCss) {
            _setTemplateCss(newState);
        }
    }

    const setGeneralSettings = (newGeneralSettings:GeneralSettingsType) => {
        const newState = {...generalSettings, ...newGeneralSettings};
        if (newState !== generalSettings) {
            _setGeneralSettings(newState);
        }
    }

    const setFileBrowserRef = (ele:any[]) => {
        _setFileBrowserRef(ele);
    };

    const setIsProcessing = (ele:boolean) => {
        _setIsProcessing(ele);
    };

    const value = {
        // sectionCtx,
        // setSectionCtx,
        styleCtx,
        setStyleCtx,
        eleNumCtx,
        setEleNumCtx,
        curEleCtx,
        setCurEleCtx,
        mobileView,
        setMobileView,
        gridArrayCtx,
        setGridArrayCtx,
        gridLayerCtx,
        setGridLayerCtx,
        gridFromArrayCtx,
        setGridFromArrayCtx,
        gridFromLayerCtx,
        setGridFromLayerCtx,
        selDragEleNum,
        setSelDragEleNum,
        hoverEleSIndex,
        setHoverEleSIndex,
        hoverEleCIndex,
        setHoverEleCIndex,
        leftToolSHoverIdx,
        setLeftToolSHoverIdx,
        sectionScrollIdx,
        setSectionScrollIdx,
        leftToolCHoverIdx,
        setLeftToolCHoverIdx,
        overArrayCtx,
        setOverArrayCtx,
        overArrayBaseCtx,
        setOverArrayBaseCtx,
        settingFlag,
        setSettingFlag,
        saveElementData,
        setSaveElementData,
        saveElementDataUrl,
        setSaveElementDataUrl,
        folderStruct,
        setFolderStruct,
        showSettingCtx,
        setShowSettingCtx,
        createNewElement,
        setCreateNewElement,
        templateCss,
        setTemplateCss,
        generalSettings,
        setGeneralSettings,
        fileBrowserRef,
        setFileBrowserRef,
        isProcessing,
        setIsProcessing,
        pageLoader,
        setPageLoader,
    };

    return (
        <>
            <PushContext.Provider value={value}>
                {children}
            </PushContext.Provider>
        </>
    );
}