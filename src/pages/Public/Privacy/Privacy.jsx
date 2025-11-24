import { useTranslation } from 'react-i18next';
import styles from "./Privacy.module.css";

function Privacy() {
    const { t } = useTranslation();
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{t('privacy.title')}</h2>
            <p className={styles.text}>
                {t('privacy.description')}
            </p>

            <h3 className={styles.subtitle}>{t('privacy.section1.title')}</h3>
            <p className={styles.text}>
                {t('privacy.section1.content')}
            </p>

            <h3 className={styles.subtitle}>{t('privacy.section2.title')}</h3>
            <p className={styles.text}>
                {t('privacy.section2.content')}
            </p>

            <h3 className={styles.subtitle}>{t('privacy.section3.title')}</h3>
            <p className={styles.text}>
                {t('privacy.section3.content')}
            </p>

            <h3 className={styles.subtitle}>{t('privacy.section4.title')}</h3>
            <p className={styles.text}>
                {t('privacy.section4.content')}
            </p>

            <h3 className={styles.subtitle}>{t('privacy.section5.title')}</h3>
            <p className={styles.text}>
                {t('privacy.section5.content')}
            </p>

        </section>
    );
}

export default Privacy;
