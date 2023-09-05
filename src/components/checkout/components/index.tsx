import { UserInfo } from "./user-info";
import { ProductInfo } from "./product-info";
import { useCheckout } from "@/context/product/useProductCheckout";
import { CheckoutHeader } from "./header";

export const CheckoutPage = () => {
    const { data, setting } = useCheckout()

    return (
        <>
            <CheckoutHeader />

            <section className="checkout-form-sec" style={{ background: setting?.pageBackgroundColor }}>
                <div className="container">
                    <div className="row">

                        {data?.checkout_page_template === "second" ?
                            <>
                                <UserInfo />
                                <ProductInfo />
                            </> :
                            <>
                                <ProductInfo />
                                <UserInfo />
                            </>
                        }

                        <div className="clearfix"></div>
                    </div>
                </div>
            </section>
        </>
    );
}


