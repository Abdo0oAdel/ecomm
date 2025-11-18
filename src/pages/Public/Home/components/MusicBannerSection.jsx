import React from 'react';
import { useTranslation } from 'react-i18next';

const MusicBannerSection = ({ styles }) => {
  const { t } = useTranslation();

  return (
    <section className={styles.musicBanner}>
      <div className={styles.container}>
        <div className={styles.bannerWrapper}>
          <div className={styles.bannerInfo}>
            <span className={styles.bannerLabel}>{t('musicBanner.categories')}</span>
            <h2>{t('musicBanner.title')}</h2>
            <div className={styles.musicCountdown}>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>23</span>
                <span className={styles.timeLabel}>{t('musicBanner.hours')}</span>
              </div>
              <span className={styles.timeSeparator}>:</span>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>05</span>
                <span className={styles.timeLabel}>{t('musicBanner.days')}</span>
              </div>
              <span className={styles.timeSeparator}>:</span>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>59</span>
                <span className={styles.timeLabel}>{t('musicBanner.minutes')}</span>
              </div>
              <span className={styles.timeSeparator}>:</span>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>35</span>
                <span className={styles.timeLabel}>{t('musicBanner.seconds')}</span>
              </div>
            </div>
            <button className={styles.buyNowBtn}>{t('musicBanner.buyNow')}</button>
          </div>
          <div className={styles.bannerImageContainer}>
            <img
              src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop"
              alt={t('musicBanner.alt')}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicBannerSection;
