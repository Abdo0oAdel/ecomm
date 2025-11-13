import { useState, useEffect } from "react";

export const useCart = () => {
    const [cart, setCart] = useState([])
    return {cart, setCart}
}

export default useCart;