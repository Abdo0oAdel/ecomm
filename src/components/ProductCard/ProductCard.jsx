import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import { FiHeart, FiEye, FiShoppingCart } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";

const ProductCard = ({
  product = {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    image: "/api/placeholder/200/200",
    originalPrice: 160,
    currentPrice: 120,
    discount: 20,
    rating: 5,
    reviews: 88,
    isNew: true,
    category: "Gaming",
  },
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <AiFillStar
        key={index}
        className={`${styles.star} ${
          index < rating ? styles.starFilled : styles.starEmpty
        }`}
      />
    ));
  };

  return (
    <div
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.productImageContainer}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
        />

        {/* Discount/New Badge */}
        {product.isNew && (
          <div className={`${styles.badge} ${styles.newBadge}`}>NEW</div>
        )}
        {product.discount && !product.isNew && (
          <div className={`${styles.badge} ${styles.discountBadge}`}>
            -{product.discount}%
          </div>
        )}

        {/* Action Buttons */}
        <div
          className={`${styles.actionButtons} ${
            isHovered ? styles.visible : ""
          }`}
        >
          <button className={styles.actionButton}>
            <FiHeart />
          </button>
          <button className={styles.actionButton}>
            <FiEye />
          </button>
        </div>
      </div>

      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>

        <div className={styles.priceContainer}>
          <span className={styles.currentPrice}>${product.currentPrice}</span>
          {product.originalPrice > product.currentPrice && (
            <span className={styles.originalPrice}>
              ${product.originalPrice}
            </span>
          )}
        </div>

        <div className={styles.ratingContainer}>
          <div className={styles.stars}>{renderStars(product.rating)}</div>
          <span className={styles.reviews}>({product.reviews})</span>
        </div>

        {/* optional color dots for variants */}
        {product.colors?.length ? (
          <div className={styles.colorDots}>
            {product.colors.map((c, i) => (
              <span
                key={i}
                className={`${styles.colorDot} ${styles[c] || ""}`}
              ></span>
            ))}
          </div>
        ) : null}

        <button
          className={`${styles.addToCartBtn} ${
            isHovered ? styles.visible : ""
          }`}
        >
          <FiShoppingCart className={styles.cartIcon} />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
