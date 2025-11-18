import React from 'react';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { useTranslation } from 'react-i18next';

const BestSellingSection = ({ styles, products, addToCart, toggleWishlist, wishlist }) => {
  const { t } = useTranslation();

  return (
    <section className={styles.bestSelling}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <div className={styles.titleContainer}>
              <div className={styles.thisMonthRow}>
                <div className={styles.titleAccent}></div>
                <span className={styles.thisMonthLabel}>{t('bestSelling.thisMonth')}</span>
              </div>
              <h2>{t('bestSelling.title')}</h2>
            </div>
          </div>
          <button className={styles.viewAllBtn}>{t('bestSelling.viewAll')}</button>
        </div>

        <div className={styles.productsGrid}>
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart ? () => addToCart(product) : undefined}
              onToggleWishlist={toggleWishlist ? () => toggleWishlist(product) : undefined}
              isWishlisted={wishlist ? wishlist.some(w => w.id === product.id) : false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingSection;
