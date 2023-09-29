interface Style {

}
export default interface ProgressBarProps {
    style?:Style;
    refInner?:any;
    bannerData?:any;
    styleClasses?:any;
    img?:any;
    bIdx:number;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>) => void;
}