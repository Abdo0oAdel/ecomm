import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/Cart/slice';
import { addToCart as addToCartAPI, getCart } from '../services/cart';
import { getProductById } from '../services/products';
import Swal from 'sweetalert2';

export const useCart = () => {
    const [cart, setCart] = useState([]);
    const [adding, setAdding] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart?.items || []);

    // Universal handler for adding to cart and updating Redux
    const handleAddToCart = async (product, quantity = 1) => {
        if (!product.isInStock || product.stock === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Out of Stock',
                text: 'This product is currently out of stock.',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        // Check if product already exists in cart
        const existingItem = cartItems.find(item =>
            (item.productId === product.id || item.id === product.id)
        );
        const currentQuantityInCart = existingItem?.quantity || 0;
        const totalQuantity = currentQuantityInCart + quantity;

        // Validate against available stock
        if (product.stock && totalQuantity > product.stock) {
            const remaining = product.stock - currentQuantityInCart;
            Swal.fire({
                icon: 'warning',
                title: 'Stock Limit Exceeded',
                html: `Only ${product.stock} ${product.stock === 1 ? 'item' : 'items'} available in stock.<br/>` +
                      `You already have ${currentQuantityInCart} in your cart.<br/>` +
                      (remaining > 0 ? `You can add ${remaining} more.` : 'Cannot add more items.'),
            });
            return;
        }

        setAdding(true);
        try {
            await addToCartAPI(product.id, quantity);
            const data = await getCart();

            // Enrich cart items with product details including stock
            const itemsWithDetails = await Promise.all(
                (data.items || []).map(async (item) => {
                    try {
                        const productData = await getProductById(item.productId);
                        const prodData = productData.data?.data || productData.data || {};
                        return {
                            ...item,
                            imageURL: prodData.imageURL,
                            name: prodData.productName || item.productName,
                            stock: prodData.stock,
                            isInStock: prodData.isInStock,
                        };
                    } catch (e) {
                        return item;
                    }
                })
            );

            dispatch(cartActions.setCart({ ...data, items: itemsWithDetails }));
            setCart(itemsWithDetails);
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