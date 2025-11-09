import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import ProductCard from "../../../components/ProductCard/ProductCard";
import {
    FiChevronRight, FiChevronLeft, FiTruck, FiHeadphones, FiShield,
    FiSmartphone, FiMonitor, FiWatch, FiCamera, FiChevronDown,
} from "react-icons/fi";

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 23,
        minutes: 19,
        seconds: 56,
    });

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

    // Sample data
    const flashSaleProducts = [
        {
            id: 1,
            name: "HAVIT HV-G92 Gamepad",
            image:
                "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=300&fit=crop",
            originalPrice: 160,
            currentPrice: 120,
            discount: 20,
            rating: 5,
            reviews: 88,
            isNew: false,
            category: "Gaming",
            colors: ["black", "red"],
        },
        {
            id: 2,
            name: "AK-200 Wired Keyboard",
            image:
                "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
            originalPrice: 1160,
            currentPrice: 960,
            discount: 20,
            rating: 5,
            reviews: 75,
            isNew: false,
            category: "Gaming",
            colors: ["black"],
        },
        {
            id: 3,
            name: "IPS LCD Gaming Monitor",
            image:
                "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=300&h=300&fit=crop",
            originalPrice: 400,
            currentPrice: 370,
            discount: 20,
            rating: 5,
            reviews: 99,
            isNew: false,
            category: "Electronics",
        },
        {
            id: 4,
            name: "S-Series Comfort Chair",
            image:
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
            originalPrice: 400,
            currentPrice: 370,
            discount: 20,
            rating: 5,
            reviews: 99,
            isNew: false,
            category: "Furniture",
            colors: ["green", "red"],
        },
    ];

    const categories = [
        { name: "Phones", icon: <FiSmartphone />, active: false },
        { name: "Computers", icon: <FiMonitor />, active: false },
        { name: "SmartWatch", icon: <FiWatch />, active: false },
        { name: "Camera", icon: <FiCamera />, active: true },
        { name: "HeadPhones", icon: <FiHeadphones />, active: false },
        //{ name: "Gaming", icon: <FiGamepad2 />, active: false },
    ];

    const sidebarCategories = [
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

    // Submenu data for sidebar categories (add/change items as needed)
    const sidebarSubmenus = {
        "Woman's Fashion": [
            { title: 'Clothing', items: ['Tops', 'Dresses', 'Pants', 'Skirts', 'Jumpsuits'] },
            { title: 'Sportswear', items: ['Leggings', 'Sports Tops', 'Shorts', 'Sport Bras'] },
            { title: 'Footwear', items: ['Sandals', 'Sneakers', 'Heels', 'Boots'] },
            { title: 'Bags & Accessories', items: ['Totes', 'Crossbody Bags', 'Wallets', 'Belts', 'Jewelry'] },
        ],
        "Men's Fashion": [
            { title: 'Clothing', items: ['Shirts', 'T-Shirts', 'Pants', 'Suits'] },
            { title: 'Sportswear', items: ['Tracksuits', 'Shorts', 'Gym Tees'] },
            { title: 'Footwear', items: ['Sneakers', 'Loafers', 'Boots'] },
            { title: 'Accessories', items: ['Belts', 'Wallets', 'Watches'] },
        ],
        Electronics: [
            { title: 'Phones', items: ['Smartphones', 'Cases', 'Chargers'] },
            { title: 'Computers', items: ['Laptops', 'Monitors', 'Peripherals'] },
            { title: 'Audio', items: ['Headphones', 'Speakers', 'Microphones'] },
        ],
        'Home & Lifestyle': [
            { title: 'Home', items: ['Decor', 'Bedding', 'Furniture'] },
            { title: 'Kitchen', items: ['Cookware', 'Appliances', 'Utensils'] },
        ],
        Medicine: [
            { title: 'Supplements', items: ['Vitamins', 'Herbal', 'Protein'] },
            { title: 'First Aid', items: ['Bandages', 'Disinfectants'] },
        ],
        'Sports & Outdoor': [
            { title: 'Outdoor', items: ['Tents', 'Camping Gear'] },
            { title: 'Fitness', items: ['Yoga Mats', 'Dumbbells'] },
        ],
        "Baby's & Toys": [
            { title: 'Baby', items: ['Diapers', 'Strollers'] },
            { title: 'Toys', items: ['Educational Toys', 'Action Figures'] },
        ],
        'Groceries & Pets': [
            { title: 'Groceries', items: ['Snacks', 'Beverages'] },
            { title: 'Pets', items: ['Dog Food', 'Cat Litter'] },
        ],
        'Health & Beauty': [
            { title: 'Skincare', items: ['Moisturizers', 'Serums'] },
            { title: 'Makeup', items: ['Lipstick', 'Foundation'] },
        ],
        // other categories may be added here with empty arrays or specific items
    };

    const [openCategory, setOpenCategory] = useState(null);
    const toggleCategory = (name) => {
        setOpenCategory((prev) => (prev === name ? null : name));
    };

    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContainer}>
                    {/* Left Sidebar - Categories */}
                    <div className={styles.categorySidebar}>
                        {/*  <h3>Categories</h3> */}
                        <ul className={styles.categoryList}>
                            {sidebarCategories.map((category, index) => {
                                const hasSub = Boolean(sidebarSubmenus[category]);
                                const opened = openCategory === category;
                                const submenu = sidebarSubmenus[category] || [];
                                return (
                                    <li key={index} className={styles.categoryItem}>
                                        <button
                                            className={styles.categoryButton}
                                            onClick={() => (hasSub ? toggleCategory(category) : null)}
                                            aria-expanded={hasSub ? opened : undefined}
                                        >
                                            <span>{category}</span>
                                            {hasSub ? (
                                                <FiChevronDown
                                                    className={`${styles.arrowDown} ${opened ? styles.rotated : ''}`}
                                                />
                                            ) : (
                                                <FiChevronRight />
                                            )}
                                        </button>

                                        {/* Accordion submenu for categories that have submenu data */}
                                        {hasSub && (
                                            <div
                                                className={`${styles.submenu} ${opened ? styles.active : ''}`}
                                                role="region"
                                                aria-hidden={!opened}
                                            >
                                                <div className={styles.submenuInner}>
                                                    {submenu.map((col, cidx) => (
                                                        <div key={cidx} className={styles.submenuColumn}>
                                                            <div className={styles.submenuCategory}>{col.title}</div>
                                                            <ul className={styles.submenuList}>
                                                                {col.items.map((item, iidx) => (
                                                                    <li key={iidx} className={styles.submenuItem}>
                                                                        <a href={`/#/search?cat=${encodeURIComponent(item)}`}>{item}</a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </li>
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
                        <div className={styles.bannerPagination}>
                            <span className={styles.paginationDot}></span>
                            <span className={styles.paginationDot}></span>
                            <span className={styles.paginationDot}></span>
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
                            {flashSaleProducts.map((product) => (
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
                        <button className={styles.redButton}>View All Products</button>
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
                            <button className={styles.carouselBtn}>
                                <FiChevronLeft />
                            </button>
                            <button className={styles.carouselBtn}>
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>

                    <div className={styles.categoriesGrid}>
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className={`${styles.categoryCard} ${
                                    category.active ? styles.active : ""
                                }`}
                            >
                                <div className={styles.categoryIcon}>{category.icon}</div>
                                <span className={styles.categoryName}>{category.name}</span>
                            </div>
                        ))}
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
                        {flashSaleProducts.slice(0, 4).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
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

                    <div className={`${styles.productsGrid} ${styles.exploreGrid}`}>
                        {[...flashSaleProducts, ...flashSaleProducts]
                            .slice(0, 8)
                            .map((product, index) => (
                                <ProductCard key={`explore-${index}`} product={product} />
                            ))}
                    </div>

                    <div className={styles.viewAllBtn}>
                        <button className={styles.redButton}>View All Products</button>
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