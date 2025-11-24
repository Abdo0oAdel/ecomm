import { useState, useEffect } from "react";
import { getShippingById } from "../services/shipping";

export const useShipping = (id) => {
  const [shippingDetails, setShippingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getShippingById(id)
      .then((data) => {
        setShippingDetails(data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setShippingDetails(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { shippingDetails, loading, error };
};

export default useShipping;
