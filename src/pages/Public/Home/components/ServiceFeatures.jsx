import React from 'react';
import { FiTruck, FiHeadphones, FiShield } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const ServiceFeatures = ({ styles }) => {
  const { t } = useTranslation();

  return (
    <section className={styles.serviceFeatures}>
      <div className={styles.container}>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <FiTruck />
            </div>
            <div className={styles.featureContent}>
              <h3>{t('serviceFeatures.delivery.title')}</h3>
              <p>{t('serviceFeatures.delivery.description')}</p>
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <FiHeadphones />
            </div>
            <div className={styles.featureContent}>
              <h3>{t('serviceFeatures.service.title')}</h3>
              <p>{t('serviceFeatures.service.description')}</p>
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <FiShield />
            </div>
            <div className={styles.featureContent}>
              <h3>{t('serviceFeatures.guarantee.title')}</h3>
              <p>{t('serviceFeatures.guarantee.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
