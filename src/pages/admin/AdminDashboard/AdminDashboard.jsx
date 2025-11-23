
import React from "react";
import styles from "./AdminDashboard.module.css";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";


const AdminDashboard = () => {
    return (
        <div className={styles.adminLayout}>
            <AdminSidebar />
            <main className={styles.adminMain}>
                <p>this is AdminDashboard</p>
            </main>
        </div>
    );
}

export default AdminDashboard;