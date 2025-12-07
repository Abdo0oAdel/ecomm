import { useState } from "react";
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/Cart/slice';
import { addToCart as addToCartAPI, getCart } from '../services/cart';
import Swal from 'sweetalert2';

export const useCart = () => {
    const [cart, setCart] = useState([]);
    const [adding, setAdding] = useState(false);
    const dispatch = useDispatch();

    // Universal handler for adding to cart and updating Redux
    const handleAddToCart = async (product, quantity = 1) => {
        if (!product.isInStock || product.stock === 0) return;
        setAdding(true);
        try {
            await addToCartAPI(product.id, quantity);
            const data = await getCart();
            dispatch(cartActions.setCart(data));
            setCart(data.items || []);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Add to Cart',
                text: err.message || 'Unable to add item to cart. Please try again.',
            });
        } finally {
            setAdding(false);
        }
    };

    return { cart, setCart, handleAddToCart, adding };
}

export default useCart;