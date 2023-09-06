import { createContext, Dispatch, SetStateAction } from "react";

export const CheckoutProductContext = createContext<{
    data: any,
    error: any,
    setError: Dispatch<SetStateAction<any>>,
    formInfo: any,
    setFormInfo: Dispatch<SetStateAction<any>>,
    setting: any,
    handleChange: (key: string, value: string) => void,
    totalPrice: () => void,
    handleSubmit: () => void,
    stripeData: any,
    setStripeData: Dispatch<SetStateAction<any>>
}>({
    data: {},
    error: {},
    setError: () => { },
    formInfo: {},
    setFormInfo: () => { },
    setting: {},
    handleChange: (key, value) => { },
    totalPrice: () => { },
    handleSubmit: () => { },
    stripeData: {},
    setStripeData: () => { }
})
