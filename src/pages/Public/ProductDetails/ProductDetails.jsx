import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/Cart/slice";
import { addToCart, getCart } from "../../../services/cart";
import { useParams, useLocation, Link } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { AiFillStar } from "react-icons/ai";
import { FiChevronLeft, FiShoppingCart, FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import useProduct from "../../../hooks/useProduct";
import useProducts from "../../../hooks/useProducts";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useWishlist } from '../../../hooks/useWishlist';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const [adding, setAdding] = useState(false);
    const { id } = useParams();
    const location = useLocation();
    // Try to get product from navigation state, otherwise fetch from API
    const { product: apiProduct, loading, error } = useProduct(id);
    // Always call all hooks before any return!
    const { products: allProducts } = useProducts();
    const { items: wishlist, toggleWishlist } = useWishlist();
    const product = location.state?.product || apiProduct;

    const [mainIndex, setMainIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [qty, setQty] = useState(1);

    const handleAddToCart = async () => {
        if (!product.isInStock || product.stock === 0) return;
        setAdding(true);
        try {
            await addToCart(product.id, qty);
            const data = await getCart();
            dispatch(cartActions.setCart(data));
        } catch (err) {
            // Optionally show error
            console.error(err);
        } finally {
            setAdding(false);
        }
    };

    // Set default color/size when product loads
    React.useEffect(() => {
        if (product?.colors?.length) setSelectedColor(product.colors[0]);
        if (product?.sizes?.length) setSelectedSize(product.sizes.includes("M") ? "M" : product.sizes[0]);
    }, [product]);

    const renderStars = (rating) =>
        Array.from({ length: 5 }).map((_, i) => (
            <AiFillStar
                key={i}
                className={i < rating ? styles.starFilled : styles.starEmpty}
            />
        ));

    if (loading) {
        return <div className={styles.container}><div>Loading product...</div></div>;
    }
    if (error || !product) {
        return (
            <div className={styles.container}>
                <div className={styles.headerRow}>
                    <Link to="/" className={styles.backButton}>
                        <FiChevronLeft /> العودة
                    </Link>
                </div>
                <div className={styles.notFound}>
                    <p>لم يتم العثور على المنتج بالمعرّف {id}.</p>
                </div>
            </div>
        );
    }

    const imgs = product.images && product.images.length ? product.images : [product.image];

    // Fetch all products for related items (already called at top)
    const related = allProducts
        .filter((p) => p.id !== product.id && p.category === product.category)
        .slice(0, 4);

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <Link to="/" className={styles.backButton}>
                    <FiChevronLeft /> العودة
                </Link>
            </div>

            <div className={styles.grid}>
                <div className={styles.thumbs}>
                    {imgs.map((src, i) => (
                        <button
                            key={i}
                            className={`${styles.thumbBtn} ${i === mainIndex ? styles.activeThumb : ""}`}
                            onClick={() => setMainIndex(i)}
                        >
                            <img src={src} alt={`${product.name} ${i}`} />
                        </button>
                    ))}
                </div>

                <div className={styles.mainImageWrap}>
                    <img src={imgs[mainIndex]} alt={product.name} className={styles.mainImage} />
                </div>

                <div className={styles.details}>
                    <h1 className={styles.title}>{product.name}</h1>

                    <div className={styles.ratingRow}>
                        <div className={styles.stars}>{renderStars(product.rating)}</div>
                        <span className={styles.reviews}>({product.reviews} Reviews)</span>
                        <span className={styles.stock}>{product.isInStock ? "In Stock" : "Out of Stock"}</span>
                    </div>

                    <div className={styles.priceRow}>
                        <span className={styles.currentPrice}>${product.currentPrice}</span>
                        {product.originalPrice > product.currentPrice && (
                            <span className={styles.originalPrice}>${product.originalPrice}</span>
                        )}
                    </div>

                    <p className={styles.description}>{product.description}</p>

                    {product.colors?.length ? (
                        <div className={styles.optionRow}>
                            <label className={styles.optionLabel}>Colours:</label>
                            <div className={styles.colors}> 
                                {product.colors.map((c) => (
                                    <button
                                        key={c}
                                        className={`${styles.colorDot} ${selectedColor === c ? styles.colorSelected : ""}`}
                                        onClick={() => setSelectedColor(c)}
                                        title={c}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {product.sizes?.length ? (
                        <div className={styles.optionRow}>
                            <label className={styles.optionLabel}>Size:</label>
                            <div className={styles.sizes}>
                                {product.sizes.map((s) => (
                                    <button
                                        key={s}
                                        className={`${styles.sizeBtn} ${selectedSize === s ? styles.sizeSelected : ""}`}
                                        onClick={() => setSelectedSize(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    <div className={styles.buyRow}>
                        <div className={styles.qtyControl}>
                            <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={!product.isInStock || product.stock === 0}>-</button>
                            <span className={styles.qty}>{qty}</span>
                            <button onClick={() => setQty(qty + 1)} disabled={!product.isInStock || product.stock === 0}>+</button>
                        </div>
                        <button
                            className={styles.buyBtn}
                            disabled={adding || !product.isInStock || product.stock === 0}
                            title={!product.isInStock || product.stock === 0 ? 'Out of Stock' : ''}
                            onClick={handleAddToCart}
                        >
                            <FiShoppingCart />
                            {(!product.isInStock || product.stock === 0)
                                ? 'Out of Stock'
                                : adding ? 'Adding...' : 'Add To Cart'}
                        </button>
                        <button
                            className={styles.wishBtn}
                            title={wishlist.some(w => w.id === product.id) ? "Remove from wishlist" : "Add to wishlist"}
                            disabled={!product.isInStock || product.stock === 0}
                            onClick={() => toggleWishlist(product)}
                        >
                            {wishlist.some(w => w.id === product.id) ? (
                                <AiFillHeart style={{ color: '#e63946' }} />
                            ) : (
                                <FiHeart />
                            )}
                        </button>
                    </div>

                    <div className={styles.deliveryBoxes}>
                        <div className={styles.box}>
                            <strong>Free Delivery</strong>
                            <p>Enter your postal code for Delivery Availability</p>
                        </div>
                        <div className={styles.box}>
                            <strong>Return Delivery</strong>
                            <p>Free 30 Days Delivery Returns. Details</p>
                        </div>
                    </div>
                </div>
            </div>

            <section className={styles.relatedSection}>
                <h3 className={styles.relatedTitle}>Related Items</h3>
                <div className={styles.relatedGrid}>
                    {related.map((r) => (
                        <ProductCard key={r.id} product={r} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProductDetail;