import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { cartActions } from "../../../store/Cart/slice.js";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getCart, updateCartItemQuantity, removeCartItem } from "../../../services/cart";
import Swal from "sweetalert2";
import { getProductById } from "../../../services/products";

const Cart = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const couponCode = useSelector((state) => state.cart.couponCode);

    // Fetch cart data from API on mount
    useEffect(() => {
        async function fetchCart() {
            try {
                const data = await getCart();
                const itemsWithImages = await Promise.all(
                    (data.items || []).map(async (item) => {
                        try {
                            const product = await getProductById(item.productId);
                            const prodData = product.data || {};
                            return {
                                ...item,
                                imageURL: prodData.imageURL,
                                name: prodData.productName || item.productName,
                            };
                        } catch (e) {
                            // fallback if product fetch fails
                            return item;
                        }
                    })
                );
                dispatch(cartActions.setCart({ ...data, items: itemsWithImages }));
            } catch (err) {
                // Optionally handle error
                console.error('Failed to fetch cart', err);
            }
        }
        fetchCart();
    }, [dispatch]);

    // Only update Redux state (UI) locally
    const updateQuantity = (productId, delta) => {
        const item = cartItems.find(item => item.productId === productId || item.id === productId);
        if (!item) return;
        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return;
        dispatch(cartActions.updateQuantity({
            id: productId,
            quantity: newQuantity
        }));
    };

    const removeItem = async (productId) => {
        const item = cartItems.find(item => item.productId === productId || item.id === productId);
        const productName = item?.productName || item?.name || 'this item';
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: `Are you sure you want to delete '${productName}'?`,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });
        if (!result.isConfirmed) return;
        try {
            await removeCartItem(productId);
            // Refetch cart to get updated data and images
            const data = await getCart();
            const itemsWithImages = await Promise.all(
                (data.items || []).map(async (cartItem) => {
                    try {
                        const product = await getProductById(cartItem.productId);
                        const prodData = product.data || {};
                        return {
                            ...cartItem,
                            imageURL: prodData.imageURL,
                            name: prodData.productName || cartItem.productName,
                        };
                    } catch (e) {
                        return cartItem;
                    }
                })
            );
            dispatch(cartActions.setCart({ ...data, items: itemsWithImages }));
            Swal.fire({
                icon: 'success',
                title: 'Removed',
                text: 'Item removed from cart.',
                timer: 1200,
                showConfirmButton: false
            });
        } catch (err) {
            console.error('Failed to remove cart item', err);
            Swal.fire({
                icon: 'error',
                title: 'Remove failed',
                text: err?.message || 'Failed to remove item from cart',
            });
        }
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <main className={styles.cartContainer}>
            <div className={styles.maxWidthContainer}>
                {/* Breadcrumb */}
                <header className={styles.breadcrumbContainer}>
                    <nav className={styles.breadcrumbNav}>
                        <Link to="/" className={styles.breadcrumbLink}>
                            {t('nav.home')}
                        </Link>
                        <span className={styles.breadcrumbSeparator}>/</span>
                        <span className={styles.breadcrumbCurrent}>{t('cart.title')}</span>
                    </nav>
                </header>

                {/* Cart Items Section */}
                <section className={styles.cartSections}>
                    {/* Desktop Table Header */}
                    <div className={styles.tableHeader}>
                        <div className={styles.tableHeaderGrid}>
                            <div className={styles.tableHeaderCell}>Product</div>
                            <div className={styles.tableHeaderCell}>{t('cart.price')}</div>
                            <div className={styles.tableHeaderCell}>{t('cart.quantity')}</div>
                            <div className={styles.tableHeaderCell}>{t('cart.subtotal')}</div>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <ul className={styles.cartItemsContainer}>
                        {cartItems.length === 0 ? (
                            <li className={styles.emptyCart}>
                                <p className={`${styles.textLg} ${styles.opacity60}`}>{t('cart.emptyCart')}</p>
                            </li>
                        ) : (
                            cartItems.map((item, idx) => (
                                <li
                                    key={item.id ?? `${item.name}-${idx}`}
                                    className={styles.cartItem}
                                >
                                    <article className={styles.cartItemGrid}>
                                        {/* Product Column */}
                                        <section className={styles.productColumn}>
                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.productId ?? item.id)}
                                                className={styles.removeButton}
                                                aria-label="Remove item"
                                            >
                                                <i className={`fas fa-times ${styles.iconSmall}`} style={{color: 'white'}}></i>
                                            </button>

                                            {/* Product Image */}
                                            <figure className={styles.productImage}>
                                                <img
                                                    src={item.imageURL}
                                                    alt={item.productName || item.name}
                                                    className={styles.productImageImg}
                                                />
                                            </figure>

                                            {/* Product Name */}
                                            <header className={styles.productName}>
                                                <h3 className={styles.productNameH3}>
                                                    {item.productName || item.name}
                                                </h3>
                                            </header>
                                        </section>

                                        {/* Price Column */}
                                        <div className={styles.infoColumn}>
                                            <span className={styles.infoLabel}>Price:</span>
                                            <span className={styles.infoValue}>${item.price}</span>
                                        </div>

                                        {/* Quantity Column */}
                                        <div className={styles.infoColumn}>
                                            <span className={styles.infoLabel}>Quantity:</span>
                                            <div className={styles.quantityControls}>
                                                <button
                                                    onClick={() => updateQuantity(item.productId ?? item.id, -1)}
                                                    className={styles.quantityButton}
                                                    disabled={item.quantity <= 1}
                                                    aria-label="Decrease quantity"
                                                >
                                                    <i className={`fas fa-minus ${styles.iconSmall}`}></i>
                                                </button>
                                                <span className={styles.quantityDisplay}>
                                                {String(item.quantity).padStart(2, "0")}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId ?? item.id, 1)}
                                                    className={styles.quantityButton}
                                                    aria-label="Increase quantity"
                                                >
                                                    <i className={`fas fa-plus ${styles.iconSmall}`}></i>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subtotal Column */}
                                        <div className={styles.infoColumn}>
                                            <span className={styles.infoLabel}>Subtotal:</span>
                                            <span className={styles.infoValue}>${item.price * item.quantity}</span>
                                        </div>
                                    </article>
                                </li>
                            ))
                        )}
                    </ul>

                    {/* Action Buttons */}
                    {cartItems.length > 0 && (
                        <nav className={styles.actionButtons}>
                            <Link
                                to="/"
                                className={`${styles.button} ${styles.buttonOutline} ${styles.outlineButton}`}
                            >
                                Return To Shop
                            </Link>
                            <button
                                className={`${styles.button} ${styles.buttonOutline} ${styles.outlineButton}`}
                                type="button"
                                onClick={async () => {
                                    try {
                                        // Persist all cart item quantities to backend
                                        await Promise.all(
                                            cartItems.map(item =>
                                                updateCartItemQuantity(item.productId ?? item.id, item.quantity)
                                            )
                                        );
                                        // Refetch cart to get updated data and images
                                        const data = await getCart();
                                        const itemsWithImages = await Promise.all(
                                            (data.items || []).map(async (cartItem) => {
                                                try {
                                                    const product = await getProductById(cartItem.productId);
                                                    return {
                                                        ...cartItem,
                                                        imageURL: product.imageURL,
                                                        name: product.productName || cartItem.productName,
                                                    };
                                                } catch (e) {
                                                    return cartItem;
                                                }
                                            })
                                        );
                                        dispatch(cartActions.setCart({ ...data, items: itemsWithImages }));
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Cart updated',
                                            text: 'Your cart has been updated successfully!',
                                            timer: 1500,
                                            showConfirmButton: false
                                        });
                                    } catch (err) {
                                        console.error('Failed to update cart', err);
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Update failed',
                                            text: err?.message || 'Failed to update cart',
                                        });
                                    }
                                }}
                            >
                                Update Cart
                            </button>
                        </nav>
                    )}

                    {/* Coupon and Cart Total Section */}
                    {cartItems.length > 0 && (
                        <footer className={styles.couponTotalSection}>
                            {/* Coupon Code Section */}
                            <form className={styles.couponSection}>
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => dispatch(cartActions.setCouponCode(e.target.value))}
                                    placeholder="Coupon Code"
                                    className={`${styles.input} ${styles.couponInput}`}
                                />
                                <button
                                    className={`${styles.button} ${styles.buttonDefault} ${styles.primaryButton}`}
                                    type="button"
                                >
                                    Apply Coupon
                                </button>
                            </form>

                            {/* Cart Total Section */}
                            <aside className={styles.cartTotalBox}>
                                <h2 className={styles.cartTotalTitle}>Cart Total</h2>
                                <div className={styles.cartTotalItems}>
                                    <div className={styles.cartTotalItem}>
                                        <span>{t('cart.subtotal')}:</span>
                                        <span>${subtotal}</span>
                                    </div>
                                    <div className={styles.cartTotalItem}>
                                        <span>Shipping:</span>
                                        <span className={styles.freeShipping}>Free</span>
                                    </div>
                                    <div className={styles.cartTotalItem}>
                                        <span>{t('cart.total')}:</span>
                                        <span>${total}</span>
                                    </div>
                                    <Link
                                        to="/checkout"
                                        className={`${styles.button} ${styles.buttonDefault} ${styles.checkoutButtonFull} ${styles.checkoutButton}`}
                                    >
                                        {t('cart.checkout')}
                                    </Link>
                                </div>
                            </aside>
                        </footer>
                    )}
                </section>
            </div>
        </main>
    );
}

export default Cart;