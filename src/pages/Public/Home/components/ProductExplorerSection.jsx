import React from 'react';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ProductExplorerSection = ({
  styles,
  exploreFilteredProducts,
  loadingProducts,
  errorProducts,
  toggleWishlist,
  addToCart,
}) => {
  const navigate = useNavigate();

  return (
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
            onClick={() => navigate("/products")}
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductExplorerSection;
