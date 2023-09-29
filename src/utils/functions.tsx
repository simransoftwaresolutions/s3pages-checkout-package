import { TemplateCssType } from "../contexts/PushContext";

export const deepCloneStyle = (styleCtx:any) => {
    return JSON.parse(JSON.stringify(styleCtx));
}

export const deepCloneSection = (sectionCtx:any) => {
    return JSON.parse(JSON.stringify(sectionCtx));
}

export const deepCloneArray = (ele:any) => {
    return JSON.parse(JSON.stringify(ele));
}

export const filebrowserCallback = (url:string, fileBrowserRef:any) => {

    if(fileBrowserRef[0] && fileBrowserRef[1]){
        fileBrowserRef[0].value = (url);
        fileBrowserRef[1].value = (url);
        fileBrowserRef[1].click();
    }

}

export const getElementName = (name:string) => {
    switch(name){
        case "Button":
            return "Button";
        break;
        case "Heading":
            return "Heading";
        break;
        case "Progress":
            return "Progress Bar";
        break;
        case "SocialIcon":
            return "Social Icon";
        break;
        case "Separator":
            return "Separator";
        break;
        case "Menu":
            return "Menu";
        break;
        case "Timer":
            return "Timer";
        break;
        case "Html":
            return "Html";
        break;
        case "Image":
            return "Image";
        break;
        case "Video":
            return "Video";
        break;
        case "Form":
            return "Form";
        break;
        case "Grid":
            return "Grid";
        break;
        case "Column":
            return "Column";
        break;
        case "Faq":
            return "Faq";
        break;
        case "Banner":
            return "Banner";
        break;
    }
}

export const getTemplateStyle = (data: TemplateCssType) => {
    const style = {
        fontFamily:(data?.fontFamily) ? (data.fontFamily) : "",
        fontSize:(data?.fontSize)?(`${(data.fontSize)}px`):"16px",
        lineHeight: (data?.lineHeight) ? `${data.lineHeight}px` : "Normal",
        // color: (data?.fontColor) ? (data?.fontColor) : "#000",
    };

    return style;
}

export const getDraggedElement = {
    from:"",
    data:{
      eleInfo:null,
      elements:[],
    },
    sectionIdx:-1,
    elementIdxs:[],
    type:'',
}

export const getChangeStyleOfElement = {
    from:"",
    data:{
      eleInfo:null,
      elements:[],
    },
    sectionIdx:-1,
    elementIdxs:[],
    type:'',
}

export const getHoveredElement = {
    sectionIdx:-1,
    elementIdxs:[],
    type:"",
}

export const getColumnStrNumber = (colStr:string) => {
    const _colStr = colStr.split(" ");
    const _colMd = _colStr[1].split("-");
    return parseInt(_colMd[2]);
}

export const getColumnStr = (col:number, colStr:string) => {

    const colStrNum = getColumnStrNumber(colStr) - col;

    const retVal = {
        str:"",
        colVal:0
    }
    if(colStrNum >= 0){
        retVal.str = `col-sm-12 col-md-${colStrNum}`;
        retVal.colVal = colStrNum;
    }else{
        retVal.str = `col-sm-12 col-md-0`;
        retVal.colVal = colStrNum;
    }

    return retVal;

}

export const convertHexToRGB = (hex:string) => {

    let aHex = "ff";
    let _hex = (hex.includes("#")) ? (hex.replace("#", "")) : hex;

    let is3Letter = false;
    if(_hex.length && _hex.length < 4){
        is3Letter = true;
    }

    let rHex = !is3Letter ? _hex.slice(0,2) : _hex.slice(0,2);
    let gHex = !is3Letter ? _hex.slice(2,4) : _hex.slice(2,3) + _hex.slice(0,1);
    let bHex = !is3Letter ? _hex.slice(4,6) : _hex.slice(0,2);
   
    if(_hex.length > 6){
        aHex = _hex.slice(6);
    }

    let r = parseInt(rHex, 16);
    let g = parseInt(gHex, 16);
    let b = parseInt(bHex, 16);
    let a = ((parseInt(aHex, 16))/255).toFixed(2);

    let ret = {
        r:r,
        g:g,
        b:b,
        a:a,
    }
    return ret;
}

export const convertRgbaToHex = (r:number, g:number, b:number, a:number) => {
    const red = r.toString(16).padStart(2, '0');
    const green = g.toString(16).padStart(2, '0');
    const blue = b.toString(16).padStart(2, '0');
    const alpha = Math.round(a * 255).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}${alpha}`;
}

export const getClassFromSelector = (val:string) => {
    let _selName = val.replaceAll(' ','-');
    _selName = _selName.toLowerCase();
    return `${_selName}`;
}

export const setClassesName = (ret:any, tempStyleCtx:any, childIdx:number=-1) => {

    if(childIdx === -1){
        if(ret && ret?.parent){
            if(tempStyleCtx?.styleClasses?.mainClassName){
              tempStyleCtx.styleClasses.mainClassName.push(ret.parent);
            }else{
              tempStyleCtx.styleClasses.mainClassName = [ret.parent];
            }
        }
    }else{
        if(ret && ret?.parent){
            if(tempStyleCtx?.styleClasses?.mainClassName){
              tempStyleCtx.styleClasses.mainClassName.push(ret.parent);
            }else{
              tempStyleCtx.styleClasses.mainClassName = [ret.parent];
            }
        }
        if(ret && ret?.child){
            if(tempStyleCtx?.styleClasses?.childClassName && tempStyleCtx?.styleClasses?.childClassName[childIdx] && isObj(tempStyleCtx?.styleClasses?.childClassName[childIdx])){
              tempStyleCtx.styleClasses.childClassName[childIdx].push(ret.child);
            }else{
              tempStyleCtx.styleClasses.childClassName[childIdx] = [ret.child];
            }
        }
    }

    return tempStyleCtx;

}

export const generateClassNameStr = (styleClasses:any) => {
    let clsStr = "";
    
    for(let i=0; i<styleClasses?.mainClassName?.length; i++){
        if(isObj(styleClasses?.mainClassName[i])){
            clsStr += ` ${styleClasses?.mainClassName[i]?.label.replaceAll(" ", "-").toLowerCase()} `;
        }
    }
    
    return clsStr;

}

export const generateFormClassNameStr = (styleClasses:any, element:string) => {
    let clsStr = "";
    
    switch(element){
        case "fullNameClassName":
            for(let i=0; i<styleClasses?.fullNameClassName?.length; i++){
                clsStr += ` ${styleClasses?.fullNameClassName[i]?.label.replaceAll(" ", "-").toLowerCase()} `;
            }
            break
        case "emailClassName":
            for(let i=0; i<styleClasses?.emailClassName?.length; i++){
                clsStr += ` ${styleClasses?.emailClassName[i]?.label.replaceAll(" ", "-").toLowerCase()} `;
            }
            break
        case "subjectClassName":
            for(let i=0; i<styleClasses?.subjectClassName?.length; i++){
                clsStr += ` ${styleClasses?.subjectClassName[i]?.label.replaceAll(" ", "-").toLowerCase()} `;
            }
            break
        case "msgClassName":
            for(let i=0; i<styleClasses?.msgClassName?.length; i++){
                clsStr += ` ${styleClasses?.msgClassName[i]?.label.replaceAll(" ", "-").toLowerCase()} `;
            }
            break
        case "submitClassName":
            for(let i=0; i<styleClasses?.submitClassName?.length; i++){
                clsStr += ` ${styleClasses?.submitClassName[i]?.label.replaceAll(" ", "-").toLowerCase()} `;
            }
            break
    }
    
    return clsStr;

}

export const generateMenuClassNameStr = (menuClassName:any) => {
    let clsStr = "";
    if(menuClassName && menuClassName?.length){
        for(let i=0; i<menuClassName?.length; i++){
            if(isObj(menuClassName[i])){
                clsStr += ` ${menuClassName[i]?.label?.replaceAll(" ", "-").toLowerCase()} `;
            }
        }
    
    }
    
    return clsStr;
}

export const generateChildClassNameStr = (styleClasses:any, childIdx:number) => {
    let clsStr = "";
    if(styleClasses?.childClassName && styleClasses?.childClassName[childIdx] && styleClasses?.childClassName[childIdx]?.length){
        for(let i=0; i<styleClasses?.childClassName[childIdx]?.length; i++){
            if(isObj(styleClasses?.childClassName[childIdx][i])){
                clsStr += ` ${styleClasses?.childClassName[childIdx][i]?.label?.replaceAll(" ", "-").toLowerCase()} `;
            }
        }
    
    }
    
    return clsStr;
}

export const isObj = (obj:any) => {
    if (typeof obj === 'object' && obj !== null) return true;
    return false;
}

export const getTypeOfElement = (type:string) => {
    switch(type){
        case "Button":
            return "button";
            break;
        case "Progress":
            return "progressBar";
            break;
        case "SocialIcon":
            return "socialIcons";
            break;
        case "Separator":
            return "seprator";
            break;
        case "Menu":
            return "menu";
            break;
        case "Timer":
            return "timers";
            break;
        case "Html":
            return "html";
            break;
        case "Image":
            return "image";
            break;
        case "Video":
            return "video";
            break;
        case "Form":
            return "form";
            break;
        case "Heading":
            return "headings";
            break;

    }

    return "";
}
