import PageTemplate from "../../../../components/page-template";
import Slidersection from "../../../../components/slidersection";
import Bannersection from "../../../../components/bannersection";

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