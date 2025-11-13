import React from 'react';
import { FiTruck, FiHeadphones, FiShield } from 'react-icons/fi';

const ServiceFeatures = ({ styles }) => {
  return (
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
  );
};

export default ServiceFeatures;
