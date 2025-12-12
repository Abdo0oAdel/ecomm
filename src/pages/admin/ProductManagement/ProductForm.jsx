import React, { useState } from "react";
import styles from "./ProductForm.module.css";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../../hooks/useCategories";

const ProductForm = ({ initialData = {}, onSubmit, onCancel, loading }) => {
  const { t } = useTranslation();
  const { categories, loading: categoriesLoading } = useCategories();
  // Ensure initialData is always an object
  const safeInitialData = initialData || {};
  const [form, setForm] = useState({
    name: safeInitialData.name || safeInitialData.productName || "",
    description: safeInitialData.description || "",
    price: safeInitialData.price || "",
    categoryId: safeInitialData.categoryId || safeInitialData.categoryID || "",
    stock: safeInitialData.stock || "",
    imageUrl: safeInitialData.imageUrl || safeInitialData.imageURL || "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, images: Array.from(files) }));
    } else {
      setForm((prev) => ({ ...prev, images: [] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <table className={styles.formTable}>
        <tbody>
          <tr>
            <td className={styles.label}>Product Name</td>
            <td><input name="name" value={form.name} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td className={styles.label}>Description</td>
            <td><textarea name="description" value={form.description} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td className={styles.label}>Price</td>
            <td><input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td className={styles.label}>Stock</td>
            <td><input name="stock" type="number" value={form.stock} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td className={styles.label}>Category</td>
            <td>
              <select name="categoryId" value={form.categoryId} onChange={handleChange} required disabled={categoriesLoading}>
                <option value="">{categoriesLoading ? "Loading categories..." : "Select a category"}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td className={styles.label}>Image URL (temporary)</td>
            <td><input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Temporary URL, will be updated after upload" /></td>
          </tr>
          <tr>
            <td className={styles.label}>Product Images</td>
            <td><input name="images" type="file" multiple accept="image/*" onChange={handleImageChange} /></td>
          </tr>
        </tbody>
      </table>
      <div className={styles.actions}>
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
