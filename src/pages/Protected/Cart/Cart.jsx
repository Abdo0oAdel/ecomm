import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { cartActions } from "../../../store/Cart/slice.js";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getCart } from "../../../services/cart";

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
                // Assuming data.items is the array of cart items from API
                dispatch(cartActions.setCart(data));
            } catch (err) {
                // Optionally handle error
                console.error('Failed to fetch cart', err);
            }
        }
        fetchCart();
    }, [dispatch]);

    // Cart data is now loaded from backend on login - no need for demo data

    const updateQuantity = (id, delta) => {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            dispatch(cartActions.updateQuantity({
                id,
                quantity: item.quantity + delta
            }));
        }
    };

    const removeItem = (id) => {
        dispatch(cartActions.removeFromCart(id));
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
                            cartItems.map((item) => (
                                <li
                                    key={item.id}
                                    className={styles.cartItem}
                                >
                                    <article className={styles.cartItemGrid}>
                                        {/* Product Column */}
                                        <section className={styles.productColumn}>
                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className={styles.removeButton}
                                                aria-label="Remove item"
                                            >
                                                <i className={`fas fa-times ${styles.iconSmall}`} style={{color: 'white'}}></i>
                                            </button>

                                            {/* Product Image */}
                                            <figure className={styles.productImage}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className={styles.productImageImg}
                                                />
                                            </figure>

                                            {/* Product Name */}
                                            <header className={styles.productName}>
                                                <h3 className={styles.productNameH3}>
                                                    {item.name}
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
                                                    onClick={() => updateQuantity(item.id, -1)}
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
                                                    onClick={() => updateQuantity(item.id, 1)}
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