import React, { useEffect, useState } from "react";
import styles from "./Reviews.module.css";
import { reviewsAPI } from "../../../utils/api";
import { getProductById } from "../../../services/products";
import { useSelector } from "react-redux";

const StarRating = ({ value = 0 }) => {
  return (
    <div className={styles.rating} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < value ? styles.filledStar : styles.emptyStar}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Reviews = () => {
  const user = useSelector((state) => state.user?.user || state.user || state.auth?.user || null);// ⬅ GET LOGGED USER
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function loadReviews() {
      setLoading(true);
      setError(null);
      try {
        const res = await reviewsAPI.getUserReviews();
        const reviewsArr = Array.isArray(res.data) ? res.data : [res.data];
        // Fetch product info for each review
        const reviewsWithProduct = await Promise.all(
          reviewsArr.map(async (review) => {
            try {
              const productRes = await getProductById(review.productID);
              const product = productRes.data || productRes;
              return {
                ...review,
                productInfo: {
                  name: product.productName || product.name || "N/A",
                  price: product.price,
                  image: product.imageURL,
                  totalReviews: product.totalReviews || product.reviews?.length || 0,
                },
              };
            } catch (e) {
              return { ...review, productInfo: null };
            }
          })
        );
        if (!cancelled) {
          setReviews(reviewsWithProduct);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data || err.message || "Failed to load reviews");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadReviews();
    return () => (cancelled = true);
  }, []);

  const handleDelete = async (id) => {
    try {
      await reviewsAPI.deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.reviewID !== id));
      alert("Review deleted");
    } catch (err) {
      alert("Failed to delete review: " + (err.message || err));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Reviews</h1>

      {loading && <div className={styles.emptyMessage}>Loading reviews…</div>}

      {error && (
        <div style={{ color: "#c33", padding: "20px" }}>
          Error: {String(error)}
        </div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <p className={styles.emptyMessage}>You haven't left any reviews yet.</p>
      )}

      {!loading && !error && reviews.length > 0 && (
        <ul className={styles.reviewsList}>
          {reviews.map((r) => (
            <li key={r.reviewID} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div>
                  <div className={styles.productName}>
                    {r.productInfo?.image && (
                      <img src={r.productInfo.image} alt={r.productInfo.name} style={{width:40,height:40,objectFit:'cover',marginRight:8,borderRadius:4}} />
                    )}
                    <strong>{r.productInfo?.name || `Product ID: ${r.productID}`}</strong>
                  </div>
                  <div className={styles.meta}>
                    {new Date(r.createdAt).toLocaleDateString()} | Price: {r.productInfo?.price ?? 'N/A'} | Reviews: {r.productInfo?.totalReviews ?? 'N/A'}
                  </div>
                </div>
                <StarRating value={r.rating} />
              </div>
              <p className={styles.reviewText}>{r.comment}</p>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => handleDelete(r.reviewID)}
              >
                Delete review
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
