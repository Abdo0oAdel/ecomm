import React from "react";
import useProducts from "../../../hooks/useProducts";
import ProductCard from "../../../components/ProductCard/ProductCard";
import styles from "./Product.module.css";
import { useWishlist } from "../../../hooks/useWishlist";
import { useCart } from "../../../hooks/useCart";
import { useNavigate } from "react-router-dom";

const Products = () => {
	const { products, loading, error } = useProducts();
	const { items: wishlist, toggleWishlist } = useWishlist();
	const { cart, addToCart } = useCart();
	const navigate = useNavigate();

	return (
		<div className={styles.productsPage}>
			<h1 className={styles.title}>All Products</h1>
			{loading ? (
				<div className={styles.loading}>Loading products...</div>
			) : error ? (
				<div className={styles.error}>Error: {error.message || error.toString()}</div>
			) : (
				<div className={styles.productsGrid}>
					{products.length === 0 ? (
						<div className={styles.noProducts}>No products found.</div>
					) : (
						products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onToggleWishlist={() => toggleWishlist(product)}
								onAddToCart={() => addToCart(product)}
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
