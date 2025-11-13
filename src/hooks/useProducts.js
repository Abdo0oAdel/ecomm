import { useState, useEffect } from "react";
import productsService from "../services/products";

const mapProduct = (p) => {
  let discount = 0;
  let originalPrice = p.price;
  if (p.price < 100 && p.price > 0) {
    discount = 10;
    originalPrice = Math.round((p.price * 100) / 90);
  }
  const rating = 4 + (p.productID % 2);
  const reviews = 10 + (p.productID % 100);
  return {
    id: p.productID,
    name: p.productName,
    image: p.imageURL,
    originalPrice,
    currentPrice: p.price,
    discount,
    rating,
    reviews,
    isNew: new Date(p.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    category: p.categoryName,
    isInStock: p.isInStock,
    description: p.description,
  };
};

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await productsService.getProducts();
      const arr = Array.isArray(data) ? data : data?.data || [];
      setProducts(arr.map(mapProduct));
      setError(null);
    } catch (err) {
      setError(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) load();
    return () => {
      mounted = false;
    };
  }, []);

  return { products, loading, error, refresh: load };
};

export default useProducts;
