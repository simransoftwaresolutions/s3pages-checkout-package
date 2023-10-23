const { toast } = require("react-toastify")

export const ErrorHandler = (data: Function) => {
    try {
        return data()
    } catch (error: any) {
        toast.error(error.message, { className: "errorToast" })
    }
}