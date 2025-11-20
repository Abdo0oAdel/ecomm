
import React from "react";
import styles from "./AdminDashboard.module.css";
import AdminSideBar from "../../../components/AdminSideBar/AdminSideBar";


const AdminDashboard = () => {
    return (
        <div className={styles.adminLayout}>
            <AdminSideBar />
            <main className={styles.adminMain}>
                <p>this is AdminDashboard</p>
            </main>
        </div>
    );
}

export default AdminDashboard;