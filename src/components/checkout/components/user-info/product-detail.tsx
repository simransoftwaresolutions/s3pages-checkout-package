import { useCheckout } from '../../../../context/product/useProductCheckout'
import { PaymentMethod } from './payment-method'
import { PaymentLogo, PaymentType } from '../../../../constant/payment'
import { t } from '../../../../constant/one-liner'

export const ProductDetail = () => {
    const { data } = useCheckout() as any

    return (
        <>
            <h2>{t.paymentInfo}</h2>

                

                <ul className="nav nav-tabs tablist-btn" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="paypal" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">{PaymentType.PAYPAL}</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="stripe" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">{PaymentType.STRIPE}</button>
                    </li>
                
                </ul>
                <div className="tab-content width-fixed" id="myTabContent">
                    <div className="text-center tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="paypal">
                        <img className='img-fluid' src={PaymentLogo.PAYPAL} alt={PaymentType.PAYPAL} />
                    </div>
                    <div className="tab-pane fade text-center" id="profile" role="tabpanel" aria-labelledby="stripe">
                        <img className='img-fluid' src={PaymentLogo.STRIPE} alt={PaymentType.STRIPE} />
                    </div>
                
                </div>



            {/* <div id="horizontalTab" className="displayB width100per margin0" >

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
            </div> */}


        </>
    )
}
