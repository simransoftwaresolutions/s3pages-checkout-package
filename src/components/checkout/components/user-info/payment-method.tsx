import { PaymentLogo, PaymentType } from "../../../../constant/payment"
import { useCheckout } from "../../../../context/product/useProductCheckout"

export const PaymentMethod = ({ type, active }: any) => {
    const { handleChange } = useCheckout() as any

    if (type?.length === 1) {
        return type.includes(PaymentType.PAYPAL) ?
            <img src={PaymentLogo.PAYPAL} alt={PaymentType.PAYPAL} /> :
            <img src={PaymentLogo.STRIPE} alt={PaymentType.STRIPE} />
    }

    return <ul className="nav nav-tabs">
        {
            type?.map((item: string, index: number) => {
                return <li key={index} onClick={() => handleChange("method", item)}
                    className={`${active === item ? "active" : ""}`} >
                    <a data-toggle="tab" href={`#${item}`}>{item}</a>
                </li>
            })
        }
    </ul>

}