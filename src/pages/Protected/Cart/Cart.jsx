import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../../store/Cart/slice.js";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";

const initialData = [{
    id: "1",
    name: "LCD Monitor",
    price: 650,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1758410473607-e78a23fd6e57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb25pdG9yJTIwc2NyZWVufGVufDF8fHx8MTc2MDczOTIxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
},
    {
        id: "2",
        name: "H1 Gamepad",
        price: 550,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwZ2FtZXBhZHxlbnwxfHx8fDE3NjA3OTg0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
];

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const couponCode = useSelector((state) => state.cart.couponCode);

    // Initialize cart with demo data if empty (for demo purposes)
    useEffect(() => {
        if (cartItems.length === 0) {
            initialData.forEach(item => {
                dispatch(cartActions.addToCart(item));
            });
        }
    }, []);

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
                            Home
                        </Link>
                        <span className={styles.breadcrumbSeparator}>/</span>
                        <span className={styles.breadcrumbCurrent}>Cart</span>
                    </nav>
                </header>

                {/* Cart Items Section */}
                <section className={styles.cartSections}>
                    {/* Desktop Table Header */}
                    <div className={styles.tableHeader}>
                        <div className={styles.tableHeaderGrid}>
                            <div className={styles.tableHeaderCell}>Product</div>
                            <div className={styles.tableHeaderCell}>Price</div>
                            <div className={styles.tableHeaderCell}>Quantity</div>
                            <div className={styles.tableHeaderCell}>Subtotal</div>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <ul className={styles.cartItemsContainer}>
                        {cartItems.length === 0 ? (
                            <li className={styles.emptyCart}>
                                <p className={`${styles.textLg} ${styles.opacity60}`}>Your cart is empty</p>
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
                            <button
                                className={`${styles.button} ${styles.buttonOutline} ${styles.outlineButton}`}
                                type="button"
                            >
                                Return To Shop
                            </button>
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
                                        <span>Subtotal:</span>
                                        <span>${subtotal}</span>
                                    </div>
                                    <div className={styles.cartTotalItem}>
                                        <span>Shipping:</span>
                                        <span className={styles.freeShipping}>Free</span>
                                    </div>
                                    <div className={styles.cartTotalItem}>
                                        <span>Total:</span>
                                        <span>${total}</span>
                                    </div>
                                    <button
                                        className={`${styles.button} ${styles.buttonDefault} ${styles.checkoutButtonFull} ${styles.checkoutButton}`}
                                        type="button"
                                    >
                                        Proceed to checkout
                                    </button>
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