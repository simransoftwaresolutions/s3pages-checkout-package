import { useCheckout } from "@/context/product/useProductCheckout"
import { Form } from "@/types/checkout-form-input"
import { useEffect } from "react"

export const Input = ({ title, field, type = "text", show = true, error: isError }: Form) => {
    const { formInfo, handleChange, setError, error } = useCheckout()

    useEffect(() => {
        if (isError) {
            setTimeout(() => {
                setError({ ...error, [field]: false })
            }, 2000)
        }
        return () => { }
    }, [isError])

    return show ? <div className="form-group col-md-6 col-sm-12 col-xs-12">
        <label> {title} </label>
        <input
            type={type}
            name={`bl_${field}`}
            value={formInfo?.[field] ?? ""}
            onChange={(e: any) => handleChange(field, e.target.value)}
            className="form-control input-field"
            placeholder={`Enter the ${title}`}
        />
        {isError ? <p className="text-danger m-0">please provide {field.toLowerCase()}</p> : null}
    </div> : <></>
}