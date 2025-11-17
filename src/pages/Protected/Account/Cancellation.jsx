import React, { useEffect, useState } from "react";
import styles from "./Cancellation.module.css";
import { axiosWithAuth } from "../../../utils/helpers";

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
        // TODO: Uncomment when backend implements /api/orders?status=cancelled endpoint
        // const response = await axiosWithAuth.get(
        //   "api/orders?status=cancelled"
        // );
        // if (!cancelled) {
        //   const payload = response.data;
        //   setCancelledOrders(payload.data || payload);
        // }

        // Temporarily use empty data
        if (!cancelled) {
          setCancelledOrders([]);
        }
      } catch (err) {
        if (!cancelled)
          setError(err.message || "Failed to load cancelled orders");
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
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div>
                  <div className={styles.orderNumber}>
                    Order #{order.number || order.id}
                  </div>
                  <div className={styles.orderDate}>
                    {formatDate(order.createdAt || order.date)}
                  </div>
                </div>
                <div className={styles.statusBadge}>Cancelled</div>
              </div>

              <div className={styles.orderDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Items:</span>
                  <span>
                    {(order.items && order.items.length) ||
                      order.itemCount ||
                      0}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Total:</span>
                  <span>
                    {order.total ? `$${order.total.toFixed(2)}` : order.total}
                  </span>
                </div>
              </div>

              {order.items && order.items.length > 0 && (
                <div className={styles.itemsList}>
                  <div className={styles.itemsLabel}>Items:</div>
                  <ul className={styles.items}>
                    {order.items.map((item, idx) => (
                      <li key={idx} className={styles.item}>
                        {item.name} × {item.quantity || item.qty || 1}
                        {item.price && ` — $${item.price}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cancellation;
