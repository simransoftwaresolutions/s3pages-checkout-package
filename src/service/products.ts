import axios from "axios"
import { ErrorHandler } from "../lib/error-handler"
import { toast } from "react-toastify"

export const fetchOneProduct = async (slug: string) => {
    return ErrorHandler(async () => {

        const response = await fetch(process.env.BASE_BACKEND_URL + `/fe/product/${slug}`)
        const responseJSON = await response.json()

        return responseJSON.status ? responseJSON?.data : responseJSON?.message
    })
}


export const checkoutProduct = async (data: any) => {

    return ErrorHandler(async () => {
        axios({
            maxRedirects: 0,
            method: 'post',
            url: process.env.BASE_BACKEND_URL + `/products/fe/checkout`,
            data,
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res: any) => {

                if (!res.data?.status) {
                    toast.error(res.data.message, { className: "errorToast" })
                    return
                }

                if (!!res.data?.forwardLink) {
                    window.location = res.data.forwardLink
                    return
                }

                window.location.href = res.data.data
            })
            .catch((err: any) => {
                toast.error(err.message, { className: "errorToast" })

            })
    })
}

