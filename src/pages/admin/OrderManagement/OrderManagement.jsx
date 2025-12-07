import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import OrderList from "./OrderList";
import OrderModal from "./OrderModal";
import OrderForm from "./OrderForm";
import styles from "./OrderManagement.module.css";
import Swal from "sweetalert2";
import { getOrders, updateOrder, deleteOrder } from "../../../services/orders";

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await getOrders();
            setOrders(res || []);
        } catch (err) {
            setError(err.message || "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleEdit = (order) => {
        setEditingOrder(order);
        setModalOpen(true);
    };

    const handleDelete = async (order) => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: `Delete order #${order.orderID}?`,
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        setLoading(true);
        try {
            await deleteOrder(order.orderID);
            await Swal.fire({
                icon: "success",
                title: "Deleted!",
                timer: 1200,
                showConfirmButton: false,
            });
            fetchOrders();
        } catch (err) {
            setError(err.message || "Failed to delete order");
            await Swal.fire({
                icon: "error",
                title: "Delete failed",
                text: err?.message || "Failed to delete order",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (form) => {
        setLoading(true);
        try {
            await updateOrder(editingOrder.orderID, form);
            setModalOpen(false);
            fetchOrders();
        } catch (err) {
            setError(err.message || "Failed to update order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen w-full">
            <div className="col-span-1 md:col-span-2 bg-white border-r border-gray-100 w-full h-full flex">
                <AdminSidebar />
            </div>
            <main className="col-span-1 md:col-span-10 px-4 py-6 md:px-8 md:py-10 w-full">
                <div className={styles.header}>
                    <h2 className={styles.title}>Order Management</h2>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <OrderList orders={orders} onEdit={handleEdit} onDelete={handleDelete} />
                <OrderModal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <OrderForm
                        initialData={editingOrder}
                        onSubmit={handleFormSubmit}
                        onCancel={() => setModalOpen(false)}
                        loading={loading}
                    />
                </OrderModal>
            </main>
        </div>
    );
};

export default OrderManagement;
