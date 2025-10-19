import React from 'react';
import styles from './Wishlist.module.css';

// Wishlist data
export const wishlistData = [
    {
        id: 1,
        name: "Gucci duffle bag",
        currentPrice: 960,
        originalPrice: 1160,
        discount: 35,
        image: "https://images.unsplash.com/photo-1719329102117-7d6de5eae6ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkdWZmbGUlMjBiYWd8ZW58MXx8fHwxNzYwODg5MzQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        id: 2,
        name: "RGB liquid CPU Cooler",
        currentPrice: 1960,
        image: "https://images.unsplash.com/photo-1607732667154-ff11e81e5665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSR0IlMjBDUFUlMjBjb29sZXJ8ZW58MXx8fHwxNzYwODg5MzQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        id: 3,
        name: "GP11 Shooter USB Gamepad",
        currentPrice: 550,
        image: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBnYW1lcGFkJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NjA4ODkzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        id: 4,
        name: "Quilted Satin Jacket",
        currentPrice: 750,
        image: "https://images.unsplash.com/photo-1633293822049-dee1b40a99c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlsdGVkJTIwamFja2V0fGVufDF8fHx8MTc2MDg4OTM0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
];

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
    const handleMoveAllToBag = () => {
        console.log('Moving all items to bag');
    };

    const handleRemoveFromWishlist = (id) => {
        console.log('Removing item:', id);
    };

    const handleAddToCart = (id) => {
        console.log('Adding to cart:', id);
    };

    const handleQuickView = (id) => {
        console.log('Quick view:', id);
    };

    return (
        <div className={styles.wishlist}>
            {/* Wishlist Section */}
            <section className={styles.wishlistSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Wishlist ({wishlistData.length})</h2>
                    <button className={styles.moveAllButton} onClick={handleMoveAllToBag}>
                        Move All To Bag
                    </button>
                </div>

                <div className={styles.productsGrid}>
                    {wishlistData.map((product) => (
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
