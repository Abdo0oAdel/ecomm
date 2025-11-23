import React, { useEffect, useState } from "react";
import myOrderStyles from "./MyOrder.module.css"; // Import styles from MyOrder
import { ordersAPI } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";

const Cancellation = () => {
  const { user } = useAuth();
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function loadCancelledOrders() {
      if (!user?.userId) {
        setLoading(false);
        setError("User not found. Please log in.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await ordersAPI.getCancelledOrders(user.userId);
        if (!cancelled) {
          const payload = Array.isArray(response.data)
            ? response.data
            : response.data?.data || response.data;
          
          if (Array.isArray(payload)) {
            const filteredOrders = payload.filter(
              (order) =>
                order.orderStatus === "cancelled" ||
                order.orderStatus === "Cancelled"
            );
            setCancelledOrders(filteredOrders);
          } else {
            setCancelledOrders([]);
          }
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
  }, [user]);

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  }

  return (
    <div className={myOrderStyles.container}>
      <h2 className={myOrderStyles.title}>Cancelled Orders</h2>

      {loading && (
        <div className={myOrderStyles.loadingMessage}>Loading cancelled orders…</div>
      )}
      {error && <div className={myOrderStyles.errorMessage}>Error: {error}</div>}

      {!loading && !error && cancelledOrders.length === 0 && (
        <p className={myOrderStyles.emptyMessage}>No cancelled orders.</p>
      )}

      {!loading && cancelledOrders.length > 0 && (
        <div className={myOrderStyles.tableWrapper}>
          <table className={myOrderStyles.table}>
            <thead className={myOrderStyles.tableHead}>
              <tr>
                <th className={myOrderStyles.tableHeadCell}>Order #</th>
                <th className={myOrderStyles.tableHeadCell}>Date</th>
                <th className={myOrderStyles.tableHeadCell}>User</th>
                <th className={myOrderStyles.tableHeadCell}>Total</th>
                <th className={myOrderStyles.tableHeadCell}>Status</th>
              </tr>
            </thead>
            <tbody>
              {cancelledOrders.map((order) => (
                <tr key={order.orderID} className={myOrderStyles.tableRow}>
                  <td className={myOrderStyles.tableCell}>
                    {order.orderNo || order.orderID}
                  </td>
                  <td className={myOrderStyles.tableCell}>
                    {formatDate(order.orderDate)}
                  </td>
                  <td className={myOrderStyles.tableCell}>
                    {order.userName || "N/A"}
                  </td>
                  <td className={myOrderStyles.tableCell}>
                    {order.totalAmount
                      ? `$${order.totalAmount.toFixed(2)}`
                      : "N/A"}
                  </td>
                  <td className={myOrderStyles.tableCell}>
                    <span
                      className={`${myOrderStyles.statusBadge} ${myOrderStyles.statusCancelled}`}
                    >
                      {order.orderStatus || "Cancelled"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cancellation;
