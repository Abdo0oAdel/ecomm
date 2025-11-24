import { useState, useEffect } from "react";
import { getProductById } from "../services/products";

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductById(id)
      .then((data) => {
        // Map API response to ensure isInStock and stock are present
        setProduct({
          ...data,
          isInStock: data.isInStock,
          stock: data.stock,
        });
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
};

export default useProduct;
