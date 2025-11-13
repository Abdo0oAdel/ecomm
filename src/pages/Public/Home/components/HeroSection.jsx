import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({
  styles,
  sidebarCategories,
  selectedCategory,
  setSelectedCategory,
  products,
}) => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);
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

  return (
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
  );
};

export default HeroSection;
