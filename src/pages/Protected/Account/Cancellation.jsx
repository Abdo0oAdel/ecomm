import React, { useEffect, useState } from "react";
import styles from "./Cancellation.module.css";
import { ordersAPI } from "../../../utils/api";

const Cancellation = () => {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function loadCancelledOrders() {
      setLoading(true);
      setError(null);
      try {
        const response = await ordersAPI.getCancelledOrders();
        if (!cancelled) {
          // Handle response - could be array or object with data property
          const payload = Array.isArray(response.data)
            ? response.data
            : response.data?.data || response.data;
          console.log("🔍 Cancelled Orders API Response:", {
            response,
            payload,
            firstOrder: payload[0],
          });
          setCancelledOrders(Array.isArray(payload) ? payload : []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error loading cancelled orders:", err);
          setError(err.message || "Failed to load cancelled orders");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCancelledOrders();
    return () => {
      cancelled = true;
    };
  }, []);

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cancelled Orders</h2>

      {loading && (
        <div className={styles.loadingMessage}>Loading cancelled orders…</div>
      )}
      {error && <div className={styles.errorMessage}>Error: {error}</div>}

      {!loading && !error && cancelledOrders.length === 0 && (
        <p className={styles.emptyMessage}>No cancelled orders.</p>
      )}

      {!loading && cancelledOrders.length > 0 && (
        <div className={styles.ordersGrid}>
          {cancelledOrders.map((order) => (
            <div key={order.orderID} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div>
                  <div className={styles.orderNumber}>
                    Order #{order.orderNo || order.orderID}
                  </div>
                  <div className={styles.orderDate}>
                    {formatDate(order.orderDate)}
                  </div>
                </div>
                <div className={styles.statusBadge}>
                  {order.orderStatus || "Cancelled"}
                </div>
              </div>

              <div className={styles.orderDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>User:</span>
                  <span>{order.userName || "N/A"}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Total:</span>
                  <span>
                    {order.totalAmount
                      ? `$${order.totalAmount.toFixed(2)}`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cancellation;
