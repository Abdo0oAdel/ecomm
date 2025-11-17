import React, { useEffect, useState } from "react";
import styles from "./Reviews.module.css";
import { axiosWithAuth } from "../../../utils/helpers";

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

  useEffect(() => {
    let cancelled = false;
    async function loadReviews() {
      setLoading(true);
      setError(null);
      try {
        // TODO: Uncomment when backend implements /api/reviews endpoint
        // const response = await axiosWithAuth.get("api/reviews");
        // if (!cancelled) {
        //   setReviews(response.data.data || response.data);
        // }

        // Temporarily use empty data
        if (!cancelled) {
          setReviews([]);
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
  }, []);

  const handleDelete = async (id) => {
    try {
      // TODO: Uncomment when backend implements DELETE /api/reviews/{id} endpoint
      // await axiosWithAuth.delete(`api/reviews/${id}`);
      alert("Review deletion endpoint not yet implemented on backend.");
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
