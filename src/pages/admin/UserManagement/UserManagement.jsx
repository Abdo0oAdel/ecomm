import React from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import useUsers from "../../../hooks/useUsers";
import Swal from "sweetalert2";
import { useState } from "react";
import styles from "./UserManagement.module.css";

const UserForm = ({ initialData = {}, onSubmit, onCancel, loading }) => {
    const [form, setForm] = useState({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        role: initialData.role || initialData.userRole || "client",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.userForm}>
            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required className={styles.input} />
            <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required className={styles.input} />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required type="email" className={styles.input} />
            <select name="role" value={form.role} onChange={handleChange} required className={styles.input}>
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="client">Client</option>
            </select>
            {!initialData.id && (
                <input name="password" value={form.password} onChange={handleChange} placeholder="Password" required type="password" className={styles.input} />
            )}
            <div className={styles.formActions}>
                <button type="submit" disabled={loading} className={styles.saveBtn}>Save</button>
                <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
            </div>
        </form>
    );
};

const UserManagement = () => {
    const { users, loading, error, add, update, remove, selectUser, selectedUser, clearUser } = useUsers();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleAdd = () => {
        setEditingUser(null);
        setModalOpen(true);
        clearUser();
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setModalOpen(true);
        selectUser(user);
    };

    const handleDelete = async (user) => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: `Delete user '${user.email}'?`,
            showCancelButton: true,
            confirmButtonText: "Yes, delete!",
            cancelButtonText: "Cancel",
        });
        if (!result.isConfirmed) return;
        await remove(user.id || user.userId);
        Swal.fire({ icon: "success", title: "Deleted!", text: "User deleted." });
    };

    const handleFormSubmit = async (form) => {
        if (editingUser) {
            await update(editingUser.id || editingUser.userId, form);
        } else {
            await add(form);
        }
        setModalOpen(false);
        setEditingUser(null);
        clearUser();
    };

    return (
        <div className={styles.adminLayout}>
            <AdminSidebar />
            <main className={styles.adminMain}>
                <div className={styles.header}>
                    <h2 className={styles.title}>User Management</h2>
                    <button className={styles.addBtn} onClick={handleAdd}>Add User</button>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableHeader}>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Email</th>
                            <th className={styles.th}>Role</th>
                            <th className={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className={styles.tdCenter}>Loading...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={5} className={styles.tdCenter}>No users found.</td></tr>
                        ) : (
                            users.map((user, idx) => (
                                <tr key={user.userID || user.id || idx}>
                                    <td className={styles.td}>{user.userID || user.id}</td>
                                    <td className={styles.td}>{user.userName || user.firstName || ""}</td>
                                    <td className={styles.td}>{user.userEmail || user.email}</td>
                                    <td className={styles.td}>{user.userRole || user.role}</td>
                                    <td className={styles.td}>
                                        <div className={styles.actions}>
                                            <button className={styles.editBtn} onClick={() => handleEdit(user)}>Edit</button>
                                            <button className={styles.deleteBtn} onClick={() => handleDelete(user)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {modalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h3 className={styles.modalTitle}>{editingUser ? "Edit User" : "Add User"}</h3>
                            <UserForm
                                initialData={editingUser || {}}
                                onSubmit={handleFormSubmit}
                                onCancel={() => { setModalOpen(false); setEditingUser(null); clearUser(); }}
                                loading={loading}
                            />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default UserManagement;