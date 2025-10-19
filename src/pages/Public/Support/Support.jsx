import { useState } from 'react';
import styles from './Support.module.css';

function Support() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return <p className={styles.thankYou}>Thanks! Your message has been sent to The Support.</p>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Contact Support</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    required
                />
                <button type="submit" className={styles.button}>
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default Support;
