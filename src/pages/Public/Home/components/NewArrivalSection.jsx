import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

const NewArrivalSection = ({ styles }) => {
  return (
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

            <div className={styles.promotionalBannersRow}>
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
  );
};

export default NewArrivalSection;
