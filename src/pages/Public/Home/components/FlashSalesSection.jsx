import React, { useState } from 'react';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const FlashSalesSection = ({ styles, products, navigate, timeLeft }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
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
  );
};

export default FlashSalesSection;
