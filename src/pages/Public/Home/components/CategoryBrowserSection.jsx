import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CategoryBrowserSection = ({
  styles,
  pagedCategories,
  selectedCategory,
  setSelectedCategory,
  categoryPage,
  setCategoryPage,
  totalCategoryPages,
}) => {
  return (
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
  );
};

export default CategoryBrowserSection;
