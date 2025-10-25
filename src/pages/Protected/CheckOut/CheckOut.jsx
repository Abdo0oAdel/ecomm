import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CheckOut.module.css";

// Breadcrumb navigation data
const breadcrumbItems = [
    { label: "Account", path: "/account" },
    { label: "My Account", path: "/account" },
    { label: "Product", path: "/" },
    { label: "View Cart", path: "/cart" },
    { label: "CheckOut", path: "/checkout", current: true }
];

// Form fields data
const formFields = [
    { id: "firstName", label: "First Name*", required: true, type: "text" },
    { id: "companyName", label: "Company Name", required: false, type: "text" },
    { id: "streetAddress", label: "Street Address*", required: true, type: "text" },
    { id: "apartment", label: "Apartment, floor, etc. (optional)", required: false, type: "text" },
    { id: "city", label: "Town/City*", required: true, type: "text" },
    { id: "phone", label: "Phone Number*", required: true, type: "tel" },
    { id: "email", label: "Email Address*", required: true, type: "email" }
];

// Order items data
const orderItems = [
    {
        id: "1",
        name: "LCD Monitor",
        price: 650,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1758410473607-e78a23fd6e57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb25pdG9yJTIwc2NyZWVufGVufDF8fHx8MTc2MDczOTIxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: "2",
        name: "H1 Gamepad",
        price: 550,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwZ2FtZXBhZHxlbnwxfHx8fDE3NjA3OTg0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
];

// Payment methods data
const paymentMethods = [
    {
        id: "bank",
        label: "Bank",
        icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/M4hj00NDrJ/vka5p9b1_expires_30_days.png",
        logos: [
            "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/M4hj00NDrJ/6qoo0wro_expires_30_days.png",
            "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/M4hj00NDrJ/nxixvogh_expires_30_days.png",
            "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/M4hj00NDrJ/lrh7x2qp_expires_30_days.png",
            "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/M4hj00NDrJ/wahj9e5s_expires_30_days.png"
        ]
    },
    {
        id: "cash",
        label: "Cash on delivery",
        icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/M4hj00NDrJ/t0m4y8kd_expires_30_days.png"
    }
];

const CheckOut = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        companyName: "",
        streetAddress: "",
        apartment: "",
        city: "",
        phone: "",
        email: ""
    });
    const [saveInfo, setSaveInfo] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [selectedPayment, setSelectedPayment] = useState("bank");

    // Calculate totals
    const subtotal = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 0;
    const total = subtotal + shipping;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Order placed:", { formData, orderItems, selectedPayment });
        alert("Order placed successfully!");
    };

    return (
        <main className={styles.checkoutContainer}>
            <div className={styles.maxWidthContainer}>
                {/* Breadcrumb */}
                <header className={styles.breadcrumbContainer}>
                    <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
                        {breadcrumbItems.map((item, index) => (
                            <span key={item.label} className={styles.breadcrumbItem}>
                                {item.current ? (
                                    <span className={styles.breadcrumbCurrent}>{item.label}</span>
                                ) : (
                                    <Link to={item.path} className={styles.breadcrumbLink}>
                                        {item.label}
                                    </Link>
                                )}
                                {index < breadcrumbItems.length - 1 && (
                                    <span className={styles.breadcrumbSeparator}>/</span>
                                )}
                            </span>
                        ))}
                    </nav>
                </header>

                {/* Page Title */}
                <section className={styles.titleSection}>
                    <h1 className={styles.pageTitle}>Billing Details</h1>
                </section>

                {/* Main Checkout Content */}
                <section className={styles.checkoutContent}>
                    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
                        {/* Billing Form */}
                        <article className={styles.billingSection}>
                            <div className={styles.formFields}>
                                {formFields.map((field) => (
                                    <div key={field.id} className={styles.formGroup}>
                                        <label htmlFor={field.id} className={styles.formLabel}>
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            id={field.id}
                                            name={field.id}
                                            value={formData[field.id]}
                                            onChange={handleInputChange}
                                            required={field.required}
                                            className={styles.formInput}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Save Info Checkbox */}
                            <div className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id="saveInfo"
                                    checked={saveInfo}
                                    onChange={(e) => setSaveInfo(e.target.checked)}
                                    className={styles.checkbox}
                                />
                                <label htmlFor="saveInfo" className={styles.checkboxLabel}>
                                    Save this information for faster check-out next time
                                </label>
                            </div>
                        </article>

                        {/* Order Summary */}
                        <aside className={styles.orderSummary}>
                            {/* Order Items */}
                            <div className={styles.orderItems}>
                                {orderItems.map((item) => (
                                    <article key={item.id} className={styles.orderItem}>
                                        <figure className={styles.itemImage}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className={styles.itemImageImg}
                                            />
                                        </figure>
                                        <div className={styles.itemDetails}>
                                            <h3 className={styles.itemName}>{item.name}</h3>
                                            <span className={styles.itemPrice}>
                                                ${item.price * item.quantity}
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className={styles.totalsSection}>
                                <div className={styles.totalRow}>
                                    <span>Subtotal:</span>
                                    <span>${subtotal}</span>
                                </div>
                                <div className={styles.totalRow}>
                                    <span>Shipping:</span>
                                    <span className={styles.freeShipping}>Free</span>
                                </div>
                                <div className={styles.totalRow}>
                                    <span>Total:</span>
                                    <span className={styles.totalAmount}>${total}</span>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <fieldset className={styles.paymentMethods}>
                                <legend className={styles.visuallyHidden}>Payment Method</legend>
                                {paymentMethods.map((method) => (
                                    <div key={method.id} className={styles.paymentOption}>
                                        <label htmlFor={method.id} className={styles.paymentRadio}>
                                            <input
                                                type="radio"
                                                id={method.id}
                                                name="payment"
                                                value={method.id}
                                                checked={selectedPayment === method.id}
                                                onChange={(e) => setSelectedPayment(e.target.value)}
                                                className={styles.radioInput}
                                            />
                                            <img
                                                src={method.icon}
                                                alt=""
                                                className={styles.paymentIcon}
                                            />
                                            <span className={styles.paymentLabel}>{method.label}</span>
                                        </label>
                                        {method.logos && selectedPayment === method.id && (
                                            <div className={styles.bankLogos}>
                                                {method.logos.map((logo, index) => (
                                                    <img
                                                        key={index}
                                                        src={logo}
                                                        alt={`Payment option ${index + 1}`}
                                                        className={styles.bankLogo}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </fieldset>

                            {/* Coupon Code */}
                            <div className={styles.couponSection}>
                                <input
                                    type="text"
                                    placeholder="Coupon Code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className={styles.couponInput}
                                />
                                <button
                                    type="button"
                                    className={styles.couponButton}
                                    onClick={() => console.log("Apply coupon:", couponCode)}
                                >
                                    Apply Coupon
                                </button>
                            </div>

                            {/* Place Order Button */}
                            <button type="submit" className={styles.placeOrderButton}>
                                Place Order
                            </button>
                        </aside>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default CheckOut;