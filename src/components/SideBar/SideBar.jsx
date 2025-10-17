import React from 'react';
import styles from './SideBar.module.css';

const SideBar = () => {
  const categories = [
    { name: "Woman's Fashion", hasSubmenu: true },
    { name: "Men's Fashion", hasSubmenu: true },
    { name: "Electronics", hasSubmenu: false },
    { name: "Home & Lifestyle", hasSubmenu: false },
    { name: "Medicine", hasSubmenu: false },
    { name: "Sports & Outdoor", hasSubmenu: false },
    { name: "Baby's & Toys", hasSubmenu: false },
    { name: "Groceries & Pets", hasSubmenu: false },
    { name: "Health & Beauty", hasSubmenu: false }
  ];

  return (
    <div className={styles.sidebar}>
      <ul className={styles.categoryList}>
        {categories.map((category, index) => (
          <li key={index} className={styles.categoryItem}>
            <a href={`/category/${category.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
              {category.name}
              {category.hasSubmenu && <span className={styles.arrow}>›</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
