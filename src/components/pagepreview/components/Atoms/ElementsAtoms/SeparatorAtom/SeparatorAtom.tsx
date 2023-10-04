import styles from './SeparatorAtom.module.css';
import SeparatorAtomProps from './ISeparatorAtom';
import { generateClassNameStr, generateChildClassNameStr } from "../../../../../../utils/functions";

const SeparatorAtom = ({
                    style,
                    cssClass,
                    separatorBorderWidth,
                    separatorBorderHeight,
                    separatorBorderStyle,
                    separatorBorderColor,
                    name,
                    refInner,
                    styleClasses,
                    onClick}:SeparatorAtomProps
                ) => {

                const styleSelectorName = generateClassNameStr(styleClasses);
                const childStyleName = generateChildClassNameStr(styleClasses, 0);

                return (
                    <div ref={refInner} className={`${styleSelectorName}`}>
                        <hr className={`${childStyleName}`} />
                    </div>
                )

}

export default SeparatorAtom;