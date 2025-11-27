import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./AdminSidebar.module.css";

const links = [
  { label: "Dashboard", path: "/admin/AdminDashboard" },
  { label: "User Management", path: "/admin/UserManagement" },
  { label: "Product Management", path: "/admin/ProductManagement" },
  { label: "Order Management", path: "/admin/OrderManagement" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          {links.map((link) => (
            <li
              key={link.path}
              className={location.pathname === link.path ? styles.active : ""}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
