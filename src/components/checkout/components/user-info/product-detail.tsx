import { useCheckout } from '../../../../context/product/useProductCheckout'
import { PaymentMethod } from './payment-method'
import { PaymentLogo, PaymentType } from '../../../../constant/payment'
import { t } from '../../../../constant/one-liner'

export const ProductDetail = () => {
    const { data } = useCheckout() as any

    return (
        <>
            <h2>{t.paymentInfo}</h2>

            <div id="horizontalTab" className="displayB width100per margin0" >

                <input type="hidden" name="paymentmethod" id="payment_method" value="" />
                <div className="resp-tabs-container ">

                    <div className="displayF width100">

                        <PaymentMethod
                            type={data?.payment_modules}
                            active={(data?.payment_modules ?? [])[0]}
                        />

                        {data?.payment_modules?.length > 1 && <div className="tab-content ">
                            <div id={PaymentType.PAYPAL} className="tab-pane fade in active">
                                <img src={PaymentLogo.PAYPAL} alt={PaymentType.PAYPAL} />
                            </div>

                            <div id={PaymentType.STRIPE} className="tab-pane fade  ">
                                <img src={PaymentLogo.STRIPE} alt={PaymentType.STRIPE} />
                            </div>
                        </div>}

                    </div>
                </div>
            </div>
        </>
    )
}
