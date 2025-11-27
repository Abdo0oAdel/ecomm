import React from "react";
import styles from "./OrderList.module.css";

const OrderList = ({ orders, onEdit, onDelete }) => {
    const orderArray = Array.isArray(orders) ? orders : [];

    if (!orderArray.length) {
        return <p className={styles.empty}>No orders found.</p>;
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? "-" : date.toLocaleDateString();
    };

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.th}>Order No</th>
                    <th className={styles.th}>Customer</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Total</th>
                    <th className={styles.th}>Date</th>
                    <th className={styles.th}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orderArray.map((order) => (
                    <tr key={order.orderID}>
                        <td className={styles.td}>{order.orderNo}</td>
                        <td className={styles.td}>{order.userName}</td>
                        <td className={styles.td}>{order.orderStatus}</td>
                        <td className={styles.td}>${Number(order.totalAmount).toFixed(2)}</td>
                        <td className={styles.td}>{formatDate(order.orderDate)}</td>
                        <td className={styles.td}>
                            <div className={styles.actions}>
                                <button
                                    className={styles.editBtn}
                                    onClick={() => onEdit(order)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => onDelete(order)}
                                >
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
