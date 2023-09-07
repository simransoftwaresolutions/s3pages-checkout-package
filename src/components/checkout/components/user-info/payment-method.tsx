import { PaymentLogo, PaymentType } from "../../../../constant/payment"
import { useCheckout } from "../../../../context/product/useProductCheckout"

export const PaymentTab = ({ info }: any) => {
    const { handleChange } = useCheckout() as any

    if (info?.length === 1) {
        return info.includes(PaymentType.PAYPAL) ? <PaymentMethodImage type={PaymentType.PAYPAL} /> : <PaymentMethodImage type={PaymentType.STRIPE} />
    }

    return <ul className="nav nav-tabs tablist-btn" id="myTab" role="tablist">

        <li className="nav-item" role="presentation" onClick={() => handleChange("method", PaymentType.PAYPAL)}>
            <button className="nav-link active capitalize" id={PaymentType.PAYPAL} data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">{PaymentType.PAYPAL}</button>
        </li>

        <li className="nav-item" role="presentation" onClick={() => handleChange("method", PaymentType.STRIPE)}>
            <button className="nav-link capitalize" id={PaymentType.STRIPE} data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">{PaymentType.STRIPE}</button>
        </li>

    </ul>

}



const PaymentMethodImage = ({ type }: { type: PaymentType }) => {
    return <div className="text-center tab-pane fade show active" id={type} role="tabpanel" aria-labelledby={type}>
        <img className='img-fluid' src={type === PaymentType.STRIPE ? PaymentLogo.STRIPE : PaymentLogo.PAYPAL} alt={type} />
    </div>
}