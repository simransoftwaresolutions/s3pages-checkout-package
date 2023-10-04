interface Style {

}
export default interface ProgressBarProps {
    style?:Style;
    type?:string;
    styleType?:string; 
    stripe?:string; 
    animate?:string; 
    progress?:string; 
    text?:string; 
    refInner?:any;
    styleClasses?:any;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>) => void;
}