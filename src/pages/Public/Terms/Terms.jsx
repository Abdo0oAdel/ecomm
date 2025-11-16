import React from 'react';
import styles from './Terms.module.css';
import { useTranslation } from 'react-i18next';

const Terms = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1>{t('terms.title')}</h1>

      <section className={styles.section}>
        <h2>{t('terms.introduction.title')}</h2>
        <p>{t('terms.introduction.content')}</p>
      </section>

      <section className={styles.section}>
        <h2>{t('terms.intellectualProperty.title')}</h2>
        <p>{t('terms.intellectualProperty.content')}</p>
      </section>

      <section className={styles.section}>
        <h2>{t('terms.yourUse.title')}</h2>
        <p>{t('terms.yourUse.content')}</p>
      </section>

      <section className={styles.section}>
        <h2>{t('terms.limitationOfLiability.title')}</h2>
        <p>{t('terms.limitationOfLiability.content')}</p>
      </section>

      <section className={styles.section}>
        <h2>{t('terms.changesToTerms.title')}</h2>
        <p>{t('terms.changesToTerms.content')}</p>
      </section>
    </div>
  );
};

export default Terms;
