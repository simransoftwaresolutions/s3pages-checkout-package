import { CaretRight } from '../../../../assets/image/caret-right';
import { t } from '../../../../constant/one-liner';
import { useCheckout } from '../../../../context/product/useProductCheckout';

export const ProductInfo = () => {

  const { data, totalPrice } = useCheckout() as any

  return (
    <div className="col-md-6 col-sm-6 col-xs-12 minHeight800" >
      <div className="profile-form-sec">

        <div className="first-price-sec"></div>

        <div>
          <img src={process.env.IMAGE_DOMAIN + data?.imagePath?.key} className="maxWidth450" alt="thumbnail" />
          <br />
          <br />
          <br />
          <h3 className="marginLeft15">{data.name ?? t.newProduct}</h3>
        </div>

        <br />
        <div className="third-coupon-sec">
          <ul>

            {/* subscriptoin amount -- to be implemented */}
            <li className="subtotal-sec row">
              <div className="coupon-L-sec col-md-4 col-sm-4 col-xs-4">
                <label>{t.subscription}:</label>
              </div>

              <div className="coupon-R-sec col-md-8 col-sm-8 col-xs-8">
                <label>$0.00</label>
              </div>
            </li>



            {/* shipping amount -- to be implemented */}
            <li className='row'>
              <div className="coupon-L-sec col-md-6 col-sm-6 col-xs-6">
                <label> {t.shipping} <CaretRight /> </label>
              </div>

              <div className="coupon-R-sec col-md-6 col-sm-6 col-xs-6">
                <label>${data?.recurring_shipping ?? "0"}.00</label>
              </div>
            </li>



            {/* sales tax of product -- to be added */}
            <li  className='row'>
              <div className="coupon-L-sec col-md-6 col-sm-6 col-xs-6">
                <label> {t.salesTax} <CaretRight /> </label>
              </div>

              <div className="coupon-R-sec col-md-6 col-sm-6 col-xs-6">
                <label>${data?.billing_type === "OT" ? data?.one_time_tax : data?.recurring_tax}.00</label>
              </div>
            </li>



            {/* total amount to pay */}
            <li className="total-pay row">
              <br />
              <br />

              <div className="coupon-L-sec col-md-6 col-sm-6 col-xs-6" >
                <label>{t.totalPay}</label>
              </div>

              <div className="coupon-R-sec col-md-6 col-sm-6 col-xs-6">

                <label className="total_amount">${totalPrice()}.00</label>
                <input type="hidden" id="total_amount" value="159" />
                <input type="hidden" id="coupon_flag" value="0" />
                <input type="hidden" id="coupon_amount" value="0" />
                <input type="hidden" id="disc_amount" value="0" />
                <input type="hidden" id="isperc" value="0" />
                <input type="hidden" id="iscoupon" value="0" />
              </div>
            </li>

          </ul>
        </div>

      </div>
    </div>
  );
}
