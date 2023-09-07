import { useCheckout } from '../../../../../context/product/useProductCheckout'
import { Input } from './input'

export const UserForm = () => {
    const { data, error } = useCheckout() as any

    return (
        <>
        <div className='row formRow'>
                <Input
                    title={"FIRST NAME "}
                    field={"firstName"}
                    error={error?.firstName ?? false}
                />
                <Input
                    title={"LAST NAME "}
                    field={"lastName"}
                    error={error?.lastName ?? false}
                />
                <Input
                    title={"EMAIL ADDRESS  "}
                    field={"email"}
                    error={error?.email ?? false}
                />
                <Input
                    title={"CITY "}
                    field={"city"}
                    show={data?.checkout_fields?.includes("city_postal") ?? false}
                    error={error?.city ?? false}
                />
                <Input
                    title={"PHONE NO. "}
                    field={"phone"}
                    show={data?.checkout_fields?.includes("phone") ?? false}
                    error={error?.phone ?? false}
                />
                <Input
                    title={"ADDRESS "}
                    field={"address"}
                    show={data?.checkout_fields?.includes("address") ?? false}
                    error={error?.address ?? false}
                />
        </div>
            
        </>
    )
}

