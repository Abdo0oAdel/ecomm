import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { wishlistActions } from '../../../store/Wishlist/slice.js';
import { cartActions } from '../../../store/Cart/slice.js';
import styles from './Wishlist.module.css';

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
        image: "https://images.unsplash.com/photo-1640955014216-75201056c829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3B8ZW58MXx8fHwxNzYwODc5MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        id: 6,
        name: "IPS LCD Gaming Monitor",
        currentPrice: 1160,
        rating: 5,
        reviews: 65,
        image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb25pdG9yfGVufDF8fHx8MTc2MDg1NTExNXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        id: 7,
        name: "HAVIT HV-G92 Gamepad",
        currentPrice: 560,
        rating: 5,
        reviews: 65,
        isNew: true,
        image: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBnYW1lcGFkJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NjA4ODkzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        id: 8,
        name: "AK-900 Wired Keyboard",
        currentPrice: 200,
        rating: 5,
        reviews: 65,
        image: "https://images.unsplash.com/photo-1602025882379-e01cf08baa51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmR8ZW58MXx8fHwxNzYwODU1MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
];

const Wishlist = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);

    // Wishlist data is now loaded from backend on login - no need for demo data

    const handleMoveAllToBag = () => {
        wishlistItems.forEach(item => {
            dispatch(cartActions.addToCart({ ...item, price: item.currentPrice, quantity: 1 }));
        });
        dispatch(wishlistActions.clearWishlist());
    };

    const handleRemoveFromWishlist = (id) => {
        dispatch(wishlistActions.removeFromWishlist(id));
    };

    const handleAddToCart = (id) => {
        const item = wishlistItems.find(item => item.id === id);
        if (item) {
            dispatch(cartActions.addToCart({ ...item, price: item.currentPrice, quantity: 1 }));
            dispatch(wishlistActions.removeFromWishlist(id));
        }
    };

    const handleQuickView = (id) => {
        console.log('Quick view:', id);
    };

    return (
        <div className={styles.wishlist}>
            {/* Wishlist Section */}
            <section className={styles.wishlistSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{t('wishlist.title')} ({wishlistItems.length})</h2>
                    <button className={styles.moveAllButton} onClick={handleMoveAllToBag}>
                        {t('wishlist.addToCart')}
                    </button>
                </div>

                <div className={styles.productsGrid}>
                    {wishlistItems.map((product) => (
                        <article key={product.id} className={styles.productCard}>
                            <div className={styles.productImageContainer}>
                                {product.discount && (
                                    <span className={styles.discountBadge}>-{product.discount}%</span>
                                )}
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleRemoveFromWishlist(product.id)}
                                    aria-label="Remove from wishlist"
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                                <img src={product.image} alt={product.name} className={styles.productImage} />
                                <button
                                    className={styles.addToCartButton}
                                    onClick={() => handleAddToCart(product.id)}
                                >
                                    <i className="bi bi-cart"></i>
                                    <span>Add To Cart</span>
                                </button>
                            </div>
                            <div className={styles.productInfo}>
                                <h3 className={styles.productName}>{product.name}</h3>
                                <div className={styles.priceContainer}>
                                    <span className={styles.currentPrice}>${product.currentPrice}</span>
                                    {product.originalPrice && (
                                        <span className={styles.originalPrice}>${product.originalPrice}</span>
                                    )}
                                </div>
                            </div>
                        </article>
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
                                    <span className={styles.discountBadge}>-{product.discount}%</span>
                                )}
                                {product.isNew && (
                                    <span className={styles.newBadge}>NEW</span>
                                )}
                                <button
                                    className={styles.quickViewButton}
                                    onClick={() => handleQuickView(product.id)}
                                    aria-label="Quick view"
                                >
                                    <i className="bi bi-eye"></i>
                                </button>
                                <img src={product.image} alt={product.name} className={styles.productImage} />
                                <button
                                    className={styles.addToCartButton}
                                    onClick={() => handleAddToCart(product.id)}
                                >
                                    <i className="bi bi-cart"></i>
                                    <span>Add To Cart</span>
                                </button>
                            </div>
                            <div className={styles.productInfo}>
                                <h3 className={styles.productName}>{product.name}</h3>
                                <div className={styles.priceContainer}>
                                    <span className={styles.currentPrice}>${product.currentPrice}</span>
                                    {product.originalPrice && (
                                        <span className={styles.originalPrice}>${product.originalPrice}</span>
                                    )}
                                </div>
                                {product.rating && (
                                    <div className={styles.ratingContainer}>
                                        <div className={styles.stars}>
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className="bi bi-star-fill"></i>
                                            ))}
                                        </div>
                                        <span className={styles.reviewCount}>({product.reviews})</span>
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
