import { useState, useEffect } from "react";
import categoriesService from "../services/categories";
import productsMock from "../data/products";

// Simple hook to fetch categories and expose a fallback when API fails
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await categoriesService.getCategories();
        if (mounted) {
          // map API shape to a common shape used in UI
          const mapped = Array.isArray(data)
            ? data.map((c) => ({
                id: c.categoryID ?? c.id,
                name: c.categoryName ?? c.name,
                description: c.description,
                iconUrl: c.iconUrl,
                productCount: c.productCount ?? 0,
              }))
            : [];
          setCategories(mapped);
          setError(null);
        }
      } catch (err) {
        // fallback: derive categories from local products mock
        if (mounted) {
          const fallback = Array.from(
            new Map(
              productsMock.map((p) => [p.category, { id: p.category, name: p.category }])
            ).values()
          );
          setCategories(fallback);
          setError(err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { categories, loading, error };
};

export default useCategories;
