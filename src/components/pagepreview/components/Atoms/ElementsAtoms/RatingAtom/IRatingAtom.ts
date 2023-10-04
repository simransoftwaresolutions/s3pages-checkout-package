export default interface SeparatorAtomProps {
    refInner?:any;
    styleClasses?:any;
    stars?:[];
    rate?:string;
    iconSize?:string;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>) => void;
}