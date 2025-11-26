import React from "react";
import useProducts from "../../../hooks/useProducts";
import ProductCard from "../../../components/ProductCard/ProductCard";
import styles from "./Product.module.css";
import { useWishlist } from "../../../hooks/useWishlist";
import useCart from "../../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Products = () => {
		const { products, loading, error } = useProducts();
	const { items: wishlist, toggleWishlist } = useWishlist();
	const { handleAddToCart } = useCart();
	const navigate = useNavigate();
		const location = useLocation();

		// read `search` query param and filter products client-side
		const params = new URLSearchParams(location.search);
		const searchQuery = (params.get("search") || "").trim().toLowerCase();
		const filteredProducts =
			searchQuery && Array.isArray(products)
				? products.filter((p) => {
						const name = (p.name || "").toLowerCase();
						const desc = (p.description || "").toLowerCase();
						const category = (p.category || "").toLowerCase();
						return (
							name.includes(searchQuery) ||
							desc.includes(searchQuery) ||
							category.includes(searchQuery)
						);
					})
				: products;

	return (
		<div className={styles.productsPage}>
			<h1 className={styles.title}>All Products</h1>
			{loading ? (
				<div className={styles.loading}>Loading products...</div>
			) : error ? (
				<div className={styles.error}>Error: {error.message || error.toString()}</div>
			) : (
				<div className={styles.productsGrid}>
					{filteredProducts.length === 0 ? (
						<div className={styles.noProducts}>No products found.</div>
					) : (
						filteredProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onToggleWishlist={() => toggleWishlist(product)}
								onAddToCart={() => handleAddToCart(product)}
								onViewDetails={() => navigate(`/products/${product.id}`, { state: { product } })}
								isWishlisted={wishlist.some(w => w.id === product.id)}
							/>
						))
					)}
				</div>
			)}
		</div>
	);
};

export default Products;
