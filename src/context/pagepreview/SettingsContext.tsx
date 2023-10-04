import { createContext, useContext, ReactNode, useState } from 'react';
import { usePushCtx } from "./PushContext";
// import { usePushCtx } from "../contexts/PushContext";
import { defaultTempStyleSelector, useContentCtx } from "./ContentsContext";
import { deepCloneArray, getColumnStrNumber, isObj } from '../../utils/functions';
import { usePagesCtx } from './PagesContext';

type subToolType =  {
    blocks: string; 
    elements: string
}

type settingsContextType = {
    selectedSetting: string;
    setSelectedSetting:(name:string) => void;
    selectedMainTools: string;
    setSelectedMainTools:(name:string) => void;
    selectedSubTools: subToolType;
    setSelectedSubTools:(ele:subToolType) => void;
    isSettingsOpen: boolean;
    setIsSettingsOpen:(status:boolean) => void;

    getStyleOfElement:() => any;
    setStyleOfElement:(styleInfo:any, col?:number, colWidth?:number) => void;

    getStylesFromCtx:(styleName:string, childIdx?:number) => any;
    setStylesToCtx:(styleName:string[], value:string[], childIdx?:number) => any;

    getStylesFromCtxForFaq:(styleName:string, subChildCls:string, childIdx?:number) => any;
    setStylesToCtxForFaq:(styleName:string[], value:string[], subChildCls:string, childIdx?:number) => any;

    formIdx: number;
    setFormIdx:(idx:number) => void;

    editForm: boolean;
    setEditForm:(state:boolean) => void;

    openForm: boolean;
    setOpenForm:(state:boolean) => void;

    faqCollectionId: number;
    setFaqCollectionId:(id:number) => void;

    bannerCollectionId: number;
    setBannerCollectionId:(id:number) => void;
};

const settingsContextDefaultValues: settingsContextType = {
    selectedSetting: "page_setting",
    setSelectedSetting:() => {},
    selectedMainTools: "Pages",
    setSelectedMainTools:() => {},
    selectedSubTools: {blocks: "Select Block Type", elements: ""},
    setSelectedSubTools:(ele:subToolType) => {},
    isSettingsOpen: false,
    setIsSettingsOpen:(status:boolean) => {},
    getStyleOfElement:() => {},
    setStyleOfElement:(styleInfo:any, col?:number, colWidth?:number) => {},
        
    getStylesFromCtx:(styleName:string, childIdx?:number) => {},
    setStylesToCtx:(styleName:string[], value:string[], childIdx?:number) => {},
        
    getStylesFromCtxForFaq:(styleName:string, subChildCls:string, childIdx?:number) => {},
    setStylesToCtxForFaq:(styleName:string[], value:string[], subChildCls:string, childIdx?:number) => {},
    
    formIdx:0,
    setFormIdx:() => {},
    
    editForm:false,
    setEditForm:() => {},
    
    openForm:false,
    setOpenForm:() => {},
    
    faqCollectionId:-1,
    setFaqCollectionId:() => {},
    
    bannerCollectionId:-1,
    setBannerCollectionId:() => {},
};

const SettingsContext = createContext<settingsContextType>(settingsContextDefaultValues);

export function useSettingsCtx() {
    return useContext(SettingsContext);
}

type Props = {
    children: ReactNode;
};


export const SettingsProvider = ({ children }: Props) => {
    const [selectedSetting, setSettings] = useState<string>("page_setting");
    const [selectedMainTools, setMainTools] = useState<string>("Pages");
    const [selectedSubTools, setSubTools] = useState<subToolType>({blocks: "Select Block Type", elements: ""});
    const [isSettingsOpen, _setIsSettingsOpen] = useState<boolean>(false);
    const [formIdx, _setFormIdx] = useState<number>(0);
    const [editForm, _setEditForm] = useState<boolean>(false);
    const [openForm, _setOpenForm] = useState<boolean>(false);
    const [faqCollectionId, _setFaqCollectionId] = useState<number>(-1);
    const [bannerCollectionId, _setBannerCollectionId] = useState<number>(-1);
    
    ///////////////////////////////////////////////////////////////////////////////////
    const { sectionCtx, setSectionCtx, changeStyleOfElement, setChangeStyleOfElement, setTempStyleSelector } = useContentCtx();
    const { stylesCtx, setStylesCtx } = usePagesCtx();
    const { stylesGlobCtx, setStylesGlobCtx, queryData, statesName, activeDevice } = usePagesCtx();

    const getStyleOfElement = () => {
      return changeStyleOfElement?.data?.eleInfo?.props;
    }


    ////////////////////////// new class name code start /////////////////////////////////////////////////////////////////////

    const getArrayOfClasses = (childIdx:number=-1) => {
        let _classObj:any;

        if(childIdx === -1){
            _classObj = deepCloneArray(changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.mainClassName);
        }else{
            _classObj = changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.childClassName && changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.childClassName[childIdx] ? deepCloneArray(changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.childClassName[childIdx]) : [];
            if(!isObj(_classObj)) _classObj = [];
        }

        if(!_classObj?.length) return [];
        
        let retArr = [];
        for(let i=_classObj?.length; i>1; i--){
            let classStr:string = "";
            for(let j=0; j<i; j++){
                classStr += _classObj[j]?.selector;
            }
            retArr.push(classStr);
        }

        const _cssClassArr = deepCloneArray(stylesCtx);
        const _themeCssClassArr = deepCloneArray(stylesGlobCtx);

        const classSelfArr = [];
        const themeClassSelfArr = [];
        for(let k=0; k<_classObj.length; k++){
            let _index = _cssClassArr.styles?.findIndex((x:any) => {
                if(x.data.selector?.includes('desktopview') || x.data.selector?.includes('tabletview') || x.data.selector?.includes('mobileview')){
                    if(x.data.selector === `${activeDevice}: ${_classObj[k]?.selector}`) return true;
                }
            });
            
            if(_index === -1 || _index === undefined){
                _index = _cssClassArr.styles?.findIndex((x:any) => {if(x.data.selector === _classObj[k]?.selector) return true;});
            }

            if(_index !== -1 && _index !== undefined){
                classSelfArr.push(_index);
            }else{
                let _tIndex = _themeCssClassArr.styles?.findIndex((x:any) => {

                    if(x.data.selector?.includes('desktopview') || x.data.selector?.includes('tabletview') || x.data.selector?.includes('mobileview')){
                        if(x.data.selector === `${activeDevice}: ${_classObj[k]?.selector}`) return true;
                    }

                });

                if(_tIndex === -1 || _tIndex !== undefined){
                    _tIndex = _themeCssClassArr.styles?.findIndex((x:any) => {
                        if(x.data.selector === _classObj[k]?.selector) return true;
                    });
                }

                if(_tIndex !== -1 && _tIndex !== undefined){
                    themeClassSelfArr.push(_tIndex);
                }
            }
        }

        const siteClassSort = classSelfArr.sort(function(a, b){return b - a});
        const theemClassSort = themeClassSelfArr.sort(function(a, b){return b - a});

        for(let t=0; t<siteClassSort?.length; t++){
            let _index = _classObj?.findIndex((x:any) => {
                if(_cssClassArr?.styles[siteClassSort[t]]?.data?.selector?.includes('desktopview') || _cssClassArr?.styles[siteClassSort[t]]?.data?.selector?.includes('tabletview') || _cssClassArr?.styles[siteClassSort[t]]?.data?.selector?.includes('mobileview')){
                    if(_cssClassArr?.styles[siteClassSort[t]]?.data?.selector === `${activeDevice}: ${x.selector}`) return true;
                }
            });
            if(_index === -1 || _index === undefined){
                _index = _classObj?.findIndex((x:any) => {
                    if(x.selector === _cssClassArr?.styles[siteClassSort[t]]?.data?.selector) return true;
                });
            }
            if(_index !== -1 && _index !== undefined) retArr.push(_classObj[_index]?.selector);
        }

        for(let t=0; t<theemClassSort?.length; t++){
            let _tindex = _classObj?.findIndex((x:any) => {
                if(_themeCssClassArr?.styles[theemClassSort[t]]?.data?.selector?.includes('desktopview') || _themeCssClassArr?.styles[theemClassSort[t]]?.data?.selector?.includes('tabletview') || _themeCssClassArr?.styles[theemClassSort[t]]?.data?.selector?.includes('mobileview')){
                    if(_themeCssClassArr?.styles[theemClassSort[t]]?.data?.selector === `${activeDevice}: ${x.selector}`) return true;
                }
            });

            if(_tindex === -1 || _tindex === undefined){
                _tindex = _classObj?.findIndex((x:any) => {
                    if(x.selector === _themeCssClassArr?.styles[theemClassSort[t]]?.data?.selector) return true;
                });
            }
            if(_tindex !== -1 && _tindex !== undefined) retArr.push(_classObj[_tindex]?.selector);
        }

        return retArr;
    }
    
    const extractClassForParent = (childIdx:number=-1) => {
        let _classObj:any;

        if(childIdx === -1){
            _classObj = deepCloneArray(changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.mainClassName);
        }else{
            _classObj = changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.childClassName && changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.childClassName[childIdx] ? deepCloneArray(changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.childClassName[childIdx]) : [];
            if(!isObj(_classObj)) _classObj = [];
        }

        let classStr:string = "";
        if(_classObj && _classObj?.length){
            for(let i=0; i<_classObj.length; i++){
                classStr += _classObj[i]?.selector;
            }
        }
        return classStr;
    }

    const setStyleOfTheme = (styleNameArr:any, valueArr:any, childIdx:number=-1) => {
        return setStyleOfThemeParent(styleNameArr, valueArr, childIdx);
    }

    const addNewThemeParentStyle = (styleNameArr:any, valueArr:string, classStr:string="", childIdx:number=-1) => {
        const _cssClassArr = deepCloneArray(stylesCtx);
        let newClassName = "ele" + Date.now().toString(36);
        let newClassName1 = deepCloneArray(newClassName);

        let prntclassStr = "";
        if(childIdx !== -1){
            prntclassStr = extractClassForParent();
        }

        if(statesName) newClassName = `${newClassName}:${statesName}`;
        let styleLessStr = "";
            
        for(let k=0; k<styleNameArr.length;k++){
            styleLessStr += `${styleNameArr[k]}:${valueArr[k]};`;
        }

        let _tempStyle = {
            data:{
                type: "class",
                name: classStr ? classStr : (prntclassStr ? `${prntclassStr} ${newClassName}` : newClassName),
                selector: classStr ? `${activeDevice}: ${classStr}` : (prntclassStr ? `${activeDevice}: ${prntclassStr} .${newClassName}` : `${activeDevice}: .${newClassName}`),
                styles: styleLessStr,
                children:[],
            }
        };

        _cssClassArr.styles.push(_tempStyle);

        setStylesCtx(_cssClassArr);
        const retVal = {
            parent: childIdx === -1 ? {"label":newClassName1, selector:`.${newClassName1}`} : "",
            child: childIdx !== -1 ? {"label":newClassName1, selector:`.${newClassName1}`} : "",
        }
        return classStr ? "" : retVal;
    }

    const addNewSiteParentStyle = (styleNameArr:any, valueArr:string, classStr:string, childIdx:number=-1) => {
        const _cssClassArr = deepCloneArray(stylesCtx);
        let newClassName = "ele" + Date.now().toString(36);
        let newClassName1 = deepCloneArray(newClassName);
        if(statesName) newClassName = `${newClassName}:${statesName}`;
        let styleLessStr = "";
            
        for(let k=0; k<styleNameArr.length;k++){
            styleLessStr += `${styleNameArr[k]}:${valueArr[k]};`;
        }

        let _tempStyle = {
            data:{
                type: "class",
                name: newClassName,
                selector: `${activeDevice}: ${classStr}.${newClassName}`,
                styles: styleLessStr,
                children:[],
            }
        };

        _cssClassArr.styles.push(_tempStyle);

        setStylesCtx(_cssClassArr);
        const retVal = {
            parent: childIdx === -1 ? {"label":newClassName1, selector:`.${newClassName1}`} : "",
            child: childIdx !== -1 ? {"label":newClassName1, selector:`.${newClassName1}`} : "",
        }
        return retVal;
    }

    const setStyleOfThemeParent = (styleNameArr:any, valueArr:any, childIdx:number=-1) => {
        const _cssClassArr = deepCloneArray(stylesCtx);
        let classStr = extractClassForParent(childIdx);
        let prntclassStr:string="";
        if(childIdx !== -1){
            prntclassStr = extractClassForParent();
            if(prntclassStr && classStr) classStr = `${prntclassStr} ${classStr}`;
        }
        if(statesName && classStr) classStr = `${classStr}:${statesName}`;
        if((childIdx === -1 || prntclassStr)){
            if(classStr){

                // find class is exist
                let _index = _cssClassArr.styles?.findIndex((x:any) => {

                    if(x.data.selector?.includes('desktopview')){
                        if(x.data.selector === `${activeDevice}: ${classStr}`) return true;
                    }

                    if(x.data.selector?.includes('tabletview')){
                        if(x.data.selector === `${activeDevice}: ${classStr}`) return true;
                    }

                    if(x.data.selector?.includes('mobileview')){
                        if(x.data.selector === `${activeDevice}: ${classStr}`) return true;
                    }

                });
        
                if(_index !== -1 && _index !== undefined){
        
                    let styleArr = [];
        
                    if(_cssClassArr.styles[_index].data.styles){
                        styleArr = _cssClassArr.styles[_index].data.styles.split(";");
                    }
        
                    for(let j=0; j<styleNameArr.length;j++){
                        let _styleIndex = styleArr.findIndex((x:any) => {
                            const _x = x.split(":");
                            if(_x[0] === styleNameArr[j]) return true;
                        });
        
                        if(_styleIndex !== -1){
                            styleArr[_styleIndex] = `${styleNameArr[j]}:${valueArr[j]}`;
                        }else{
                            styleArr.push(`${styleNameArr[j]}:${valueArr[j]}`);
                        }
                    }
        
                    const _styleLess = styleArr.join(";");
                    _cssClassArr.styles[_index].data.styles = _styleLess;
        
                    setStylesCtx(_cssClassArr);
                    return "";
                }else{

                    if(queryData?.siteType === "themesite"){
                        return addNewThemeParentStyle(styleNameArr, valueArr, classStr, childIdx);
                    }else{
                        const _cssGlobClassArr = deepCloneArray(stylesGlobCtx);

                        let _gIndex = _cssGlobClassArr?.styles?.findIndex((x:any) => {
                            if(x?.data?.selector?.includes('desktopview') || x?.data?.selector?.includes('tabletview') || x?.data?.selector?.includes('mobileview')){
                                if(x.data.selector === `${activeDevice}: ${classStr}`) return true;
                            }
                        });
                        
                        if(_gIndex === -1 || _gIndex === undefined){
                            _gIndex = _cssGlobClassArr?.styles?.findIndex((x:any) => {
                                if(x?.data?.selector === classStr) return true;
                            });
                        }
                        
                        if(_gIndex !== -1 && _gIndex !== undefined){
                            return addNewSiteParentStyle(styleNameArr, valueArr, classStr, childIdx);
                        }else{
                            return addNewThemeParentStyle(styleNameArr, valueArr, classStr, childIdx);
                        }
                    }

                }

            }else{
                return addNewThemeParentStyle(styleNameArr, valueArr, "", childIdx);
            }
        }else{
            if(classStr){
                return addNewChildStyle(styleNameArr, valueArr, classStr);
            }else{
                return addNewChildStyle(styleNameArr, valueArr, "");
            }
        }
    }

    const addNewChildStyle = (styleNameArr:any, valueArr:string, classStr:string="") => {
        const _cssClassArr = deepCloneArray(stylesCtx);
        let newClassName = "ele" + Date.now().toString(36);
        let newClassName1 = deepCloneArray(newClassName);

        let prntclassStr = "par" + Date.now().toString(36);

        if(statesName) newClassName = `${newClassName}:${statesName}`;
        let styleLessStr = "";
            
        for(let k=0; k<styleNameArr.length;k++){
            styleLessStr += `${styleNameArr[k]}:${valueArr[k]};`;
        }

        let _tempStyle = {
            data:{
                type: "class",
                name: classStr ? `${prntclassStr} ${classStr}` : `${prntclassStr} ${newClassName}`,
                selector: classStr ? `${activeDevice}: .${prntclassStr} ${classStr}` : `${activeDevice}: .${prntclassStr} .${newClassName}`,
                styles: styleLessStr,
                children:[],
            }
        };

        _cssClassArr.styles.push(_tempStyle);

        setStylesCtx(_cssClassArr);
        const retVal = {
            parent: {"label":prntclassStr, selector:`.${prntclassStr}`},
            child: classStr === "" ? {"label":newClassName1, selector:`.${newClassName1}`} : "",
        }
        return retVal;
    }

    const getStyleOfTheme = (styleName:string, childIdx:number=-1) => {
        const _classesObj = getArrayOfClasses(childIdx);        
        if(!_classesObj?.length) return "";

        for(let i=0; i<_classesObj.length; i++){
            let _clssSlector = _classesObj[i];
            if(statesName) _clssSlector = `${_classesObj[i]}:${statesName}`;

            const ret = fetchOwnCss(styleName, _clssSlector);
            if(ret) return ret;
            
            const retGlob = fetchGlobCss(styleName, _clssSlector);
            if(retGlob) return retGlob;
        }
        
        return "";
    }

    const fetchOwnCss = (styleName:string, selector:string) => {
        const _cssClassArr = deepCloneArray(stylesCtx);    
        
        let _index = _cssClassArr.styles?.findIndex((x:any) => {
            if(x?.data?.selector?.includes('desktopview') || x?.data?.selector?.includes('tabletview') || x?.data?.selector?.includes('mobileview')){
                if(x.data.selector === `${activeDevice}: ${selector}`) return true;
            }
        });
        
        if(_index === -1 || _index === undefined){
            _index = _cssClassArr.styles?.findIndex((x:any) => {
                if(x?.data?.selector === selector) return true;
            });
        }

        // if(styleName == 'background') console.log(styleName, _index);
        if(_index !== -1 && _index !== undefined){
            const stylesStr = _cssClassArr.styles[_index].data.styles;
            if(stylesStr){
                const styleArr = stylesStr.split(";");

                const _retVal = styleArr.find((x:any) => {
                    const _x = x.split(":");
                    if(_x[0] === styleName) return true;
                });

                let _ret = _retVal?.split(":");
                _ret = _retVal?.replace(`${_ret[0]}:`, "");
                return _ret ? _ret : "";
            }
        }
        return "";
    }

    const fetchGlobCss = (styleName:string, selector:string) => {
        const _cssClassArr = deepCloneArray(stylesGlobCtx);    
        
        let _index = _cssClassArr.styles?.findIndex((x:any) => {
            if(x?.data?.selector?.includes('desktopview') || x?.data?.selector?.includes('tabletview') || x?.data?.selector?.includes('mobileview')){
                if(x.data.selector === `${activeDevice}: ${selector}`) return true;
            }
        });

        if(_index === -1 || _index === undefined){
            _index = _cssClassArr.styles?.findIndex((x:any) => {
                if(x?.data?.selector === selector) return true;
            });
        }

        if(_index !== -1 && _index !== undefined){
            const stylesStr = _cssClassArr.styles[_index].data.styles;
            if(stylesStr){
                const styleArr = stylesStr.split(";");

                const _retVal = styleArr.find((x:any) => {
                    const _x = x.split(":");
                    if(_x[0] === styleName) return true;
                });

                let _ret = _retVal?.split(":");
                _ret = _retVal?.replace(`${_ret[0]}:`, "");
                return _ret ? _ret : "";
            }
        }
        return "";
    }

    const getStylesFromCtx = (styleName:string, childIdx:number=-1) => {
        let ret = "";
        if(childIdx === -1){
            ret = getStyleOfTheme(styleName, childIdx);
        }
        else{
            let retPrntObj = getArrayOfClasses();
            if(!retPrntObj?.length){
                const _classObj = deepCloneArray(changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.mainClassName);
                retPrntObj.push(_classObj[0]?.selector);
            }

            if(!retPrntObj?.length) return;

            for(let i=0; i<retPrntObj.length; i++){
                const childRet = getStyleOfChild(styleName, retPrntObj[i], childIdx);
                if(childRet) return childRet;
            }
        }
        return ret;
    }

    const getStylesFromCtxForFaq = (styleName:string, subChildCls:string, childIdx:number=0) => {
        let retPrntObj = getArrayOfClasses();
        if(!retPrntObj?.length){
            const _classObj = deepCloneArray(changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.mainClassName);
            retPrntObj.push(_classObj[0]?.selector);
        }

        if(!retPrntObj?.length) return;

        for(let i=0; i<retPrntObj.length; i++){
            const childRet = getStyleOfChildForFaq(styleName, retPrntObj[i], subChildCls, childIdx);
            if(childRet) return childRet;
        }
        return "";
    }

    const getStyleOfChildForFaq = (styleName:string, prntStr:string, subChildCls:string, childIdx:number=0) => {
        let _classesObj = getArrayOfClasses(childIdx);  

        if(!_classesObj?.length && changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.childClassName[childIdx]){
            const _classObj = deepCloneArray(changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.childClassName[childIdx]);
            _classesObj.push(_classObj[0]?.selector);
        }

        if(!_classesObj?.length) return "";

        for(let i=0; i<_classesObj.length; i++){
            let _clssSlector = `${prntStr} ${_classesObj[i]} .${subChildCls}`;

            const ret = fetchOwnCss(styleName, _clssSlector);
            if(ret) return ret;
            
            const retGlob = fetchGlobCss(styleName, _clssSlector);
            if(retGlob) return retGlob;
        }
        
        return "";
    }

    const getStyleOfChild = (styleName:string, prntStr:string, childIdx:number=-1) => {
        let _classesObj = getArrayOfClasses(childIdx);  

        if(!_classesObj?.length && changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.childClassName[childIdx]){
            let _classObj = deepCloneArray(changeStyleOfElement?.data.eleInfo?.props?.styleClasses?.childClassName[childIdx]);
            if(!isObj(_classObj)) _classObj = [];
            _classesObj.push(_classObj[0]?.selector);
        }

        if(!_classesObj?.length) return "";

        for(let i=0; i<_classesObj.length; i++){
            let _clssSlector = `${prntStr} ${_classesObj[i]}`;
            if(statesName) _clssSlector = `${_classesObj[i]}:${statesName}`;

            const ret = fetchOwnCss(styleName, _clssSlector);
            if(ret) return ret;
            
            const retGlob = fetchGlobCss(styleName, _clssSlector);
            if(retGlob) return retGlob;
        }
        
        return "";
    }

    const setStylesToCtx = (styleNameArr:string[], valueArr:string[], childIdx:number=-1) => {
        return setStyleOfTheme(styleNameArr, valueArr, childIdx);
    }

    const setStylesToCtxForFaq = (styleNameArr:string[], valueArr:string[], subChildCls:string, childIdx:number=0) => {
        const _cssClassArr = deepCloneArray(stylesCtx);
        
        let prntCls = "";
        let _prntCls = extractClassForParent();
        if(!_prntCls){
            prntCls = "par" + Date.now().toString(36);
            _prntCls = `.${prntCls}`;
        }

        let rowCls = "";
        let _rowCls = extractClassForParent(childIdx);
        if(!_rowCls){
            rowCls = "row" + Date.now().toString(36);
            _rowCls = `.${rowCls}`;
        }

        let classStr = `${_prntCls} ${_rowCls} .${subChildCls}`;

        // let _index = _cssClassArr.styles?.findIndex((x:any) => x.data.selector === classStr);
        let _index = _cssClassArr.styles?.findIndex((x:any) => {
            if(x?.data?.selector?.includes('desktopview') || x?.data?.selector?.includes('tabletview') || x?.data?.selector?.includes('mobileview')){
                if(x.data.selector === `${activeDevice}: ${classStr}`) return true;
            }
        });

        if(_index === -1 || _index === undefined){
            _index = _cssClassArr.styles?.findIndex((x:any) => {
                if(x?.data?.selector === classStr) return true;
            });
        }
    
        if(_index !== -1 && _index !== undefined){

            let styleArr = [];

            if(_cssClassArr.styles[_index].data.styles){
                styleArr = _cssClassArr.styles[_index].data.styles.split(";");
            }

            for(let j=0; j<styleNameArr.length;j++){
                let _styleIndex = styleArr.findIndex((x:any) => {
                    const _x = x.split(":");
                    if(_x[0] === styleNameArr[j]) return true;
                });

                if(_styleIndex !== -1){
                    styleArr[_styleIndex] = `${styleNameArr[j]}:${valueArr[j]}`;
                }else{
                    styleArr.push(`${styleNameArr[j]}:${valueArr[j]}`);
                }
            }

            const _styleLess = styleArr.join(";");
            _cssClassArr.styles[_index].data.styles = _styleLess;

            setStylesCtx(_cssClassArr);
        }else{
    
            let styleLessStr = "";
                
            for(let k=0; k<styleNameArr.length;k++){
                styleLessStr += `${styleNameArr[k]}:${valueArr[k]};`;
            }
    
            let _tempStyle = {
                data:{
                    type: "class",
                    name: classStr,
                    selector: `${activeDevice}: ${classStr}`,
                    styles: styleLessStr,
                    children:[],
                }
            };
    
            _cssClassArr.styles.push(_tempStyle);
    
            setStylesCtx(_cssClassArr);
        }
        
        const retVal = {
            parent: prntCls ? {"label":prntCls, selector:`.${prntCls}`} : "",
            child: rowCls ? {"label":rowCls, selector:`.${rowCls}`} : "",
        }
        return retVal;
    }

    ////////////////////////// new code end //////////////////////////////////////////////////////////////////////

    const setStyleOfElement = (styleInfo:any, columns:any = 0, colWidth:any = 0) => {

    if(colWidth && colWidth !== 0){ // change column's width here
        const _eleIdx = changeStyleOfElement.elementIdxs[changeStyleOfElement.elementIdxs.length-1];
        const _styleSectionsCtx = deepCloneArray(sectionCtx);
        const _styleArrLength = changeStyleOfElement?.elementIdxs?.length-1;
        let styleTemp = [];
        let _styleTemp = _styleSectionsCtx[changeStyleOfElement.sectionIdx];
        styleTemp.push(_styleTemp);
        
        for(let i=0; i<_styleArrLength; i++){ // loop for pointing Element
          styleTemp[i+1] = styleTemp[i].elements[changeStyleOfElement.elementIdxs[i]];
        }        

        const totlaEle = styleTemp[styleTemp.length-1].elements?.length;

        const cssClsArr:string[] = [];
        const cssClsNumArr:number[] = [];

        for(let j=0; j<totlaEle; j++){
            const cssCls = styleTemp[styleTemp.length-1].elements[j]?.eleInfo?.props?.cssClass;
            cssClsArr.push(cssCls);
            const _tempCss = getColumnStrNumber(cssCls);
            cssClsNumArr.push(_tempCss);
        }

        if(totlaEle > 1){

            let finalCssClsNumArr = deepCloneArray(cssClsNumArr);
            let _colWidth = 0;
            let eleToChangeWidth = -1;
            let colNumToDown = colWidth - cssClsNumArr[_eleIdx];
            let flag:boolean = true;
            if(colNumToDown > 0){
                // this is called when width of column is increased. So width is deducted from neighbour columns.

                for(let x=_eleIdx+1; x<totlaEle && flag; x++){
                    let _downColNum = cssClsNumArr[x] - colNumToDown;
                    if(_downColNum < 0){
                        colNumToDown = _downColNum * -1;
                        finalCssClsNumArr[x] = 0;
                    }else if(_downColNum === 0){
                        finalCssClsNumArr[x] = 0;
                        flag = false;
                        eleToChangeWidth = x;
                    }else{
                        _colWidth = _downColNum;
                        eleToChangeWidth = x;
                        flag = false;
                    }
                }
                for(let x=_eleIdx-1; x>=0 && flag; x--){
                    let _downColNum = cssClsNumArr[x] - colNumToDown;
                    if(_downColNum < 0){
                        colNumToDown = _downColNum * -1;
                        finalCssClsNumArr[x] = 0;
                    }else if(_downColNum === 0){
                        finalCssClsNumArr[x] = 0;
                        flag = false;
                        eleToChangeWidth = x;
                    }else{
                        _colWidth = _downColNum;
                        eleToChangeWidth = x;
                        flag = false;
                    }
                }

                styleTemp[styleTemp.length-1].elements[_eleIdx].eleInfo.props.cssClass = `col-sm-12 col-md-${colWidth}`;
                if(_colWidth !== 0){
                    styleTemp[styleTemp.length-1].elements[eleToChangeWidth].eleInfo.props.cssClass = `col-sm-12 col-md-${_colWidth}`;
                }

                for(let k=finalCssClsNumArr?.length-1; k>=0; k--){
                    if(finalCssClsNumArr[k] === 0){
                        // this code delete columns when it's width is calculated to 0.
                        styleTemp[styleTemp.length-1].elements.splice((k), 1);
                    }
                }

            }else{
                // this is called when width of column is reduced. So extara width is added to neighbour column.
                let nextPrevIdx = 0;
                if(_eleIdx+1 < totlaEle){
                    nextPrevIdx = _eleIdx + 1;
                }else{
                    nextPrevIdx = _eleIdx - 1;
                }
                let addWidthToNextPrevCol = cssClsNumArr[nextPrevIdx] - colNumToDown; // This add width to neighbour columns
                
                styleTemp[styleTemp.length-1].elements[_eleIdx].eleInfo.props.cssClass = `col-sm-12 col-md-${colWidth}`;
                styleTemp[styleTemp.length-1].elements[nextPrevIdx].eleInfo.props.cssClass = `col-sm-12 col-md-${addWidthToNextPrevCol}`;
            }
        }
        setSectionCtx(_styleSectionsCtx);
        return;
    }

    if(columns && columns !== 0){ // set columns for grid

        let colCss = "";
        switch(columns){
            case 1:
                colCss = "col-sm-12 col-md-12";
            break;
            case 2:
                colCss = "col-sm-12 col-md-6";
            break;
            case 3:
                colCss = "col-sm-12 col-md-4";
            break;
            case 4:
                colCss = "col-sm-12 col-md-3";
            break;
            case 6:
                colCss = "col-sm-12 col-md-2";
            break;
            case 12:
                colCss = "col-sm-12 col-md-1";
            break;
        }

        if(colCss === "") return;

        const _eleIdx = changeStyleOfElement.elementIdxs[changeStyleOfElement.elementIdxs.length-1];
        const _styleSectionsCtx = deepCloneArray(sectionCtx);
        const _styleArrLength = changeStyleOfElement?.elementIdxs?.length-1;
        let styleTemp = [];
        let _styleTemp = _styleSectionsCtx[changeStyleOfElement.sectionIdx];
        styleTemp.push(_styleTemp);
        
        for(let i=0; i<_styleArrLength; i++){ // loop for pointing Element
          styleTemp[i+1] = styleTemp[i].elements[changeStyleOfElement.elementIdxs[i]];
        }

        const gridArr = [];
        for(let i=0; i<columns; i++){
            const colEle =  {
                eleInfo: {
                    "id": "column",
                    "type": "Column",
                    "props": {
                        "style":{
                            border:"0px 0px 0px 0px solid #fff",
                            borderRadius: 0,
                            padding:"", 
                            margin:"", 
                            bgColor:"transparent",
                            bgImage:"",
                        },
                        cssClass: colCss, 
                        // cssClass: colCss, 
                        styleClasses:{
                            mainClassName:[],
                            childClassName:[],
                        },
                        name:"Column",
                    },
                },
                elements:[]
            };
            gridArr.push(colEle);
        }

        styleTemp[styleTemp.length-1].elements[_eleIdx].elements = gridArr;
        setSectionCtx(_styleSectionsCtx);
        return;
    }

    switch(changeStyleOfElement.type){ // Normal changes of style update here
        case "Section":
            const _forSectionsCtx = deepCloneArray(sectionCtx);
            _forSectionsCtx[changeStyleOfElement.sectionIdx].eleInfo.props = styleInfo;
            setSectionCtx(_forSectionsCtx);
          break;
        default:
          const _eleIdx = changeStyleOfElement.elementIdxs[changeStyleOfElement.elementIdxs.length-1];
          const _styleSectionsCtx = deepCloneArray(sectionCtx);
          const _styleArrLength = changeStyleOfElement?.elementIdxs?.length-1;
          let styleTemp = [];
          let _styleTemp = _styleSectionsCtx[changeStyleOfElement.sectionIdx];
          styleTemp.push(_styleTemp);
          for(let i=0; i<_styleArrLength; i++){ // loop for pointing Element
            styleTemp[i+1] = styleTemp[i].elements[changeStyleOfElement.elementIdxs[i]];
          }
          styleTemp[styleTemp.length-1].elements[_eleIdx].eleInfo.props = styleInfo;
          setSectionCtx(_styleSectionsCtx);
        break;  
      }
    }
    ///////////////////////////////////////////////////////////////////////////////////

    const setSelectedSetting = (name:string) => {
        setSettings(name);
    };

    const setFormIdx = (idx:number) => {
        _setFormIdx(idx);
    };

    const setEditForm = (state:boolean) => {
        _setEditForm(state);
    };

    const setOpenForm = (state:boolean) => {
        _setOpenForm(state);
    };

    const setFaqCollectionId = (id:number) => {
        _setFaqCollectionId(id);
    };

    const setBannerCollectionId = (id:number) => {
        _setBannerCollectionId(id);
    };

    const setSelectedMainTools = (name:string) => {
        setMainTools(name);
    };

    const setSelectedSubTools = (ele:subToolType) => {
        setSubTools(ele);
    };

    const setIsSettingsOpen = (status:boolean) => {
        _setIsSettingsOpen(status);
    };

    const value = {
        selectedSetting,
        setSelectedSetting,
        selectedMainTools,
        setSelectedMainTools,
        selectedSubTools,
        setSelectedSubTools,
        isSettingsOpen,
        setIsSettingsOpen,
        getStyleOfElement,
        setStyleOfElement,
        getStylesFromCtx,
        setStylesToCtx,
        getStylesFromCtxForFaq,
        setStylesToCtxForFaq,
        formIdx,
        setFormIdx,
        editForm,
        setEditForm,
        openForm,
        setOpenForm,
        faqCollectionId,
        setFaqCollectionId,
        bannerCollectionId,
        setBannerCollectionId,
    };

    return (
        <>
            <SettingsContext.Provider value={value}>
                {children}
            </SettingsContext.Provider>
        </>
    );
}