import styles from './DefaultImage.module.css';
import { ShimmerCategoryItem  } from "react-shimmer-effects";

const DefaultImage = () => {
    return (
        <div className="shimmer-box">
            <ShimmerCategoryItem
                hasImage
                imageType="circular"
                imageWidth={30}
                imageHeight={30}
                title
            />
        </div>

    ) 
};

export default DefaultImage;