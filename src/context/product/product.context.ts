import { createContext } from "react";

export const CheckoutProductContext = createContext<{
    data: any,
    error: any,
    setError: React.Dispatch<React.SetStateAction<any>>,
    formInfo: any,
    setFormInfo: React.Dispatch<React.SetStateAction<any>>,
    setting: any,
    handleChange: (key: string, value: string) => void,
    totalPrice: () => void,
    handleSubmit: () => void,
    stripeData: any,
    setStripeData: React.Dispatch<React.SetStateAction<any>>
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
