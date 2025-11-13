import React, { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";
import ProductCard from "../../../components/ProductCard/ProductCard";
import {
    FiChevronRight, FiChevronLeft, FiTruck, FiHeadphones, FiShield,
    FiSmartphone, FiMonitor, FiWatch, FiCamera, FiChevronDown,
} from "react-icons/fi";
import { useCategories } from "../../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import { useWishlist } from "../../../hooks/useWishlist";
import { useCart } from "../../../hooks/useCart";

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 23,
        minutes: 19,
        seconds: 56,
    });
    const navigate = useNavigate();
    const { wishlist, toggleWishlist } = useWishlist();
    const { cart, addToCart } = useCart();
    const { products, loading: loadingProducts, error: errorProducts } = useProducts();

    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // fetch categories from API (hook) - keep fallbacks to preserve UI/design
    const { categories: apiCategories, loading, error } = useCategories();

    const defaultCategories = [
        { name: "Phones", icon: <FiSmartphone />, active: false },
        { name: "Computers", icon: <FiMonitor />, active: false },
        { name: "SmartWatch", icon: <FiWatch />, active: false },
        { name: "Camera", icon: <FiCamera />, active: true },
        { name: "HeadPhones", icon: <FiHeadphones />, active: false },
    ];

    const defaultSidebarCategories = [
        "Woman's Fashion",
        "Men's Fashion",
        "Electronics",
        "Home & Lifestyle",
        "Medicine",
        "Sports & Outdoor",
        "Baby's & Toys",
        "Groceries & Pets",
        "Health & Beauty",
    ];

    // Use only API categories for sidebar and Browse By Category
    const sidebarCategories = Array.isArray(apiCategories) && apiCategories.length > 0
        ? apiCategories.map((cat) => cat.categoryName || cat.name)
        : [];

    // For Browse By Category, show all API categories (paginated, 6 at a time)
    const browseCategories = Array.isArray(apiCategories) && apiCategories.length > 0
        ? apiCategories.map((cat, index) => ({
            name: cat.categoryName || cat.name,
            icon: <FiSmartphone />,
            id: cat.categoryID || cat.id,
        }))
        : [];

    // Pagination for Browse By Category
    const CATEGORIES_PER_PAGE = 6;
    const [categoryPage, setCategoryPage] = useState(0);
    const totalCategoryPages = Math.ceil(browseCategories.length / CATEGORIES_PER_PAGE);
    const pagedCategories = browseCategories.slice(
        categoryPage * CATEGORIES_PER_PAGE,
        (categoryPage + 1) * CATEGORIES_PER_PAGE
    );

    // Selected category state (null = all)
    const [selectedCategory, setSelectedCategory] = useState(null);

    const sidebarSubmenus = {};
    if (Array.isArray(apiCategories)) {
        apiCategories.forEach((cat) => {
            if (cat && Array.isArray(cat.subcategories) && cat.subcategories.length > 0) {
                sidebarSubmenus[cat.categoryName || cat.name] = cat.subcategories.map((sc) => ({
                    title: sc.title || sc.category || sc.name || '',
                    items: Array.isArray(sc.items) ? sc.items : [],
                }));
            }
        });
    }

    const [openCategory, setOpenCategory] = useState(null);
    const toggleCategory = (name) => {
        setOpenCategory((prev) => (prev === name ? null : name));
    };

    const [hoveredCategory, setHoveredCategory] = useState(null);
    // Timeout ref to avoid flicker when moving mouse between sidebar and submenu
    const hoverTimeoutRef = useRef(null);

    const handleSidebarMouseEnter = (category) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setHoveredCategory(category);
    };

    const handleSidebarMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredCategory(null);
        }, 120); // 120ms delay
    };

    const exploreFilteredProducts = selectedCategory
        ? products.filter((p) => {
            // Support both categoryName and category fields
            return (
                (p.categoryName && p.categoryName === selectedCategory) ||
                (p.category && p.category === selectedCategory)
            );
        })
        : products;

    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <section className={styles.heroSection}>

                <div className={styles.heroContainer}>
                    {/* Left Sidebar - Categories */}
                    <div className={styles.categorySidebar}>
                        <ul className={styles.categoryList}>
                            {sidebarCategories.map((category, index) => {
                                const isActive = selectedCategory === category;
                                const categoryProducts = products.filter(
                                    (p) => (p.categoryName === category || p.category === category)
                                );
                                // Use a parent div with relative positioning and hover handlers
                                return (
                                    <div
                                        key={index}
                                        className={styles.sidebarCategoryWrapper}
                                        style={{ position: 'relative', width: '100%' }}
                                        onMouseEnter={() => handleSidebarMouseEnter(category)}
                                        onMouseLeave={handleSidebarMouseLeave}
                                    >
                                        <li className={styles.categoryItem} style={{ listStyle: 'none' }}>
                                            <button
                                                className={styles.categoryButton + (isActive ? ' ' + styles.active : '')}
                                                onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                                            >
                                                <span>{category}</span>
                                            </button>
                                        </li>
                                        {/* Floating panel with products on hover */}
                                        {hoveredCategory === category && categoryProducts.length > 0 && (
                                            <div
                                                className={styles.sidebarProductPanel}
                                                style={{ position: 'absolute', left: '100%', top: 0, zIndex: 100 }}
                                            >
                                                <div className={styles.sidebarProductGrid}>
                                                    {categoryProducts.slice(0, 8).map((product) => (
                                                        <div
                                                            key={product.id}
                                                            className={styles.sidebarProductCard}
                                                            onClick={() => navigate(`/products/${product.id}`, { state: { product } })}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            <img src={product.image} alt={product.name} className={styles.sidebarProductImg} />
                                                            <div className={styles.sidebarProductName}>{product.name}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Main Banner */}
                    <div className={styles.mainBanner}>
                        <div className={styles.bannerContent}>
                            <div className={styles.bannerText}>
                                <h2>Up to 10% off Voucher</h2>
                                <button className={styles.shopNowBtn}>Shop Now</button>
                            </div>
                            <div className={styles.bannerImage}>
                                <img
                                    src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop"
                                    alt="iPhone 14 Pro"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Flash Sales Section */}
            <section className={styles.flashSales}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitle}>
                            <div className={styles.titleContainer}>
                                <div className={styles.todayRow}>
                                    <div className={styles.titleAccent}></div>
                                    <span className={styles.todayLabel}>Today's</span>
                                </div>
                                <h2>Flash Sales</h2>
                            </div>
                        </div>
                        <div className={styles.centerSection}>
                            <div className={styles.countdownTimer}>
                                <div className={styles.timeUnit}>
                                    <span className={styles.timeNumber}>
                                        {timeLeft.days.toString().padStart(2, "0")}
                                    </span>
                                    <span className={styles.timeLabel}>Days</span>
                                </div>
                                <span className={styles.timeSeparator}>:</span>
                                <div className={styles.timeUnit}>
                                    <span className={styles.timeNumber}>
                                        {timeLeft.hours.toString().padStart(2, "0")}
                                    </span>
                                    <span className={styles.timeLabel}>Hours</span>
                                </div>
                                <span className={styles.timeSeparator}>:</span>
                                <div className={styles.timeUnit}>
                                    <span className={styles.timeNumber}>
                                        {timeLeft.minutes.toString().padStart(2, "0")}
                                    </span>
                                    <span className={styles.timeLabel}>Minutes</span>
                                </div>
                                <span className={styles.timeSeparator}>:</span>
                                <div className={styles.timeUnit}>
                                    <span className={styles.timeNumber}>
                                        {timeLeft.seconds.toString().padStart(2, "0")}
                                    </span>
                                    <span className={styles.timeLabel}>Seconds</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.navigationSection}>
                            <button className={styles.carouselBtn}>
                                <FiChevronLeft />
                            </button>
                            <button className={styles.carouselBtn}>
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>

                    <div className={styles.productsCarousel}>
                        <button
                            className={styles.carouselBtn}
                            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
                        >
                            <FiChevronLeft />
                        </button>

                        <div className={styles.productsGrid}>
                            {products.slice(0, 4).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <button
                            className={styles.carouselBtn}
                            onClick={() => setCurrentSlide((prev) => Math.min(2, prev + 1))}
                        >
                            <FiChevronRight />
                        </button>
                    </div>

                    <div className={styles.viewAllBtn}>
                        <button className={styles.redButton} onClick={() => navigate('/products')}>
                            View All Products
                        </button>
                    </div>
                </div>
            </section>

            {/* Browse By Category */}
            <section className={styles.browseCategory}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitle}>
                            <div className={styles.titleContainer}>
                                <div className={styles.categoriesRow}>
                                    <div className={styles.titleAccent}></div>
                                    <span className={styles.categoriesLabel}>Categories</span>
                                </div>
                                <h2>Browse By Category</h2>
                            </div>
                        </div>
                        <div className={styles.navigationSection}>
                            <button
                                className={styles.carouselBtn}
                                onClick={() => setCategoryPage((prev) => Math.max(0, prev - 1))}
                                disabled={categoryPage === 0}
                                aria-label="Previous categories"
                            >
                                <FiChevronLeft />
                            </button>
                            <button
                                className={styles.carouselBtn}
                                onClick={() => setCategoryPage((prev) => Math.min(totalCategoryPages - 1, prev + 1))}
                                disabled={categoryPage >= totalCategoryPages - 1}
                                aria-label="Next categories"
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>

                    <div className={styles.categoriesGrid}>
                        {pagedCategories.map((category, index) => (
                            <div
                                key={category.id || index}
                                className={
                                    styles.categoryCard +
                                    (selectedCategory === category.name ? ' ' + styles.active : '')
                                }
                                onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className={styles.categoryIcon}>{category.icon}</div>
                                <span className={styles.categoryName}>{category.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explore Our Products */}
            <section className={styles.exploreProducts}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitle}>
                            <div className={styles.titleContainer}>
                                <div className={styles.categoriesRow}>
                                    <div className={styles.titleAccent}></div>
                                    <span className={styles.categoriesLabel}>Our Products</span>
                                </div>
                                <h2>Explore Our Products</h2>
                            </div>
                        </div>
                        <div className={styles.exploreHeaderRight}>
                            <button className={styles.lightIconBtn}>
                                <FiChevronLeft />
                            </button>
                            <button className={styles.lightIconBtn}>
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>

                    {loadingProducts ? (
                        <div>Loading products...</div>
                    ) : errorProducts ? (
                        <div style={{ color: 'red' }}>{errorProducts}</div>
                    ) : (
                        <div className={`${styles.productsGrid} ${styles.exploreGrid}`}>
                            {exploreFilteredProducts.slice(0, 8).map((product) => (
                                <ProductCard
                                    key={`explore-${product.id}`}
                                    product={product}
                                    onToggleWishlist={() => toggleWishlist(product)}
                                    onAddToCart={() => addToCart(product)}
                                    onViewDetails={() => navigate(`/products/${product.id}`, { state: { product } })}
                                />
                            ))}
                        </div>
                    )}

                    <div className={styles.viewAllBtn}>
                        <button
                            className={styles.redButton}
                            onClick={() => navigate("/products", { state: { products } })}
                        >
                            View All Products
                        </button>
                    </div>
                </div>
            </section>

            {/* Music Experience Banner */}
            <section className={styles.musicBanner}>
                <div className={styles.container}>
                    <div className={styles.bannerWrapper}>
                        <div className={styles.bannerInfo}>
                            <span className={styles.bannerLabel}>Categories</span>
                            <h2>Enhance Your Music Experience</h2>
                            <div className={styles.musicCountdown}>
                                <div className={styles.timeUnit}>
                                    <span className={styles.timeNumber}>23</span>
                                    <span className={styles.timeLabel}>Hours</span>
                                </div>
                                <span className={styles.timeSeparator}>:</span>
                                <div className={styles.timeUnit}>
                                    <span className={styles.timeNumber}>05</span>
                                    <span className={styles.timeLabel}>Days</span>
                                </div>
                                <span className={styles.timeSeparator}>:</span>
                                <div className={styles.timeUnit}>
                                    <span className={styles.timeNumber}>59</span>
                                    <span className={styles.timeLabel}>Minutes</span>
                                </div>
                                <span className={styles.timeSeparator}>:</span>
                                <div className={styles.timeUnit}>
                                    <span className={styles.timeNumber}>35</span>
                                    <span className={styles.timeLabel}>Seconds</span>
                                </div>
                            </div>
                            <button className={styles.buyNowBtn}>Buy Now!</button>
                        </div>
                        <div className={styles.bannerImageContainer}>
                            <img
                                src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop"
                                alt="JBL Speaker"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Best Selling Products */}
            <section className={styles.bestSelling}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitle}>
                            <div className={styles.titleContainer}>
                                <div className={styles.thisMonthRow}>
                                    <div className={styles.titleAccent}></div>
                                    <span className={styles.thisMonthLabel}>This Month</span>
                                </div>
                                <h2>Best Selling Products</h2>
                            </div>
                        </div>
                        <button className={styles.viewAllBtn}>View All</button>
                    </div>

                    <div className={styles.productsGrid}>
                        {products.slice(0, 4).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* New Arrival */}
            <section className={styles.newArrival}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitle}>
                            <div className={styles.titleContainer}>
                                <div className={styles.featuredRow}>
                                    <div className={styles.titleAccent}></div>
                                    <span className={styles.featuredLabel}>Featured</span>
                                </div>
                                <h2>New Arrival</h2>
                            </div>
                        </div>
                    </div>

                    <div className={styles.newArrivalGrid}>
                        <div className={styles.featuredProduct}>
                            <div className={styles.featuredContent}>
                                <h3>PlayStation 5</h3>
                                <p>Black and White version of the PS5 coming out on sale.</p>
                                <button className={styles.shopNowBtn}>
                                    Shop Now <FiChevronRight />
                                </button>
                            </div>
                            <div className={styles.featuredImage}>
                                <img
                                    src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&h=400&fit=crop"
                                    alt="PlayStation 5"
                                />
                            </div>
                        </div>

                        <div className={styles.promotionalBanners}>
                            <div className={styles.promoBanner}>
                                <div className={styles.promoContent}>
                                    <h4>Women's Collections</h4>
                                    <p>Featured women collections that give you another vibe.</p>
                                    <button className={styles.shopNowBtn}>
                                        Shop Now <FiChevronRight />
                                    </button>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"
                                    alt="Women's Collection"
                                />
                            </div>

                            <div className={styles.promoBannersRow}>
                                <div className={styles.smallPromoBanner}>
                                    <div className={styles.smallPromoContent}>
                                        <h4>Speakers</h4>
                                        <p>Amazon wireless speakers</p>
                                        <button className={styles.shopNowBtn}>
                                            Shop Now <FiChevronRight />
                                        </button>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop"
                                        alt="Speakers"
                                    />
                                </div>

                                <div className={styles.smallPromoBanner}>
                                    <div className={styles.smallPromoContent}>
                                        <h4>Perfume</h4>
                                        <p>GUCCI INTENSE OUD EDP</p>
                                        <button className={styles.shopNowBtn}>
                                            Shop Now <FiChevronRight />
                                        </button>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop"
                                        alt="Perfume"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Features */}
            <section className={styles.serviceFeatures}>
                <div className={styles.container}>
                    <div className={styles.featuresGrid}>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <FiTruck />
                            </div>
                            <div className={styles.featureContent}>
                                <h3>FREE AND FAST DELIVERY</h3>
                                <p>Free delivery for all orders over $140</p>
                            </div>
                        </div>

                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <FiHeadphones />
                            </div>
                            <div className={styles.featureContent}>
                                <h3>24/7 CUSTOMER SERVICE</h3>
                                <p>Friendly 24/7 customer</p>
                            </div>
                        </div>

                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <FiShield />
                            </div>
                            <div className={styles.featureContent}>
                                <h3>MONEY BACK GUARANTEE</h3>
                                <p>We return money within 30 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;