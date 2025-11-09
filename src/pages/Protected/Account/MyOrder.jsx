import React, { useEffect, useState } from "react";
import styles from "./Account.module.css";

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
        const token = localStorage.getItem("token");
        const res = await fetch(
          `/api/user/orders?page=${page}&limit=${pageSize}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `${res.status} ${res.statusText}`);
        }
        const json = await res.json();
        if (!cancelled) {
          // expect server to return { orders: [...], total: number } or just [...]
          const payload = Array.isArray(json)
            ? { orders: json, total: json.length }
            : json;
          setOrders(payload.orders || payload);
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
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE", // adjust to your API (PATCH/PUT with { status: 'cancelled' } etc.)
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `${res.status} ${res.statusText}`);
      }
      // optimistic UI: remove or mark cancelled
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o))
      );
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
    <div style={{ padding: 16 }}>
      <h2>My Orders</h2>

      {loading && <div>Loading orders…</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {!loading && !error && orders.length === 0 && <div>No orders found.</div>}

      {!loading && orders.length > 0 && (
        <>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                      padding: 8,
                    }}
                  >
                    Order #
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                      padding: 8,
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                      padding: 8,
                    }}
                  >
                    Items
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                      padding: 8,
                    }}
                  >
                    Total
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                      padding: 8,
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                      padding: 8,
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                  >
                    <td style={{ padding: 8 }}>{order.number || order.id}</td>
                    <td style={{ padding: 8 }}>
                      {formatDate(order.createdAt || order.date)}
                    </td>
                    <td style={{ padding: 8 }}>
                      {(order.items && order.items.length) ||
                        order.itemCount ||
                        0}
                    </td>
                    <td style={{ padding: 8 }}>
                      {order.total ? `$${order.total.toFixed(2)}` : order.total}
                    </td>
                    <td style={{ padding: 8 }}>{order.status || "unknown"}</td>
                    <td style={{ padding: 8 }}>
                      <button
                        onClick={() => handleView(order)}
                        style={{ marginRight: 8 }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleCancel(order.id)}
                        disabled={
                          processingId === order.id ||
                          order.status === "cancelled"
                        }
                        style={{
                          opacity: order.status === "cancelled" ? 0.6 : 1,
                        }}
                      >
                        {processingId === order.id
                          ? "Cancelling…"
                          : order.status === "cancelled"
                          ? "Cancelled"
                          : "Cancel"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span style={{ alignSelf: "center" }}>Page {page}</span>
            <button onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </>
      )}

      {selectedOrder && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
            zIndex: 9999,
          }}
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 20,
              maxWidth: 700,
              width: "90%",
              borderRadius: 6,
            }}
          >
            <h3>Order {selectedOrder.number || selectedOrder.id}</h3>
            <div style={{ marginBottom: 8 }}>
              Placed:{" "}
              {formatDate(selectedOrder.createdAt || selectedOrder.date)}
            </div>
            <div style={{ marginBottom: 8 }}>
              Status: {selectedOrder.status}
            </div>
            <div style={{ marginBottom: 8 }}>
              Total:{" "}
              {selectedOrder.total
                ? `$${selectedOrder.total}`
                : selectedOrder.total}
            </div>

            <h4>Items</h4>
            <ul>
              {(selectedOrder.items || []).map((it, i) => (
                <li key={i}>
                  {it.name} × {it.quantity || it.qty || 1}{" "}
                  {it.price ? `— $${it.price}` : ""}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button onClick={closeModal}>Close</button>
              {selectedOrder.status !== "cancelled" && (
                <button onClick={() => handleCancel(selectedOrder.id)}>
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
