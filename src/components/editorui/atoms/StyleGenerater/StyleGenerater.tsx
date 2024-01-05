import { useEffect, useState } from "react";
import { deepCloneArray } from '../../../../utils/functions';
import { usePagesCtx } from '../../../../context/editorui/PagesContext';

const StyleGenerater = () => {
    
    const [ css, setCss ] = useState<any>(null);
    const { stylesCtx, setStylesCtx } = usePagesCtx();
    const { stylesGlobCtx, setStylesGlobCtx, cssFromSettings } = usePagesCtx();

    const removeUnwantedCss = (css:string) => {
        if(css){
            let retArr:any = [];
            let cssArr = css.split(";");
            if(!cssArr?.length) return "";
            
            cssArr.forEach((ele)=>{
                if(ele){
                    const _ele = ele.split(":");
                    if(_ele && _ele[1]) retArr.push(ele);
                }
            });

            return retArr.join(';');
        }
    }

    useEffect(() => {

        let _css = "";
        let desktopCss = "";
        let tabletCss = "";
        let tabletInEditorCss = "";
        let mobileCss = "";
        let mobileInEditorCss = "";

        // global css loaded here
        const _cssGlobClassArr = deepCloneArray(stylesGlobCtx);
        for(let i=0; i<_cssGlobClassArr.styles.length;i++){

            if(!_cssGlobClassArr.styles[i]?.data?.styles?.includes("font-family: 'Poppins', sans-serif")){
                // _css += `.page-editor-wrapper ${_cssGlobClassArr.styles[i]?.data.selector}{${_cssGlobClassArr.styles[i]?.data.styles}}`;
                
                const cssGlobVal = removeUnwantedCss(_cssGlobClassArr.styles[i]?.data.styles);
                if(_cssGlobClassArr.styles[i]?.data.selector?.includes("desktopview")){
                    if(cssGlobVal) desktopCss += `.page-editor-wrapper ${_cssGlobClassArr.styles[i]?.data.selector?.replace(/(mobileview|desktopview|tabletview): /, '')}{${cssGlobVal}}`;
                }
    
                if(_cssGlobClassArr.styles[i]?.data.selector?.includes("tabletview")){
                    if(cssGlobVal) tabletCss += `.page-editor-wrapper ${_cssGlobClassArr.styles[i]?.data.selector?.replace(/(mobileview|desktopview|tabletview): /, '')}{${cssGlobVal}}`;
                    if(cssGlobVal) tabletInEditorCss += `.tabletclass.page-editor-wrapper ${_cssGlobClassArr.styles[i]?.data.selector?.replace(/(mobileview|desktopview|tabletview): /, '')}{${cssGlobVal}}`;
                }
    
                if(_cssGlobClassArr.styles[i]?.data.selector?.includes("mobileview")){
                    if(cssGlobVal) mobileCss += `.page-editor-wrapper ${_cssGlobClassArr.styles[i]?.data.selector?.replace(/(mobileview|desktopview|tabletview): /, '')}{${cssGlobVal}}`;
                    if(cssGlobVal) mobileInEditorCss += `.phoneclass.page-editor-wrapper ${_cssGlobClassArr.styles[i]?.data.selector?.replace(/(mobileview|desktopview|tabletview): /, '')}{${cssGlobVal}}`;
                }
    
                if(!/(desktopview|tabletview|mobileview)/.test(_cssGlobClassArr.styles[i]?.data.selector)){
                    if(cssGlobVal) desktopCss += `.page-editor-wrapper ${_cssGlobClassArr.styles[i]?.data.selector?.replace(/(mobileview|desktopview|tabletview): /, '')}{${cssGlobVal}}`;
                }

            }
            
        }

        // site css loaded here
        const _cssClassArr = deepCloneArray(stylesCtx);
        
        // To remove any css from styleCtx
        // for(let i=0; i<_cssClassArr.styles.length;i++){
        //     _cssClassArr.styles[i].data.styles = _cssClassArr.styles[i]?.data.styles?.replaceAll("mix-blend-mode:normal;","");
        //     _cssClassArr.styles[i].data.styles = _cssClassArr.styles[i]?.data.styles?.replaceAll("mix-blend-mode:multiply;","");
        // }
        
        for(let i=0; i<_cssClassArr.styles.length;i++){
            if(!_cssClassArr.styles[i]?.data?.styles?.includes("font-family: 'Poppins', sans-serif")){

                // To check any class name in styleCtx
                // if(_cssClassArr.styles[i]?.data.selector?.includes("large-heading")){
                //     console.log(_cssClassArr.styles[i]?.data.selector, i);
                // }

                const cssVal = removeUnwantedCss(_cssClassArr.styles[i]?.data.styles);
                if(_cssClassArr.styles[i]?.data.selector?.includes("desktopview")){
                    if(cssVal) desktopCss += `.page-editor-wrapper ${_cssClassArr.styles[i]?.data.selector?.replace(/(mobileview|desktopview|tabletview): /, '')}{${cssVal}}`;
                }
    
                if(_cssClassArr.styles[i]?.data.selector?.includes("tabletview")){
                    if(cssVal) tabletCss += `.page-editor-wrapper ${_cssClassArr.styles[i]?.data.selector?.replace(/(mobileview|desktopview|tabletview): /, '')}{${cssVal}}`;
                    if(cssVal) tabletInEditorCss += `.tabletclass.page-editor-wrapper ${_cssClassArr.styles[i]?.data.selector?.replace(/(mobileview|desktopview|tabletview): /, '')}{${cssVal}}`;
                }
    
                if(_cssClassArr.styles[i]?.data.selector?.includes("mobileview")){
                    if(cssVal) mobileCss += `.page-editor-wrapper ${_cssClassArr.styles[i]?.data.selector?.replace(/(mobileview|desktopview|tabletview): /, '')}{${cssVal}}`;
                    if(cssVal) mobileInEditorCss += `.phoneclass.page-editor-wrapper ${_cssClassArr.styles[i]?.data.selector?.replace(/(mobileview|desktopview|tabletview): /, '')}{${cssVal}}`;
                }
    
                if(!/(desktopview|tabletview|mobileview)/.test(_cssClassArr.styles[i]?.data.selector)){
                    if(cssVal) desktopCss += `.page-editor-wrapper ${_cssClassArr.styles[i]?.data.selector?.replace(/(mobileview|desktopview|tabletview): /, '')}{${cssVal}}`;
                }

            }

        }

        _css += desktopCss;
        _css += `@media only screen and (max-width: 768px){${tabletCss}}`;
        _css += `@media(min-width: 320px) and (max-width: 480px){${mobileCss}}`;
        _css += tabletInEditorCss;
        _css += mobileInEditorCss;
        // settings css loaded here
        if(cssFromSettings){
            for(let i=0; i<cssFromSettings.length;i++){
                _css += `.page-editor-wrapper ${cssFromSettings[i]?.data.selector}{${cssFromSettings[i]?.data.styles}}`;
            }
        }
        setCss(_css);

    }, [stylesCtx, stylesGlobCtx])

    return (
        <>
            <style>{css}</style>
        </>
    );
};

export default StyleGenerater;