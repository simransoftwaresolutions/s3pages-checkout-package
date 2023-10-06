import styles from '../../../../../../styles/pagepreview/RatingAtom.module.css';
import RatingAtomProps from './IRatingAtom';
import { generateClassNameStr, generateChildClassNameStr } from "../../../../../../utils/functions";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const drawStar = (star:string, childStyleName:string) => {

    switch(star){
        case "Star":
            return <StarIcon className={childStyleName} />;
            break;
        case "StarBorder":
            return <StarBorderIcon className={childStyleName} />;
            break;
        case "StarHalf":
            return <StarHalfIcon className={childStyleName} />;
            break;
        default:
            return <StarIcon className={childStyleName} />;
            break;
    }

}

const RatingAtom = ({
                    refInner,
                    styleClasses,
                    stars,
                    rate,
                    iconSize,
                    onClick}:RatingAtomProps
                ) => {

                const childStyleName = generateChildClassNameStr(styleClasses, 0);

                return (
                    <div className={`${styles.ratingCnt} ${childStyleName}`}>
                        {
                            stars?.map((star:string)=> {
                                return drawStar(star, childStyleName);
                            })
                        }
                        <span className={styles.rateText}>{rate}</span>
                    </div>
                )

}

export default RatingAtom;