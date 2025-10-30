import { useState } from "react";
import styles from "./FAQ.module.css";

const faqs = [
    {
        question: "What payment methods do you accept?",
        answer: "We accept Visa, MasterCard, PayPal, and Apple Pay for secure and easy transactions.",
    },
    {
        question: "How long does shipping take?",
        answer: "Shipping usually takes 3–5 business days depending on your location.",
    },
    {
        question: "Can I return a product?",
        answer: "Yes! We offer a 30-day return policy for all unused items in their original packaging.",
    },
];

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Frequently Asked Questions</h2>
            <div className={styles.list}>
                {faqs.map((faq, index) => (
                    <div key={index} className={styles.item}>
                        <button
                            className={styles.question}
                            onClick={() => toggleFAQ(index)}>
                            <span>{faq.question}</span>
                            <span className={styles.icon}>{openIndex === index ? "−" : "+"}</span>
                        </button>
                        {openIndex === index && (<div className={styles.answer}>{faq.answer}</div>)}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FAQ;
