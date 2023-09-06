import { useCheckout } from "../../../context/product/useProductCheckout"

export const CheckoutHeader = () => {
    const { data, setting } = useCheckout()

    return <header className="header-sec" style={{ background: setting?.headerBackgroundColor }}>
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <a className="headerlogo">
                        <img src={process.env.IMAGE_DOMAIN + data?.checkout_page_logo?.key} alt="logo" className="headerlogo img-responsive" />
                    </a>
                </div>
            </div>
        </div>
    </header>
}