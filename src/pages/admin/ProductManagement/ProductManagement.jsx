
import React, { useEffect, useState } from "react";
import AdminSideBar from "../../../components/AdminSideBar/AdminSideBar";
import ProductList from "./ProductList";
import ProductModal from "./ProductModal";
import ProductForm from "./ProductForm";
import { getProducts, createProduct, updateProduct, deleteProduct, uploadProductImages } from "../../../services/products";
import styles from "./ProductManagement.module.css";
import Swal from "sweetalert2";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getProducts();
            setProducts(res?.data || []);
        } catch (err) {
            setError(err.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAdd = () => {
        setEditingProduct(null);
        setModalOpen(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setModalOpen(true);
    };

    const handleDelete = async (product) => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: `Are you sure you want to delete '${product.productName || product.name || "this product"}'?`,
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });
        if (!result.isConfirmed) return;
        setLoading(true);
        try {
            await deleteProduct(product.productID);
            await Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Product deleted successfully.",
                timer: 1200,
                showConfirmButton: false,
            });
            fetchProducts();
        } catch (err) {
            setError(err.message || "Failed to delete product");
            await Swal.fire({
                icon: "error",
                title: "Delete failed",
                text: err?.message || "Failed to delete product",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (form) => {
        setLoading(true);
        try {
            let productRes;
            let newProductId;
            if (editingProduct) {
                productRes = await updateProduct(editingProduct.productID, form);
                newProductId = editingProduct.productID;
            } else {
                productRes = await createProduct(form);
                // Try to get the product ID from the response
                newProductId = productRes.productID || productRes.id || productRes.data?.productID || productRes.data?.id;
            }
            if (form.images && form.images.length > 0 && newProductId) {
                await uploadProductImages(newProductId, form.images);
            }
            setModalOpen(false);
            fetchProducts();
        } catch (err) {
            setError(err.message || "Failed to save product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen w-full">
            {/* Sidebar: 2 columns on md+ */}
            <div className="col-span-1 md:col-span-2 bg-white border-r border-gray-100 w-full h-full flex">
                <AdminSideBar />
            </div>
            {/* Main content: 10 columns on md+ */}
            <main className="col-span-1 md:col-span-10 px-4 py-6 md:px-8 md:py-10 w-full">
                <div className={styles.header}>
                    <h2 className={styles.title}>Product Management</h2>
                    <button className={styles.addBtn} onClick={handleAdd}>Add Product</button>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
                <ProductModal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <ProductForm
                        initialData={editingProduct}
                        onSubmit={handleFormSubmit}
                        onCancel={() => setModalOpen(false)}
                        loading={loading}
                    />
                </ProductModal>
            </main>
        </div>
    );
};

export default ProductManagement;