import React from "react";
import AdminSideBar from "../../../components/AdminSideBar/AdminSideBar";

const ProductManagement = () => {
    return (
        <div className={"adminLayout"}>
            <AdminSideBar />
            <main className={"adminMain"}>
                <p>this is ProductManagement</p>
            </main>
        </div>
    );
}

export default ProductManagement;