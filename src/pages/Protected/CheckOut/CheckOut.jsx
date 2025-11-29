import React,{ useEffect } from "react";
import { getCart } from "../../../services/cart";
import { getProductById } from "../../../services/products";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CheckOut.module.css";
import { checkoutActions } from "../../../store/CheckOut/slice";
import { cartActions } from "../../../store/Cart/slice";
import { placeOrder, createPayPalPayment } from "../../../services/checkout";
import { clearCartAPI } from "../../../services/cart";
import Swal from "sweetalert2";

import { addressAPI } from "../../../utils/api.js";

// Breadcrumb navigation data
const breadcrumbItems = [
  { label: "Account", path: "/account" },
  { label: "My Account", path: "/account" },
  { label: "Product", path: "/" },
  { label: "View Cart", path: "/cart" },
  { label: "CheckOut", path: "/checkout", current: true },
];

// Form fields data
const formFields = [
  { id: "firstName", label: "First Name*", required: true, type: "text" },
  { id: "companyName", label: "Company Name", required: false, type: "text" },
  {
    id: "streetAddress",
    label: "Street Address*",
    required: true,
    type: "text",
  },
  {
    id: "apartment",
    label: "Apartment, floor, etc. (optional)",
    required: false,
    type: "text",
  },
  { id: "city", label: "Town/City*", required: true, type: "text" },
  { id: "phone", label: "Phone Number*", required: true, type: "tel" },
  { id: "email", label: "Email Address*", required: true, type: "email" },
];

// Payment methods data
const paymentMethods = [
  {
    id: "paypal",
    label: "PayPal",
    icon: "https://www.paypalobjects.com/webstatic/icon/pp258.png",
  },
  {
    id: "cash",
    label: "Cash on delivery",
    icon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png", // Example cash icon
  },
];

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(checkoutActions.setSelectedPayment('cash'));
  }, [dispatch]);

  useEffect(() => {
    async function hydrateCartWithProductDetails() {
      let itemsToHydrate = cartItems;
      if (!cartItems || cartItems.length === 0) {
        try {
          const data = await getCart();
          itemsToHydrate = data.items;
        } catch (err) {
          itemsToHydrate = [];
        }
      }
      const mappedItems = await Promise.all(
        (itemsToHydrate || []).map(async (item) => {
          let productDetails = {};
          try {
            const response = await getProductById(item.productId);
            productDetails = response.data || {};
          } catch {}
          return {
            id: item.productId,
            name: productDetails.productName || item.productName || '',
            imageURL: productDetails.imageURL || '',
            price: item.price,
            quantity: item.quantity,
            ...item,
            categoryID: productDetails.categoryID,
            categoryName: productDetails.categoryName,
            sellerName: productDetails.sellerName,
            description: productDetails.description,
            stock: productDetails.stock,
            isInStock: productDetails.isInStock,
          };
        })
      );
      dispatch(cartActions.setCart(mappedItems));
    }
    hydrateCartWithProductDetails();
  }, [dispatch]);
  const user = useSelector((state) => state.auth.user);
  const { formData, saveInfo, couponCode, selectedPayment } = useSelector(
    (state) => state.checkout
  );

 // fill default values for user data 
 useEffect(() => {
        const loadAddress = async () => {
            try {
                const res = await addressAPI.getAddress(user.userId);
                if (res && res.data && res.data.length > 0) {
                    const firstAddress = res.data[0]; // أول عنوان
                    const fullAddress = firstAddress.fullAddress;
                    const city = firstAddress.city;

                dispatch(
                    checkoutActions.updateField({
                        field: "firstName",
                        value: user.firstName,
                    })
                );
                dispatch(
                    checkoutActions.updateField({
                        field: "email",
                        value: user.email,
                    })
                );
                dispatch(
                    checkoutActions.updateField({
                        field: "streetAddress",
                        value: fullAddress,
                    })
                 );
                dispatch(
                    checkoutActions.updateField({
                        field: "city",
                        value: city,
                    })
                );
                }
            } catch (err) {
                console.error("Error loading address:", err);
            }
        };
        loadAddress();
    }, [user]);  
  

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(checkoutActions.updateField({ field: name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      billingDetails: formData,
      items: cartItems,
      paymentMethod: selectedPayment,
      couponCode,
      subtotal,
      shipping,
      total,
      user,
    };
    try {
      if (selectedPayment === "paypal") {
        const orderResponse = await placeOrder(orderData);
        const orderId = orderResponse?.order?.orderID;
        if (!orderId) throw new Error("Order ID not found for PayPal payment");
        const payment = await createPayPalPayment(orderId);
        const payPalLink = payment?.payment?.paymentDetails?.payPalLink;
        if (payPalLink) {
          window.open(payPalLink, "_blank");
        } else {
          throw new Error("PayPal link not found");
        }
        return;
      }
      // Normal order placement for other methods
      await placeOrder(orderData);
      await clearCartAPI();
      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your order has been placed successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      dispatch(cartActions.clearCart());
      dispatch(checkoutActions.clearCheckoutData());
      navigate("/");
    } catch (error) {
      console.error("Failed to place order:", error);
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: error.message || "There was an issue placing your order.",
      });
    }
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
                  onChange={(e) =>
                    dispatch(checkoutActions.setSaveInfo(e.target.checked))
                  }
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
                {cartItems.map((item) => (
                  <article key={item.id} className={styles.orderItem}>
                    <figure className={styles.itemImage}>
                      <img
                        src={item.imageURL}
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
                <legend className={styles.visuallyHidden}>
                  Payment Method
                </legend>
                {paymentMethods.map((method) => (
                  <div key={method.id} className={styles.paymentOption}>
                    <label htmlFor={method.id} className={styles.paymentRadio}>
                      <input
                        type="radio"
                        id={method.id}
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) =>
                          dispatch(
                            checkoutActions.setSelectedPayment(e.target.value)
                          )
                        }
                        className={styles.radioInput}
                      />
                      <img
                        src={method.icon}
                        alt=""
                        className={styles.paymentIcon}
                      />
                      <span className={styles.paymentLabel}>
                        {method.label}
                      </span>
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
                  onChange={(e) =>
                    dispatch(checkoutActions.setCouponCode(e.target.value))
                  }
                  className={styles.couponInput}
                />
                <button
                  type="button"
                  className={styles.couponButton}
                  onClick={() => {
                    /* apply coupon handler placeholder */
                  }}
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
