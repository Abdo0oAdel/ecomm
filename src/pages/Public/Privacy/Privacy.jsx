import styles from "./Privacy.module.css";

function Privacy() {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Privacy Policy</h2>
            <p className={styles.text}>
                Your privacy is important to us. This Privacy Policy explains how we collect,
                use, and protect your personal information when you use our website or make a purchase.
            </p>

            <h3 className={styles.subtitle}>1. Information We Collect</h3>
            <p className={styles.text}>
                We may collect personal information such as your name, email address, shipping
                address, and payment details when you make a purchase or contact us.
            </p>

            <h3 className={styles.subtitle}>2. How We Use Your Information</h3>
            <p className={styles.text}>
                We use your information to process orders, provide customer support, and send
                important updates related to your account or our services.
            </p>

            <h3 className={styles.subtitle}>3. Data Protection</h3>
            <p className={styles.text}>
                We implement strict security measures to protect your personal information from
                unauthorized access, alteration, or disclosure.
            </p>

            <h3 className={styles.subtitle}>4. Cookies</h3>
            <p className={styles.text}>
                Our website uses cookies to enhance your browsing experience. You can choose to
                disable cookies in your browser settings.
            </p>

            <h3 className={styles.subtitle}>5. Changes to This Policy</h3>
            <p className={styles.text}>
                We may update this Privacy Policy from time to time. The latest version will always
                be available on this page.
            </p>

        </section>
    );
}

export default Privacy;
