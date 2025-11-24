import React, { useEffect, useState } from "react";
import styles from "./MyOrder.module.css";
import { ordersAPI } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user?.userId) {
        setLoading(false);
        setError("User not found. Please log in.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await ordersAPI.getAllOrders(
          user.userId,
          page,
          pageSize
        );
        if (!cancelled) {
          // Handle response - could be array or object with data property
          const payload = Array.isArray(response.data)
            ? response.data
            : response.data?.data || response.data;
          const activeOrders = Array.isArray(payload)
            ? payload.filter(
                (order) => order.orderStatus?.toLowerCase() !== "cancelled"
              )
            : [];
          setOrders(activeOrders);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load orders");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [page, user]);
  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  }

  async function handleCancel(orderId) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });
    if (!result.isConfirmed) {
      return;
    }
    setProcessingId(orderId);
    try {
      await ordersAPI.cancelOrder(orderId);
      // Optimistic UI: remove the cancelled order from the list
      setOrders((prev) => prev.filter((o) => o.orderID !== orderId));
      Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
    } catch (err) {
      Swal.fire(
        "Error!",
        "Failed to cancel order: " + (err.message || err),
        "error"
      );
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

  const handleViewShipping = (orderId) => {
    navigate(`/shipping-map/${orderId}`);
  };

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
                  <th className={styles.tableHeadCell}>Order</th>
                  <th className={styles.tableHeadCell}>Date</th>
                  <th className={styles.tableHeadCell}>Items</th>
                  <th className={styles.tableHeadCell}>Total</th>
                  <th className={styles.tableHeadCell}>Status</th>
                  <th className={styles.tableHeadCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderID} className={styles.tableRow}>
                    <td className={styles.tableCell}>{order.orderID}</td>
                    <td className={styles.tableCell}>
                      {formatDate(order.orderDate)}
                    </td>
                    <td className={styles.tableCell}>{order.itemCount || 0}</td>
                    <td className={styles.tableCell}>
                      {order.totalAmount
                        ? `$${order.totalAmount.toFixed(2)}`
                        : "N/A"}
                    </td>
                    <td className={styles.tableCell}>
                      <span
                        className={`${styles.statusBadge} ${
                          order.orderStatus === "completed"
                            ? styles.statusCompleted
                            : order.orderStatus === "pending" ||
                              order.orderStatus === "Pending"
                            ? styles.statusPending
                            : styles.statusCancelled
                        }`}
                      >
                        {order.orderStatus || "unknown"}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.actionButtons}>
                        <button
                          onClick={() => handleViewShipping(order.orderID)}
                          className={styles.button}
                        >
                          View Shipping
                        </button>
                        <button
                          onClick={() => handleCancel(order.orderID)}
                          disabled={
                            processingId === order.orderID ||
                            order.orderStatus === "cancelled" ||
                            order.orderStatus === "Cancelled"
                          }
                          className={`${styles.button} ${styles.buttonCancel}`}
                        >
                          {processingId === order.orderID
                            ? "Cancelling…"
                            : order.orderStatus === "cancelled" ||
                              order.orderStatus === "Cancelled"
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
              Order {selectedOrder.orderNo || selectedOrder.orderID}
            </h3>
            <div className={styles.modalInfo}>
              <span className={styles.modalLabel}>Placed:</span>{" "}
              {formatDate(selectedOrder.orderDate)}
            </div>
            <div className={styles.modalInfo}>
              <span className={styles.modalLabel}>Status:</span>{" "}
              {selectedOrder.orderStatus}
            </div>
            <div className={styles.modalInfo}>
              <span className={styles.modalLabel}>Total:</span>{" "}
              {selectedOrder.totalAmount
                ? `$${selectedOrder.totalAmount}`
                : "N/A"}
            </div>

            <h4 className={styles.modalLabel} style={{ marginTop: 16 }}>
              Order Details
            </h4>
            <ul className={styles.modalItemsList}>
              <li className={styles.modalListItem}>
                <strong>Order No:</strong> {selectedOrder.orderID}
              </li>
              <li className={styles.modalListItem}>
                <strong>User:</strong> {selectedOrder.userName}
              </li>
              <li className={styles.modalListItem}>
                <strong>Items:</strong> {selectedOrder.itemCount || 0}
              </li>
            </ul>

            <div className={styles.modalActions}>
              <button onClick={closeModal} className={styles.button}>
                Close
              </button>
              {selectedOrder.orderStatus !== "cancelled" &&
                selectedOrder.orderStatus !== "Cancelled" && (
                  <button
                    onClick={() => handleCancel(selectedOrder.orderID)}
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
