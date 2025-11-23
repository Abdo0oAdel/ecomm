import React from "react";
import styles from "./ProductList.module.css";

const ProductList = ({ products, onEdit, onDelete }) => {
  const productArray = Array.isArray(products) ? products : [];
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Stock</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Seller</th>
            <th className={styles.th}>Image</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productArray.map((product) => (
            <tr key={product.productID}>
              <td className={styles.td}>{product.productID}</td>
              <td className={styles.td}>{product.productName}</td>
              <td className={styles.td}>{product.description}</td>
              <td className={styles.td}>{product.price}</td>
              <td className={styles.td}>{product.stock}</td>
              <td className={styles.td}>{product.categoryName}</td>
              <td className={styles.td}>{product.sellerName}</td>
              <td className={styles.td}><img src={product.imageURL} alt={product.productName} style={{width:40, height:40, objectFit:'cover', borderRadius:'4px'}} /></td>
              <td className={styles.td}>
                <div className={styles.actions}>
                  <button className={styles.editBtn} onClick={() => onEdit(product)}>
                    Edit
                  </button>
                  <button className={styles.deleteBtn} onClick={() => onDelete(product)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
