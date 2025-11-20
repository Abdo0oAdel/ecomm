import React, { useEffect, useState } from "react";
import styles from "./Reviews.module.css";
import { reviewsAPI } from "../../../utils/api";
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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reduxUser = useSelector((s) => s.auth?.user);

  useEffect(() => {
    if (!reduxUser) return;

    const productId = reduxUser.productID || reduxUser.productId;
    if (!productId) {
      setReviews([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function loadReviews() {
      setLoading(true);
      setError(null);
      try {
        const response = await reviewsAPI.getAllReviews(reduxUser.productID);
        // Log the raw response
        console.log("API response:", response);

        // Log the actual data array
        console.log("Reviews data:", response.data);

        if (!cancelled) {
          setReviews(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load reviews");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadReviews();
    return () => {
      cancelled = true;
    };
  }, [reduxUser?.productID]);

  const handleDelete = async (id) => {
    try {
      await reviewsAPI.deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.reviewID !== id));
      alert("Review deleted successfully");
    } catch (err) {
      alert("Failed to delete review: " + (err.message || err));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Reviews</h1>

      {loading && <div className={styles.emptyMessage}>Loading reviews…</div>}
      {error && (
        <div style={{ color: "#c33", padding: "20px" }}>Error: {error}</div>
      )}

      {!loading && !error && reviews.length === 0 ? (
        <p className={styles.emptyMessage}>You haven't left any reviews yet.</p>
      ) : (
        !loading &&
        !error && (
          <ul className={styles.reviewsList}>
            {reviews.map((r) => (
              <li key={r.reviewID} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div>
                    <div className={styles.productName}>{r.productID}</div>
                    <div className={styles.meta}>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <StarRating value={r.rating} />
                  </div>
                </div>

                <p className={styles.reviewText}>{r.comment}</p>

                <div>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDelete(r.reviewID)}
                  >
                    Delete review
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default Reviews;
