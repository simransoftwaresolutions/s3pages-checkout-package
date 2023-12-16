import { Fragment } from 'react'
import FormAtom from '../../../components/Atoms/ElementsAtoms/FormAtom';
import { useState, useEffect, useRef } from "react";
import { generateClassNameStr, getSeoUrlFromPageId } from "../../../../../utils/functions";
import { usePagesCtx } from '../../../../../context/pagepreview/PagesContext';
import { SubmitFormApi } from "../../../../../service/pagepreview/PagesServices";
import { toast } from 'react-toastify';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

const FormElements = ({type, props, refBtn}:Prop) => {

  const formRef = useRef<any>(null);
  const formEleRef = useRef<any>([]);
  
  const [ validation, setValidation ] = useState<string[]>([]);
  const { pageAction, funnelPages, queryData } = usePagesCtx();

  const redUrl = getSeoUrlFromPageId(props?.redirectUrl || "");

  const handleForm = async(e:any) => {
    e.preventDefault(); 
    const _validation = [];
    let isValidate = true;

    let activePage = pageAction?.activePage ? pageAction?.activePage : 0;
    const _pageId = funnelPages[activePage]?.pageData?.id || queryData?.pageId;
    
    let req:any = {};
    for(let i=0; i<props?.formArr?.length; i++){
      if(props?.formArr[i]?.required){
        switch(props?.formArr[i]?.type){
          case "text":
            const _text = formEleRef?.current[i]?.value?.length >= 3 ? true : false;
            _validation[i] = _text ? '': `${props?.formArr[i]?.label} is too short.`;
          break;
          case "email":
            const _email = formEleRef?.current[i]?.value?.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
            _validation[i] = _email ? '' : `${props?.formArr[i]?.label}  is invalid.`;
          break;
          default:
            const _textDefault = formEleRef?.current[i]?.value?.length >= 3 ? true : false;
            _validation[i] = _textDefault ? '': `${props?.formArr[i]?.label} is too short.`;
          break ;
        }
      }else{
        _validation[i] = '';
      }

      if(_validation[i]){
        isValidate = false;
      }else{
        let _reqKey = props?.formArr[i]?.type === "email" ? "email" : props?.formArr[i]?.label?.replaceAll(" ","")?.toLowerCase();
        req[_reqKey] = formEleRef?.current[i]?.value;
      }

    }


    if(isValidate){
      setValidation(_validation);
      if(!_pageId){toast.error("Something went wrong."); return;}
      req["page"] = _pageId;
      req["auto-responder"] = props?.autoResponder || "";
      req["tags"] = props?.tags || "";
      const res = await SubmitFormApi(req);
      if(res?.status){
        toast.success(res?.message);

        if(props?.redirectUrl){
          if (props?.urlType === "internal") {
              // window.location.href = redUrl;
          } else {
              // window.open(props?.redirectUrl, "_blank");
              // window.location.href = props?.redirectUrl;
          }
        }

      }else{
        toast.error(res?.message);
      }
    }else{
      setValidation(_validation);
    }
  }

  const styleSelectorName = generateClassNameStr(props?.styleClasses);

  return (
    <div ref={refBtn} className={`${styleSelectorName}`}>
        <form action="action" method="POST" ref={formRef}>
          <div className="row">
            {
              props?.formArr?.map((form:any, fIndex:any) => {
                const lastEle = (props?.formArr?.length -1) === fIndex ? true : false;
                return <FormAtom inputIdx={fIndex} lastEle={lastEle} {...props} formEleRef={(el:any) => (formEleRef.current[fIndex] = el)} formData={form} key={`form${fIndex}`} validation={validation[fIndex]} handleForm={handleForm} />
              })
            }

          </div>
        </form>

    </div>
  ) 
}

export default FormElements;
