import styles from '../../../../../../styles/editorui/SeparatorAtom.module.css';
import SeparatorAtomProps from './ISeparatorAtom';
import { generateClassNameStr, generateChildClassNameStr } from "../../../../../../utils/functions";

const SeparatorAtom = ({
                    refInner,
                    styleClasses,
                    onClick}:SeparatorAtomProps
                ) => {

                const styleSelectorName = generateClassNameStr(styleClasses);
                const childStyleName = generateChildClassNameStr(styleClasses, 0);

                return (
                    <div ref={refInner} className={`${styleSelectorName}`}>
                        <hr className={`${styles.defaultSeparator} ${childStyleName}`} />
                    </div>
                )

}

export default SeparatorAtom;