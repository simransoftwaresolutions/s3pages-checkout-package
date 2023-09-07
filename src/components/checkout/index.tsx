"use client";

import { CheckoutPage } from "./components";
import { ProductProvider } from "../../context/product/product.provider";
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../../styles/globals.css"

export function CheckoutProduct({ data }: { data: any }) {

    const pord = {
        _id: "647476385ad67874adf8abed",
        "client": "642ffdfb8bd3d01e79a90a98",
        "name": "Girl Power, Lotion",
        "officialname": "honey ",
        "description": "honery is sweet and tasty.",
        "imagePath": {
            "fileId": "64807a4b03d6a6e383536fea",
            "key": "faac09b24f88bc73d1c4b359b58b5e84-11810247.png"
        },
        "seo_url": "seo_url1",
        "seo_title": "sdaf",
        "seo_description": "asdfasdf",
        "billing_type": "OT",
        "one_time_description": "asdf",
        "one_time_price": "123",
        "one_time_tax": "123",
        "recurring_type": "M",
        "recurring_shipping": "123",
        "recurring_tax": "123",
        "sales_page_type": "external",
        "sales_page_exturl": "Honey,Bee 1",
        "thankyou_page_type": "sitepage",
        "thankyou_page_exturl": "Honey,Bee 1",
        "payment_modules": [
            "paypal",
            "stripe"
        ],
        "refund_policy": 14,
        "checkout_page_retargeting_pixel": "123123",
        "checkout_fields": [
            "email",
            "lname",
            "fname",
            "city_postal",
            "phone"
        ],
        "email_marketing_tool_refund": "Aweber",
        "email_marketing_tool_purchase": "Campaignmonitor",
        "outgoing_smtp": "SMTP",
        "orderconfirmation_from_name": "SAD",
        "orderconfirmation_from_email": "Asd",
        "orderconfirmation_subject": "asd",
        "orderconfirmation_message": "fg",
        "orderconfirmation_ipn_url": "sdfgs",
        "deleted": 0,
        "createdAt": "2023-05-29T08:26:35.465Z",
        "updatedAt": "2023-09-02T11:32:46.228Z",
        "__v": 0,
        "sales_page": "Title1,Title1 1,6461f849d26e32137e61b8f6",
        "thankyou_page": "testsite,H,New 2,64660fb427827070ff320f43",
        "recurring_description": "",
        "recurring_first_price": "",
        "recurring_length": "",
        "recurring_trial_days": "",
        "recurring_trial_price": "",
        "customer_tag": "",
        "checkout_page_settings": "{\"formBorderColor\":\"\",\"formBackgroundColor\":\"#fff\",\"pageBackgroundColor\":\"\",\"headerBackgroundColor\":\"\"}",
        "order_bump": "",
        "checkout_page_logo": {
            "fileId": "6475af77b1c12091ee04b22d",
            "key": "13c21723a7f7a261f4479d82dfcee51e-logo.png"
        },
        "domain": "test-subdomain.s3pages.com",
        "affiliate_enabled": "no",
        "affiliate_page": "Title1 5,Title1 6,6465d43de6a64603de54df00",
        "checkout_page_template": "second",
        "site": "64eda06d448cb0023a2d3bc9"
    }

    return (
        <>
            <ToastContainer
                pauseOnHover={false}
                autoClose={1500}
                hideProgressBar
            />

            <ProductProvider data={pord}>
                <div className="bg-white">
                    <CheckoutPage />
                </div>
            </ProductProvider>
        </>
    );
}

