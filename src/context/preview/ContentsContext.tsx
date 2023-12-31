import { createContext, useContext, ReactNode, useState } from 'react';

export interface SectionsType {
  eleInfo:any;
  elements?:any[];
}

const defaultSectionc:SectionsType = {
  eleInfo:null,
  elements:[],
}

interface DraggedElementType {
  from:string;
  data:SectionsType;
  sectionIdx:number;
  elementIdxs:number[];
  type:string;
}

const defaultDraggedElement:DraggedElementType = {
  from:"",
  data:defaultSectionc,
  sectionIdx:-1,
  elementIdxs:[],
  type:'',
}

interface ChangeStyleOfElementType {
  from:string;
  data:SectionsType;
  sectionIdx:number;
  elementIdxs:number[];
  type:string;
}

interface TempStyleSelectorType {
  objOfElementStyle:ChangeStyleOfElementType;
  isStyleAdd:boolean;
  selectorArr:any[];
}

const defaultChangeStyleOfElement:ChangeStyleOfElementType = {
  from:"",
  data:defaultSectionc,
  sectionIdx:-1,
  elementIdxs:[],
  type:'',
}

export const defaultTempStyleSelector:TempStyleSelectorType = {
  objOfElementStyle:defaultChangeStyleOfElement,
  isStyleAdd:false,
  selectorArr:[],
}

interface HoveredElementType {
  sectionIdx:number;
  elementIdxs:number[];
  type:string;
}

const defaultHoveredElement:HoveredElementType = {
  sectionIdx:-1,
  elementIdxs:[],
  type:"",
}

interface ContentActionType {
  draggableEleIdx:number; // to enable element drag
  tooltipEnableString:string; // to enable element/column tooltip display
}

const defaultContentAction:ContentActionType = {
  draggableEleIdx:-1,
  tooltipEnableString:"",
}

type contentsContextType = {
  sectionCtx: SectionsType[]; // main container of data
  setSectionCtx:(sectionsCtx:any) => void;
  
  draggedElement: DraggedElementType; // container of dragged element's data
  setDraggedElement:(draggedElement:DraggedElementType) => void;
  
  changeStyleOfElement: ChangeStyleOfElementType; // container of element data to be change style(css)
  setChangeStyleOfElement:(changeStyleOfElement:ChangeStyleOfElementType) => void;
  
  hoveredElement: HoveredElementType; // container of hovered element's data
  setHoveredElement:(hoveredElement:HoveredElementType) => void;
  
  contentAction: ContentActionType; // container of common actions
  setContentAction:(contentAction:ContentActionType) => void;
  
  tempStyleSelector: TempStyleSelectorType; // Contains shadow copy of style selector information
  setTempStyleSelector:(tempStyleSelector:TempStyleSelectorType) => void;

};



const contentsContextDefaultValues: contentsContextType = {
  sectionCtx: [],
  setSectionCtx:(sectionsCtx:any) => {},

  draggedElement: defaultDraggedElement,
  setDraggedElement:(draggedElement:DraggedElementType) => {},

  changeStyleOfElement: defaultChangeStyleOfElement,
  setChangeStyleOfElement:(changeStyleOfElement:ChangeStyleOfElementType) => {},

  hoveredElement: defaultHoveredElement,
  setHoveredElement:(hoveredElement:HoveredElementType) => {},

  contentAction: defaultContentAction,
  setContentAction:(contentAction:ContentActionType) => {},

  tempStyleSelector: defaultTempStyleSelector,
  setTempStyleSelector:(tempStyleSelector:TempStyleSelectorType) => {},
};

const ContentsContext = createContext<contentsContextType>(contentsContextDefaultValues);

export function useContentCtx() {
  return useContext(ContentsContext);
}

type Props = {
  children: ReactNode;
};


export const ContentsProvider = ({ children }: Props) => {
    const [sectionCtx, _setSectionCtx] = useState<SectionsType[]>([]);
    const [draggedElement, _setDraggedElement] = useState<DraggedElementType>(defaultDraggedElement);
    const [changeStyleOfElement, _setChangeStyleOfElement] = useState<ChangeStyleOfElementType>(defaultChangeStyleOfElement);
    const [hoveredElement, _setHoveredElement] = useState<HoveredElementType>(defaultHoveredElement);
    const [contentAction, _setContentAction] = useState<ContentActionType>(defaultContentAction);
    const [tempStyleSelector, _setTempStyleSelector] = useState<TempStyleSelectorType>(defaultTempStyleSelector);

    const setSectionCtx = (sectionsCtx:SectionsType[]) => {
      _setSectionCtx(sectionsCtx);
    };

    const setDraggedElement = (newDraggedElement:DraggedElementType) => {
      const newState = {...draggedElement, ...newDraggedElement};
      if (newState !== draggedElement) {
          _setDraggedElement(newState);
      }
    }

    const setChangeStyleOfElement = (newChangeStyleOfElement:ChangeStyleOfElementType) => {
      const newState = {...changeStyleOfElement, ...newChangeStyleOfElement};
      if (newState !== changeStyleOfElement) {
          _setChangeStyleOfElement(newState);
      }
    }

    const setHoveredElement = (newHoveredElement:HoveredElementType) => {
      const newState = {...hoveredElement, ...newHoveredElement};
      if (newState !== hoveredElement) {
          _setHoveredElement(newState);
      }
    }

    const setContentAction = (newContentAction:ContentActionType) => {
      const newState = {...contentAction, ...newContentAction};
      if (newState !== contentAction) {
          _setContentAction(newState);
      }
    }

    const setTempStyleSelector = (newTempStyleSelector:TempStyleSelectorType) => {
      const newState = {...tempStyleSelector, ...newTempStyleSelector};
      if (newState !== tempStyleSelector) {
          _setTempStyleSelector(newState);
      }
    }

    const value = {
      sectionCtx,
      setSectionCtx,
      draggedElement,
      setDraggedElement,
      changeStyleOfElement,
      setChangeStyleOfElement,
      hoveredElement,
      setHoveredElement,
      contentAction,
      setContentAction,
      tempStyleSelector,
      setTempStyleSelector,
    };

    return (
      <>
        <ContentsContext.Provider value={value}>
          {children}
        </ContentsContext.Provider>
      </>
    );
}