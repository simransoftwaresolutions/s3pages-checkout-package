import { useContext } from "react";
import { CheckoutProductContext } from "./product.context";

export const useCheckout = () => useContext(CheckoutProductContext)
