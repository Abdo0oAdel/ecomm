import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useWishlist } from "../../../hooks/useWishlist";
import useProducts from "../../../hooks/useProducts";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { cartActions } from "../../../store/Cart/slice.js";
import { useNavigate } from "react-router-dom";
import { addToCart as addToCartAPI, getCart } from "../../../services/cart";
import { getProductById } from "../../../services/products";
import styles from "./Wishlist.module.css";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { FiTrash2 } from "react-icons/fi";
const Wishlist = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    items: wishlistItems,
    fetchWishlist,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();
  const { products } = useProducts();

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

  const justForYouProducts = React.useMemo(() => {
    if (!products || products.length === 0) return [];
    if (!wishlistWithDetails || wishlistWithDetails.length === 0) {
      return products.slice(0, 4);
    }
    const wishlistCategories = Array.from(
      new Set(wishlistWithDetails.map((item) => item.category).filter(Boolean))
    );
    const filtered = products.filter(
      (p) =>
        wishlistCategories.includes(p.category) &&
        !wishlistWithDetails.some((w) => w.id === p.id)
    );
    if (filtered.length < 4) {
      const others = products.filter(
        (p) => !wishlistWithDetails.some((w) => w.id === p.id)
      );
      return [...filtered, ...others.slice(0, 4 - filtered.length)].slice(0, 4);
    }
    return filtered.slice(0, 4);
  }, [products, wishlistWithDetails]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleMoveAllToBag = async () => {
    if (wishlistItems.length === 0) return;

    try {
      // Add all items to cart via API
      await Promise.all(
        wishlistItems.map((item) => addToCartAPI(item.id || item.productId, 1))
      );

      // Fetch updated cart and populate with product images and stock
      const cartData = await getCart();
      const itemsWithImages = await Promise.all(
        (cartData.items || []).map(async (cartItem) => {
          try {
            const product = await getProductById(cartItem.productId);
            const prodData = product.data?.data || product.data || {};
            return {
              ...cartItem,
              imageURL: prodData.imageURL,
              name: prodData.productName || cartItem.productName,
              stock: prodData.stock,
              isInStock: prodData.isInStock,
            };
          } catch (e) {
            return cartItem;
          }
        })
      );

      // Update cart in Redux
      dispatch(cartActions.setCart({ ...cartData, items: itemsWithImages }));

      // Clear wishlist using hook (syncs with backend)
      await clearWishlist();

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Moved to Cart",
        text: "All items have been moved to your cart.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Move Items",
        text: err?.message || "Failed to move items to cart. Please try again.",
      });
    }
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
      // Add to cart via API
      await addToCartAPI(id, 1);

      // Fetch updated cart and populate with product images and stock
      const cartData = await getCart();
      const itemsWithImages = await Promise.all(
        (cartData.items || []).map(async (cartItem) => {
          try {
            const product = await getProductById(cartItem.productId);
            const prodData = product.data?.data || product.data || {};
            return {
              ...cartItem,
              imageURL: prodData.imageURL,
              name: prodData.productName || cartItem.productName,
              stock: prodData.stock,
              isInStock: prodData.isInStock,
            };
          } catch (e) {
            return cartItem;
          }
        })
      );

      // Update cart in Redux
      dispatch(cartActions.setCart({ ...cartData, items: itemsWithImages }));

      // Remove from wishlist only after successful cart add
      await removeFromWishlist(id);

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: `${item.name || "Item"} has been moved to your cart.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add to Cart",
        text: err?.message || "Failed to add item to cart. Please try again.",
      });
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
          <button className={styles.seeAllButton} onClick={() => navigate('/products')}>See All</button>
        </div>

        <div className={styles.productsGrid}>
          {justForYouProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={
                product.isInStock !== false && product.stock !== 0
                  ? () => handleAddToCart(product.id)
                  : undefined
              }
              isWishlisted={wishlistWithDetails.some(w => w.id === product.id)}
              onToggleWishlist={() => {}}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;