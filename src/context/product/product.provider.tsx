import { isValidEmail } from '../../lib/valid-email'
import { checkoutProduct } from '../../service/products'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { CheckoutProductContext } from './product.context'

export const ProductProvider: FC<PropsWithChildren<{ data: any }>> = ({ children, data }) => {

    const [product, setProduct] = useState(data) as any
    const [formInfo, setFormInfo] = useState() as any
    const [stripeData, setStripeData] = useState() as any
    const setting = product !== undefined && JSON.parse(product?.checkout_page_settings ?? "{}")
    const [error, setError] = useState() as any


    const handleChange = (key: string, value: string) => {
        setFormInfo({ ...formInfo, [key]: value })
    }

    const totalPrice = () => {
        const tax = product?.billing_type === "OT" ? product?.one_time_tax : product?.recurring_tax
        const shipping = product?.recurring_shipping

        return parseInt(tax) + parseInt(shipping)
    }


    const handleSubmit = async () => {

        if (formInfo?.firstName === undefined) {
            setError({ ...error, firstName: true })
            return
        }
        if (formInfo?.lastName === undefined) {
            setError({ ...error, lastName: true })
            return
        }
        if (formInfo?.email === undefined || !isValidEmail(formInfo?.email)) {
            setError({ ...error, email: true })
            return
        }

        const method = formInfo?.method !== undefined ? formInfo?.method : product?.payment_modules[0]

        await checkoutProduct({
            ...formInfo,
            method: method === "paypal" ? "paypal" : "stripe",
            product: product?._id ?? product?.id,
        })
    }

    return (
        <CheckoutProductContext.Provider
            value={{
                data: product,
                formInfo,
                setFormInfo,
                setting,
                handleChange,
                totalPrice,
                handleSubmit,
                stripeData,
                setStripeData,
                error,
                setError
            }}>
            {children}
        </CheckoutProductContext.Provider>
    )
}
