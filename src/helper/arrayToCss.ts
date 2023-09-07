
export const useGlobalCSS = (styleArray: Record<string, any>[]) => {

    const style = styleArray?.reduce((output: any, obj: Record<string, any>) => {

        const style = obj.data.styles
        const arr = style.split(",")

        // handle list of attribute of css of tag
        // e.g. :- font-family: "arial"; font-size: 10px;
        const finalCss = arr.reduce((output: any, css: string) => {

            const [key, value] = css.split(":")
            const isFontFamily = key.includes("font-family")

            return output + `${removeQuotes(key)}:${isFontFamily ? value : removeQuotes(value)};`
        }, "")

        return output + `${obj.data.selector}{\n${finalCss}\n}\n`

    }, "")

    applyStyleGlobally(style)
}



const removeQuotes = (key: string) => {
    return key.split('"').join("")
}


const applyStyleGlobally = (css: string) => {
    // Create a <style> element
    var styleElement = document.createElement("style");

    // Set the CSS text of the <style> element to your CSS rules
    styleElement.textContent = css;

    // Append the <style> element to the <head> of the document
    document.head.appendChild(styleElement);
}
