export interface EditSectionTopbarProps {
    onRedo: () => void,
    activeHighlight:boolean,
    showElementInModal: (sCtx:any, sIdx:number) => void,
    openSettings: (name:string, sIdx:number) => void,
    handleHighlight: () => void,
}
export interface PageTopbarProps {
    onRedo: () => void,
    clonePage: () => void,
    deletePage: () => void,
    splitTest: () => void,
    openTemplateSettings: () => void,
    handlePreview: () => void,
    handleSave: () => void,
    activeHighlight:boolean,
    secRefs:any,
    handleHighlight: () => void,
}
  