import React from "react";
import styles from "./Home.module.css";
import ProductCard from "../../../components/ProductCard/ProductCard";
import products from "../../../data/products";

const Home = () => {
  // Minimal, safe Home component used to resolve merge conflicts.
  const sample = products.slice(0, 6);
  return (
    <div className={styles.home}>
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1>Welcome to the Store</h1>
        </div>
      </section>

      <section className={styles.productsSection}>
        <div className={styles.container}>
          <h2>Featured Products</h2>
          <div className={styles.productsGrid}>
            {sample.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
    
