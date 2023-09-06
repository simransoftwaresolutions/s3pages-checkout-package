import { useCheckout } from '../../../../context/product/useProductCheckout';
import { UserForm } from './form';
import { t } from '../../../../constant/one-liner';
import { FormSubmit } from './form/submit';
import { ProductDetail } from './product-detail';

export const UserInfo = () => {
    const { setting } = useCheckout() as any

    return (
        <div className="col-md-6 col-sm-6 col-xs-12 minHeight800" >
            <div className="check-info-sec" style={{ background: setting?.formBackgroundColor, border: `2px solid ${setting?.formBorderColor}` }}>
                <h3>{t.billingInfo}</h3>

                <form className="checkout-form" id="checkout_form" onSubmit={(e: any) => e.preventDefault()}>
                    <div className="payment_server_response"></div>

                    {/* user detail form */}
                    <UserForm />

                    <div className="clearfix"></div>
                    {/* details about product like:- payment-method, amount */}
                    <ProductDetail />

                    {/* submit form with product detail and userDetail */}
                    <FormSubmit />
                </form>
            </div>
        </div>
    );
}
