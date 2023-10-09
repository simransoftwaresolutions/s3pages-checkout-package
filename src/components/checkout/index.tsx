"use client";

import { CheckoutPage } from "./components";
import { ProductProvider } from "../../context/product/product.provider";
import { ToastContainer } from 'react-toastify';
import { useGlobalCSS } from "../../helper/arrayToCss";
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../../styles/globals.css"

export function CheckoutProduct({ product, style }: { product: any, style: any }) {

    useGlobalCSS(style ?? [])

    return (
        <>
            <ToastContainer
                pauseOnHover={false}
                autoClose={1500}
                hideProgressBar
            />

            <ProductProvider data={product}>
                <div className="bg-white">
                    <CheckoutPage />
                </div>
            </ProductProvider>
        </>
    );
}

