import { fetchOneProduct } from "@/service/products"

export const fetchProductFromSlug = async (slug: string) => {
    const response = await fetchOneProduct(slug)
    return response
}