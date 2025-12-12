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
      .then((response) => {
        const prodData = response.data?.data || response.data || response;

        const imageUrls = [];
        if (prodData.images && Array.isArray(prodData.images)) {
          prodData.images.forEach(img => {
            if (img.url) imageUrls.push(img.url);
          });
        }
        if (imageUrls.length === 0 && prodData.imageURL) {
          imageUrls.push(prodData.imageURL);
        }

        setProduct({
          id: prodData.productID,
          name: prodData.productName,
          productName: prodData.productName,
          description: prodData.description,
          price: prodData.price,
          currentPrice: prodData.price,
          originalPrice: prodData.price,
          imageURL: imageUrls[0] || prodData.imageURL,
          images: imageUrls,
          category: prodData.categoryName,
          categoryId: prodData.categoryID,
          isInStock: prodData.isInStock !== false,
          stock: prodData.stock,
          rating: prodData.averageRating || 0,
          reviews: prodData.totalReviews || 0,
          colors: prodData.colors || [],
          sizes: prodData.sizes || [],
          discount: prodData.discount || 0,
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
