import styles from '../../../../../../styles/pagepreview/Heading.module.css';
import HeadingProps from './IHeading';
import { deepCloneArray, generateClassNameStr } from "../../../../../../utils/functions";

const Heading = ({
                    style,
                    cssClass, 
                    text,
                    headingType,
                    refInner,
                    styleClasses,
                    onClick}:HeadingProps
                ) => {

                    const styleSelectorName = generateClassNameStr(styleClasses);
                    const _textVal = text?.replaceAll("<p>","")?.replaceAll("</p>","");

                    const borderData = style?.border?.split(" ");
                    let borderWidth = '';
                    let borderColor = '';
                    let borderStyle = '';

                    if(borderData !== undefined){
                        borderWidth = borderData[0] + ' ' + borderData[1] + ' ' + borderData[2] + ' ' + borderData[3];
                        borderStyle = borderData[4];
                        borderColor = borderData[5];
                    }

                    switch(headingType){
                        case "h1":
                            return (
                                <h1
                                    className={`${styleSelectorName} ${cssClass}`}
                                    ref={refInner}
                                    style={{
                                        overflowWrap: "break-word",
                                    }}
                                    dangerouslySetInnerHTML={{__html: _textVal as string}}
                                ></h1>
                            )
                            break;
                        case "h2":
                            return (
                                <h2
                                    className={`${styleSelectorName} ${cssClass}`}
                                    ref={refInner}
                                    style={{
                                        overflowWrap: "break-word",
                                    }}
                                    dangerouslySetInnerHTML={{__html: _textVal as string}}
                                ></h2>
                            )
                            break;
                        case "h3":
                            return (
                                <h3
                                    className={`${styleSelectorName} ${cssClass}`}
                                    ref={refInner}
                                    style={{
                                        overflowWrap: "break-word",
                                    }}
                                    dangerouslySetInnerHTML={{__html: _textVal as string}}
                                ></h3>
                            )
                            break;
                        case "h4":
                            return (
                                <h4
                                    className={`${styleSelectorName} ${cssClass}`}
                                    ref={refInner}
                                    style={{
                                        overflowWrap: "break-word",
                                    }}
                                    dangerouslySetInnerHTML={{__html: _textVal as string}}
                                ></h4>
                            )
                            break;
                        case "h5":
                            return (
                                <h5
                                    className={`${styleSelectorName} ${cssClass}`}
                                    ref={refInner}
                                    style={{
                                        overflowWrap: "break-word",
                                    }}
                                    dangerouslySetInnerHTML={{__html: _textVal as string}}
                                ></h5>
                            )
                            break;
                        case "h6":
                            return (
                                <h6
                                    className={`${styleSelectorName} ${cssClass}`}
                                    ref={refInner}
                                    style={{
                                        overflowWrap: "break-word",
                                    }}
                                    dangerouslySetInnerHTML={{__html: _textVal as string}}
                                ></h6>
                            )
                            break;
                        case "paragraph":
                            return (
                                <p
                                    className={`${styleSelectorName} ${cssClass}`}
                                    ref={refInner}
                                    style={{
                                        overflowWrap: "break-word",
                                    }}
                                    dangerouslySetInnerHTML={{__html: _textVal as string}}
                                ></p>
                            )
                            break;
                    }
    
                    return <></>;

}

export default Heading;