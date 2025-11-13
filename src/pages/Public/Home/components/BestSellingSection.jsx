import React from 'react';
import ProductCard from '../../../../components/ProductCard/ProductCard';

const BestSellingSection = ({ styles, products }) => {
  return (
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
  );
};

export default BestSellingSection;
