import { useCheckout } from '../../../../context/product/useProductCheckout'
import { PaymentLogo, PaymentType } from '../../../../constant/payment'
import { t } from '../../../../constant/one-liner'
import { PaymentTab } from './payment-method'

export const PaymentMethods = () => {
    const { data } = useCheckout() as any

    return (
        <>
            <h2>{t.paymentInfo}</h2>

            <PaymentTab info={data?.payment_modules} />

            {data?.payment_modules?.length > 1 ? <div className="tab-content width-fixed" id="myTabContent">
                <div className="text-center tab-pane fade show active" id="home" role="tabpanel" aria-labelledby={PaymentType.PAYPAL}>
                    <img className='img-fluid' src={PaymentLogo.PAYPAL} alt={PaymentType.PAYPAL} />
                </div>

                <div className="tab-pane fade text-center" id="profile" role="tabpanel" aria-labelledby={PaymentType.STRIPE}>
                    <img className='img-fluid' src={PaymentLogo.STRIPE} alt={PaymentType.STRIPE} />
                </div>

            </div> : null}

        </>
    )
}
