import React, { useState } from "react";
import styles from "./Account.module.css";

const mockReviews = [
  {
    id: 1,
    product: "Classic White Tee",
    rating: 5,
    text: "Love this shirt — great fit and quality.",
    date: "2025-10-02",
  },
  {
    id: 2,
    product: "Running Shoes",
    rating: 4,
    text: "Very comfortable, slightly narrow for me.",
    date: "2025-09-15",
  },
  {
    id: 3,
    product: "Ceramic Mug",
    rating: 3,
    text: "Nice mug but arrived with a tiny chip.",
    date: "2025-07-28",
  },
];

const StarRating = ({ value = 0 }) => {
  return (
    <div className={styles.rating} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < value ? styles.filledStar : styles.emptyStar}
          style={{ marginRight: 4 }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState(mockReviews);

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>My Reviews</h1>

      {reviews.length === 0 ? (
        <p>You haven't left any reviews yet.</p>
      ) : (
        <ul
          className={styles.reviewsList}
          style={{ listStyle: "none", padding: 0 }}
        >
          {reviews.map((r) => (
            <li
              key={r.id}
              className={styles.reviewCard}
              style={{ marginBottom: 16 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{r.product}</strong>
                  <div
                    className={styles.meta}
                    style={{ color: "#666", fontSize: 12 }}
                  >
                    {r.date}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <StarRating value={r.rating} />
                </div>
              </div>

              <p style={{ marginTop: 8 }}>{r.text}</p>

              <div style={{ marginTop: 8 }}>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => handleDelete(r.id)}
                >
                  Delete review
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
