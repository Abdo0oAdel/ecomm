import React from 'react';
import styles from './Terms.module.css';

const Terms = () => {
     return (
    <div className={styles.container}>
      <h1>Terms & Conditions</h1>

      <section className={styles.section}>
        <h2>1. Introduction</h2>
        <p>
          Welcome to our website. These terms and conditions govern your use of this site. By using the site, you accept these terms in full.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Intellectual Property</h2>
        <p>
          Unless otherwise stated, the copyright and other intellectual property rights in all material on this site are owned by us or our licensors.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Your Use</h2>
        <p>
          You must not use our site in any way that causes, or may cause, damage to the site or impairment of its availability or accessibility.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Limitation of Liability</h2>
        <p>
          We will not be liable for any loss or damage (whether direct, indirect or consequential) arising out of your use of this site.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Changes to Terms</h2>
        <p>
          We may revise these terms from time to time. The revised version will apply to the use of the site from the date of publication.
        </p>
      </section>
    </div>
  );
}

export default Terms;
