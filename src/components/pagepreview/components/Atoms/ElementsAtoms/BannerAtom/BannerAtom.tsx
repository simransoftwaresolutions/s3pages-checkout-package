import styles from '../../../../../../styles/pagepreview/BannerAtom.module.css';
import BannerAtomProps from './IBannerAtom';
import { generateClassNameStr, generateChildClassNameStr } from "../../../../../../utils/functions";
import ENV from '../../../../../../utils/env';

const BannerAtom = ({
                    style,
                    refInner,
                    styleClasses,
                    bannerData,
                    img,
                    bIdx,
                    onClick}:BannerAtomProps
                ) => {
                    
    return (
        <div className={`carousel-item ${bIdx === 0 ? "active":""}`}>
            <img src={`${ENV?.imagePath}${img}`} className="d-block w-100" alt="image" />
            <div className="carousel-caption d-none d-md-block">
                {bannerData?.label[bIdx] && <h5>{bannerData?.label[bIdx]}</h5>}
                {bannerData?.content[bIdx] && <p>{bannerData?.content[bIdx]}</p>}
            </div>
        </div>
    )

}

export default BannerAtom;