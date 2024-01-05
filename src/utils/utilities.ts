
import ENV from "./env";

import {
    deepCloneStyle,  
    deepCloneSection,  
    deepCloneArray,  
    filebrowserCallback,  
    getElementName,  
    getTemplateStyle,  
    getDraggedElement,  
    getChangeStyleOfElement,  
    getHoveredElement,  
    getColumnStrNumber,  
    getColumnStr,  
    convertHexToRGB,  
    convertRgbaToHex,  
    getClassFromSelector,  
    setClassesName,  
    generateClassNameStr,  
    generateFormClassNameStr,  
    generateMenuClassNameStr,  
    generateChildClassNameStr,  
    isObj,  
    getTypeOfElement,  
    getSeoUrlFromPageId  
} from "./functions";

import MainContent from "../components/pagepreview/components/MainContent";
import MainContent2 from "../components/pagepreview/components/MainContent/MainContent2";
import SectionUI from "../components/editorui/components/section/ui";
import DragdropPopup from "../components/editorui/atoms/DragdropPopup";

import StyleGenerater from "../components/editorui/atoms/StyleGenerater";
import FileManager from '../components/editorui/atoms/FileManager';
import DefaultImage from "../components/editorui/atoms/DefaultImage";
import PreviewElement from "../components/pagepreview/components/Atoms/PreviewElement";
import { ToastContainer, toast } from 'react-toastify';

import { 
    getCollectionData,
    getSingleCollectionData
} from "../service/editorui/CollectionDataService";

import { 
    GetAllCollection
} from "../service/editorui/CollectionService";

import { 
    GetDirectories,
    CreateFolder,
    uploadImage,
} from "../service/editorui/Directories";

import { 
    GetAllSectionTags,
} from "../service/editorui/ElementServices";

import { 
    deleteFile,
    renameFileService,
    exportMultipleDocs,
} from "../service/editorui/FolderServices";

import { 
    AddFolder,
    uploadFileToFolder,
    FetchFolders,
    FolderDelete,
} from "../service/editorui/ModalServices";

import { 
    GetAllCollectionData,
    GetCollectionData,
    SubmitFormApi,
    GetSiteData,
    GetThemeSiteStyles,
    GetAutoResponderData,
} from "../service/editorui/PagesServices";

export {
    ENV,
    deepCloneStyle,  
    deepCloneSection,  
    deepCloneArray,  
    filebrowserCallback,  
    getElementName,  
    getTemplateStyle,  
    getDraggedElement,  
    getChangeStyleOfElement,  
    getHoveredElement,  
    getColumnStrNumber,  
    getColumnStr,  
    convertHexToRGB,  
    convertRgbaToHex,  
    getClassFromSelector,  
    setClassesName,  
    generateClassNameStr,  
    generateFormClassNameStr,  
    generateMenuClassNameStr,  
    generateChildClassNameStr,  
    isObj,  
    getTypeOfElement,  
    getSeoUrlFromPageId,
    MainContent,
    MainContent2,
    SectionUI,
    DragdropPopup,
    StyleGenerater,
    FileManager,
    DefaultImage,
    PreviewElement,
    ToastContainer, 
    toast,
    getCollectionData,
    getSingleCollectionData,
    GetAllCollection,
    GetDirectories,
    CreateFolder,
    uploadImage,
    GetAllSectionTags,
    deleteFile,
    renameFileService,
    exportMultipleDocs,
    AddFolder,
    uploadFileToFolder,
    FetchFolders,
    FolderDelete,
    GetAllCollectionData,
    GetCollectionData,
    SubmitFormApi,
    GetSiteData,
    GetThemeSiteStyles,
    GetAutoResponderData,
}