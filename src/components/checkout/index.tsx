"use client";

import { CheckoutPage } from "./components";
import { ProductProvider } from "../../context/product/product.provider";
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export function CheckoutProduct({ data }: { data: any }) {
    return (
        <>
            <ToastContainer
                pauseOnHover={false}
                autoClose={1500}
                hideProgressBar
            />

            <ProductProvider data={data.product}>
                <div className="bg-white">
                    <CheckoutPage />
                </div>
            </ProductProvider>
        </>
    );
}

