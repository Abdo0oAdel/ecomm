import React, { useEffect, useState } from "react";
import styles from "./MyOrder.module.css";
import { axiosWithAuth } from "../../../utils/helpers";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // TODO: Uncomment when backend implements /api/orders endpoint
        // const response = await axiosWithAuth.get(
        //   `api/orders?page=${page}&limit=${pageSize}`
        // );
        // if (!cancelled) {
        //   const payload = response.data;
        //   setOrders(payload.data || payload);
        // }

        // Temporarily use empty data
        if (!cancelled) {
          setOrders([]);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load orders");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [page]);

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  }

  async function handleCancel(orderId) {
    if (!confirm("Cancel this order? This action may be irreversible.")) return;
    setProcessingId(orderId);
    try {
      // TODO: Uncomment when backend implements DELETE /api/orders/{id} endpoint
      // await axiosWithAuth.delete(`api/orders/${orderId}`);
      alert("Order cancellation endpoint not yet implemented on backend.");
    } catch (err) {
      alert("Failed to cancel order: " + (err.message || err));
    } finally {
      setProcessingId(null);
    }
  }

  function handleView(order) {
    setSelectedOrder(order);
  }

  function closeModal() {
    setSelectedOrder(null);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Orders</h2>

      {loading && <div className={styles.loadingMessage}>Loading orders…</div>}
      {error && <div className={styles.errorMessage}>Error: {error}</div>}

      {!loading && !error && orders.length === 0 && (
        <div className={styles.emptyMessage}>No orders found.</div>
      )}

      {!loading && orders.length > 0 && (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableHeadCell}>Order #</th>
                  <th className={styles.tableHeadCell}>Date</th>
                  <th className={styles.tableHeadCell}>Items</th>
                  <th className={styles.tableHeadCell}>Total</th>
                  <th className={styles.tableHeadCell}>Status</th>
                  <th className={styles.tableHeadCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      {order.number || order.id}
                    </td>
                    <td className={styles.tableCell}>
                      {formatDate(order.createdAt || order.date)}
                    </td>
                    <td className={styles.tableCell}>
                      {(order.items && order.items.length) ||
                        order.itemCount ||
                        0}
                    </td>
                    <td className={styles.tableCell}>
                      {order.total ? `$${order.total.toFixed(2)}` : order.total}
                    </td>
                    <td className={styles.tableCell}>
                      <span
                        className={`${styles.statusBadge} ${
                          order.status === "completed"
                            ? styles.statusCompleted
                            : order.status === "pending"
                            ? styles.statusPending
                            : styles.statusCancelled
                        }`}
                      >
                        {order.status || "unknown"}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.actionButtons}>
                        <button
                          onClick={() => handleView(order)}
                          className={styles.button}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleCancel(order.id)}
                          disabled={
                            processingId === order.id ||
                            order.status === "cancelled"
                          }
                          className={`${styles.button} ${styles.buttonCancel}`}
                        >
                          {processingId === order.id
                            ? "Cancelling…"
                            : order.status === "cancelled"
                            ? "Cancelled"
                            : "Cancel"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={styles.paginationButton}
            >
              Prev
            </button>
            <span className={styles.paginationInfo}>Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className={styles.paginationButton}
            >
              Next
            </button>
          </div>
        </>
      )}

      {selectedOrder && (
        <div
          role="dialog"
          aria-modal="true"
          className={styles.modalOverlay}
          onClick={closeModal}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.modalTitle}>
              Order {selectedOrder.number || selectedOrder.id}
            </h3>
            <div className={styles.modalInfo}>
              <span className={styles.modalLabel}>Placed:</span>{" "}
              {formatDate(selectedOrder.createdAt || selectedOrder.date)}
            </div>
            <div className={styles.modalInfo}>
              <span className={styles.modalLabel}>Status:</span>{" "}
              {selectedOrder.status}
            </div>
            <div className={styles.modalInfo}>
              <span className={styles.modalLabel}>Total:</span>{" "}
              {selectedOrder.total
                ? `$${selectedOrder.total}`
                : selectedOrder.total}
            </div>

            <h4 className={styles.modalLabel} style={{ marginTop: 16 }}>
              Items
            </h4>
            <ul className={styles.modalItemsList}>
              {(selectedOrder.items || []).map((it, i) => (
                <li key={i} className={styles.modalListItem}>
                  {it.name} × {it.quantity || it.qty || 1}{" "}
                  {it.price ? `— $${it.price}` : ""}
                </li>
              ))}
            </ul>

            <div className={styles.modalActions}>
              <button onClick={closeModal} className={styles.button}>
                Close
              </button>
              {selectedOrder.status !== "cancelled" && (
                <button
                  onClick={() => handleCancel(selectedOrder.id)}
                  className={`${styles.button} ${styles.buttonCancel}`}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
