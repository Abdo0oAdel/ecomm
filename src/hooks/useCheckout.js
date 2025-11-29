import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkoutActions } from "../store/CheckOut/slice";
import { getCheckout } from "../services/checkout";

export const useCheckout = () => {
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCheckout = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCheckout();
        setCheckout(data);
        dispatch(checkoutActions.setCheckoutItems(data.items || []));
        // Optionally set other checkout fields if your API returns them
      } catch (err) {
        setError(err.message || "Failed to fetch checkout");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckout();
  }, [dispatch]);

  return { checkout, loading, error };
};

export default useCheckout;
