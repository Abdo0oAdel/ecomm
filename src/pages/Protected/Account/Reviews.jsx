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
    let cancelled = false;
    async function loadReviews() {
      setLoading(true);
      setError(null);
      try {
        // get userId from Redux
        const userIdFromRedux = reduxUser?.userId || reduxUser?.id || null;
        const response = await reviewsAPI.getAllReviews(userIdFromRedux);
        if (!cancelled) {
          // Handle response - could be array or object with data property
          const payload = Array.isArray(response.data)
            ? response.data
            : response.data?.data || response.data;
          setReviews(Array.isArray(payload) ? payload : []);
        }
      } catch (err) {
        if (!cancelled) {
          // If backend returns 400/404/405 it means reviews endpoint
          // is not implemented — treat as "no reviews" instead of showing
          // a hard error in the UI.
          if (
            err?.response?.status === 405 ||
            err?.response?.status === 404 ||
            err?.response?.status === 400
          ) {
            // Treat as no reviews available
            setReviews([]);
            setError(null);
          } else {
            setError(err.message || "Failed to load reviews");
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadReviews();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await reviewsAPI.deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
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
              <li key={r.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div>
                    <div className={styles.productName}>{r.product}</div>
                    <div className={styles.meta}>{r.date}</div>
                  </div>
                  <div>
                    <StarRating value={r.rating} />
                  </div>
                </div>

                <p className={styles.reviewText}>{r.text}</p>

                <div>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDelete(r.id)}
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
