import React, { useState, useEffect, useMemo } from "react";
import styles from "./Home.module.css";
import {
  FiSmartphone,
  FiMonitor,
  FiWatch,
  FiCamera,
  FiHeadphones,
} from "react-icons/fi";
import { useCategories } from "../../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import { useWishlist } from "../../../hooks/useWishlist";
import useCart from "../../../hooks/useCart";

// Import section components
import HeroSection from "./components/HeroSection";
import FlashSalesSection from "./components/FlashSalesSection";
import CategoryBrowserSection from "./components/CategoryBrowserSection";
import BestSellingSection from "./components/BestSellingSection";
import MusicBannerSection from "./components/MusicBannerSection";
import ProductExplorerSection from "./components/ProductExplorerSection";
import NewArrivalSection from "./components/NewArrivalSection";
import ServiceFeatures from "./components/ServiceFeatures";

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });
  const navigate = useNavigate();
  const { items: wishlist, toggleWishlist } = useWishlist();
  const { handleAddToCart } = useCart();
  const {products,loading: loadingProducts,error: errorProducts,} = useProducts();

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

  const { categories: apiCategories } = useCategories();

  const sidebarCategories =
    Array.isArray(apiCategories) && apiCategories.length > 0
      ? apiCategories.map((cat) => cat.categoryName || cat.name)
      : [];

  const browseCategories =
    Array.isArray(apiCategories) && apiCategories.length > 0
      ? apiCategories.map((cat) => ({
          name: cat.categoryName || cat.name,
          icon: <FiSmartphone />,
          id: cat.categoryID || cat.id,
        }))
      : [];

  const CATEGORIES_PER_PAGE = 6;
  const [categoryPage, setCategoryPage] = useState(0);
  const totalCategoryPages = Math.ceil(
    browseCategories.length / CATEGORIES_PER_PAGE
  );
  const pagedCategories = browseCategories.slice(
    categoryPage * CATEGORIES_PER_PAGE,
    (categoryPage + 1) * CATEGORIES_PER_PAGE
  );

  const SIDEBAR_CATEGORIES_PER_PAGE = 10;
  const [sidebarCategoryPage, setSidebarCategoryPage] = useState(0);

  const totalSidebarCategoryPages = Math.ceil(
    sidebarCategories.length / SIDEBAR_CATEGORIES_PER_PAGE
  );
  const pagedSidebarCategories = sidebarCategories.slice(
    sidebarCategoryPage * SIDEBAR_CATEGORIES_PER_PAGE,
    (sidebarCategoryPage + 1) * SIDEBAR_CATEGORIES_PER_PAGE
  );

  const [selectedCategory, setSelectedCategory] = useState(null);

  const exploreFilteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return products;
    }
    return products.filter((p) => {
      return (
        (p.categoryName && p.categoryName === selectedCategory) ||
        (p.category && p.category === selectedCategory)
      );
    });
  }, [products, selectedCategory]);

  return (
    <div className={styles.home}>
      <HeroSection
        styles={styles}
        sidebarCategories={pagedSidebarCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        products={products}
        sidebarCategoryPage={sidebarCategoryPage}
        setSidebarCategoryPage={setSidebarCategoryPage}
        totalSidebarCategoryPages={totalSidebarCategoryPages}
      />

      <FlashSalesSection
        styles={styles}
        products={products}
        navigate={navigate}
        timeLeft={timeLeft}
        addToCart={handleAddToCart}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
      />

      <CategoryBrowserSection
        styles={styles}
        pagedCategories={pagedCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoryPage={categoryPage}
        setCategoryPage={setCategoryPage}
        totalCategoryPages={totalCategoryPages}
      />
      <ProductExplorerSection
        styles={styles}
        exploreFilteredProducts={exploreFilteredProducts}
        loadingProducts={loadingProducts}
        errorProducts={errorProducts}
        toggleWishlist={toggleWishlist}
        addToCart={handleAddToCart}
        wishlist={wishlist}
      />

      <BestSellingSection styles={styles} products={products} addToCart={handleAddToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />

      <MusicBannerSection styles={styles} />

      <NewArrivalSection styles={styles} />

      <ServiceFeatures styles={styles} />
    </div>
  );
};

export default Home;
