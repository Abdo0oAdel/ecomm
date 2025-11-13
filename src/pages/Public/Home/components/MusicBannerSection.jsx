import React from 'react';

const MusicBannerSection = ({ styles }) => {
  return (
    <section className={styles.musicBanner}>
      <div className={styles.container}>
        <div className={styles.bannerWrapper}>
          <div className={styles.bannerInfo}>
            <span className={styles.bannerLabel}>Categories</span>
            <h2>Enhance Your Music Experience</h2>
            <div className={styles.musicCountdown}>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>23</span>
                <span className={styles.timeLabel}>Hours</span>
              </div>
              <span className={styles.timeSeparator}>:</span>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>05</span>
                <span className={styles.timeLabel}>Days</span>
              </div>
              <span className={styles.timeSeparator}>:</span>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>59</span>
                <span className={styles.timeLabel}>Minutes</span>
              </div>
              <span className={styles.timeSeparator}>:</span>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>35</span>
                <span className={styles.timeLabel}>Seconds</span>
              </div>
            </div>
            <button className={styles.buyNowBtn}>Buy Now!</button>
          </div>
          <div className={styles.bannerImageContainer}>
            <img
              src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop"
              alt="JBL Speaker"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicBannerSection;
