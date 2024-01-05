import PageTemplate from "../../../../page-template";
import Slidersection from "../../../../slidersection";
import Bannersection from "../../../../bannersection";

interface MainMyCompProps {
    componentName?:string;
}

const MainMyComponent = ({componentName}:MainMyCompProps) => {

    switch(componentName){
        case "PageTemplate":
            return <PageTemplate />
        break;
        case "Slidersection":
            return <PageTemplate />
        break;
        case "Bannersection":
            return <PageTemplate />
        break;
        default:
        return <></>;
        
    }

}

export default MainMyComponent;