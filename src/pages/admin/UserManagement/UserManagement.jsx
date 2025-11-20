import React from "react";
import AdminSideBar from "../../../components/AdminSideBar/AdminSideBar";

const UserManagement = () => {
    return (
        <div className={"adminLayout"}>
            <AdminSideBar />
            <main className={"adminMain"}>
                <p>this is UserManagement</p>
            </main>
        </div>
    );
}

export default UserManagement;