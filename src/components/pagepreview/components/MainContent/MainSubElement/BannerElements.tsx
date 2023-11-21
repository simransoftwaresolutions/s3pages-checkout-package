import { Fragment } from 'react'
import BannerAtom from '../../../components/Atoms/ElementsAtoms/BannerAtom';
import styles from '../../../../../styles/pagepreview/MainSubElement.module.css';
import { generateClassNameStr, generateChildClassNameStr } from "../../../../../utils/functions";
import DefaultImage from '../../../components/Atoms/DefaultImage';

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  eIdx:number;
  // onClick:()=>void;
}

const BannerElements = ({type, props, refBtn, eIdx}:Prop) => {

  const mainCls = generateClassNameStr(props?.styleClasses);

  return (
    <Fragment>
      {
        props?.bannerData?.image?.length ?
          <div ref={refBtn} id={`carouselIndicators${eIdx}`} className={`${styles.bannerSlide} carousel slide ${mainCls}`} data-bs-ride="carousel">
        
            <div className="carousel-indicators">
            {
                props?.bannerData?.image?.length ?
                  props?.bannerData?.image?.map((bData:any, bIdx:number)=>{
                    return <button key={bIdx} type="button" data-bs-target={`#carouselIndicators${eIdx}`} data-bs-slide-to={bIdx} className={`${styles.bannerBtn} ${bIdx === 0 ? "active":""}`} aria-label={`Slide ${bIdx+1}`}></button>
                  })
                :
                <></>
              }
            </div>
      
            <div className="carousel-inner">
              {
                props?.bannerData?.image?.length ?
                props?.bannerData?.image?.map((img:any, bIdx:number)=>{
                    return <BannerAtom bIdx={bIdx} key={bIdx} refInner={refBtn} {...props} img={img} />
                  })
                :
                <></>
              }
            </div>
      
            <button className={`${styles.bannerBtn} carousel-control-prev`} type="button" data-bs-target={`#carouselIndicators${eIdx}`} data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className={`${styles.bannerBtn} carousel-control-next`} type="button" data-bs-target={`#carouselIndicators${eIdx}`} data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        :<div className={`${styles.noFaq} faq-placeholder`}><DefaultImage /></div>
      }
    </Fragment>

  )
}

export default BannerElements;
