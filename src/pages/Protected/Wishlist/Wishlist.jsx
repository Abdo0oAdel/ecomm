import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useWishlist } from "../../../hooks/useWishlist";
import useProducts from "../../../hooks/useProducts";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { wishlistActions } from "../../../store/Wishlist/slice.js";
import { cartActions } from "../../../store/Cart/slice.js";
import {
  addToCart as addToCartAPI,
  getCart as getCartAPI,
} from "../../../services/cart";
import styles from "./Wishlist.module.css";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { FiTrash2 } from "react-icons/fi";

// Just For You data
export const justForYouData = [
  {
    id: 5,
    name: "ASUS FHD Gaming Laptop",
    currentPrice: 960,
    originalPrice: 1160,
    discount: 35,
    rating: 5,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1640955014216-75201056c829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3B8ZW58MXx8fHwxNzYwODc5MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    name: "IPS LCD Gaming Monitor",
    currentPrice: 1160,
    rating: 5,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb25pdG9yfGVufDF8fHx8MTc2MDg1NTExNXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 7,
    name: "HAVIT HV-G92 Gamepad",
    currentPrice: 560,
    rating: 5,
    reviews: 65,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBnYW1lcGFkJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NjA4ODkzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 8,
    name: "AK-900 Wired Keyboard",
    currentPrice: 200,
    rating: 5,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1602025882379-e01cf08baa51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmR8ZW58MXx8fHwxNzYwODU1MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const Wishlist = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    items: wishlistItems,
    fetchWishlist,
    removeFromWishlist,
  } = useWishlist();
  const { products } = useProducts();

  // Merge wishlist items with product details from Redux
  const wishlistWithDetails = React.useMemo(() => {
    return (wishlistItems || []).map((item) => {
      const prod = products.find(
        (p) => p.id === item.productId || p.id === item.id
      );
      return {
        ...item,
        id: item.productId || item.id,
        name: item.productName || item.name,
        image: prod?.image || item.image || "",
        currentPrice:
          prod?.currentPrice ?? prod?.price ?? item.currentPrice ?? item.price,
        originalPrice: prod?.originalPrice ?? item.originalPrice,
        discount: prod?.discount ?? item.discount,
        isInStock: prod?.isInStock,
        stock: prod?.stock,
        rating: prod?.rating,
        reviews: prod?.reviews,
        category: prod?.category,
      };
    });
  }, [wishlistItems, products]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleMoveAllToBag = () => {
    wishlistItems.forEach((item) => {
      dispatch(
        cartActions.addToCart({
          ...item,
          price: item.currentPrice,
          quantity: 1,
        })
      );
    });
    dispatch(wishlistActions.clearWishlist());
  };

  const handleRemoveFromWishlist = async (id) => {
    const item = wishlistItems.find((item) => item.id === id);
    const productName = item?.name || "this item";
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: `Are you sure you want to delete ${productName} from your wishlist?`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
    try {
      await removeFromWishlist(id);
      Swal.fire({
        icon: "success",
        title: "Removed",
        text: "Item removed from wishlist.",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Remove failed",
        text: err?.message || "Failed to remove item from wishlist",
      });
    }
  };

  const handleAddToCart = async (id) => {
    const item = wishlistItems.find(
      (item) => item.id === id || item.productId === id
    );
    if (!item) return;
    try {
      await addToCartAPI(id, 1);
      const cartData = await getCartAPI();
      dispatch(cartActions.setCart(cartData));
      await removeFromWishlist(id);
      fetchWishlist();
    } catch (err) {
      // ignore error here; UI handles via toast in other flows
    }
  };

  const handleQuickView = (id) => {
    // quick view handler placeholder
  };

  return (
    <div className={styles.wishlist}>
      {/* Wishlist Section */}
      <section className={styles.wishlistSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {t("wishlist.title")} ({wishlistWithDetails.length})
          </h2>
          <button className={styles.moveAllButton} onClick={handleMoveAllToBag}>
            {t("wishlist.addToCart")}
          </button>
        </div>

        <div className={styles.productsGrid}>
          {wishlistWithDetails.map((product) => (
            <div key={product.id} style={{ position: "relative" }}>
              <ProductCard
                product={product}
                onAddToCart={
                  product.isInStock !== false && product.stock !== 0
                    ? () => handleAddToCart(product.id)
                    : undefined
                }
                isWishlisted={true}
                onToggleWishlist={() => {}}
              />
              <button
                className={`${styles.deleteButton} ${styles.deleteButtonCustom}`}
                onClick={() => handleRemoveFromWishlist(product.id)}
                aria-label="Remove from wishlist"
              >
                <span className={styles.deleteIconCircle}>
                  <FiTrash2 className={styles.deleteIcon} />
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Just For You Section */}
      <section className={styles.justForYouSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleWithBar}>
            <div className={styles.redBar}></div>
            <h2 className={styles.sectionTitle}>Just For You</h2>
          </div>
          <button className={styles.seeAllButton}>See All</button>
        </div>

        <div className={styles.productsGrid}>
          {justForYouData.map((product) => (
            <article key={product.id} className={styles.productCard}>
              <div className={styles.productImageContainer}>
                {product.discount && (
                  <span className={styles.discountBadge}>
                    -{product.discount}%
                  </span>
                )}
                {product.isNew && <span className={styles.newBadge}>NEW</span>}
                <button
                  className={styles.quickViewButton}
                  onClick={() => handleQuickView(product.id)}
                  aria-label="Quick view"
                >
                  <i className="bi bi-eye"></i>
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />

                <button
                  className={styles.addToCartButton}
                  onClick={() => handleAddToCart(product.id)}
                  disabled={!product.isInStock || product.stock === 0}
                  title={
                    !product.isInStock || product.stock === 0
                      ? "Out of Stock"
                      : ""
                  }
                >
                  <i className="bi bi-cart"></i>
                  <span>
                    {!product.isInStock || product.stock === 0
                      ? "Out of Stock"
                      : "Add To Cart"}
                  </span>
                </button>
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.currentPrice}>
                    ${product.currentPrice}
                  </span>
                  {product.originalPrice && (
                    <span className={styles.originalPrice}>
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.rating && (
                  <div className={styles.ratingContainer}>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill"></i>
                      ))}
                    </div>
                    <span className={styles.reviewCount}>
                      ({product.reviews})
                    </span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
