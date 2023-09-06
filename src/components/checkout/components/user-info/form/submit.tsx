import { t } from '../../../../../constant/one-liner'
import { useCheckout } from '../../../../../context/product/useProductCheckout'

export const FormSubmit = () => {
    const { handleSubmit } = useCheckout()

    return (
        <div className="third-coupon-sec r-submit-form">
            <ul>

                <li>
                    <div className="coupon-L-sec col-md-12 col-sm-12 col-xs-12">
                        <button
                            type="submit"
                            className="btn btn-default order-btn-submit"
                            onClick={() => handleSubmit()}>
                            {t.submitOrder}
                        </button>
                    </div>

                </li>

                <li className="refererror-sec">
                    <div className="coupon-L-sec col-md-6 col-sm-6 col-xs-12">
                        <label>&nbsp;</label>
                    </div>
                </li>

            </ul>
        </div>
    )
}
