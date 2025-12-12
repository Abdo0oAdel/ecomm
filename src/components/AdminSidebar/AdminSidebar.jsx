import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./AdminSidebar.module.css";

const allLinks = [
  { label: "Dashboard", path: "/admin/AdminDashboard", roles: ["admin"] },
  { label: "User Management", path: "/admin/UserManagement", roles: ["admin"] },
  { label: "Product Management", path: "/admin/ProductManagement", roles: ["admin", "seller"] },
  { label: "Order Management", path: "/admin/OrderManagement", roles: ["admin", "seller"] },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  
  // Get user role
  const roleClaimKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const userRole = user?.[roleClaimKey] || user?.role;
  
  // Filter links based on user role
  const links = allLinks.filter(link => 
    link.roles.some(role => role.toLowerCase() === userRole?.toLowerCase())
  );

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
