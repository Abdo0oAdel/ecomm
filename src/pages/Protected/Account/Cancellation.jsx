import React, { useState } from "react";
import styles from "./Account.module.css";

const Cancellation = () => {
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Reason:", reason);
    console.log("Comments:", comments);
  };
  return (
    <div className={styles.cancelationContainer}>
      <h2>Cancel Account</h2>
      <form onSubmit={handleSubmit} className={styles.cancelationForm}></form>
      <label>
        Reason for Cancellation:
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a reason
          </option>
          <option value="not_using">Not using the service</option>
          <option value="too_expensive">Too expensive</option>
          <option value="technical_issues">Technical issues</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Additional Comments:
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Optional"
        ></textarea>
      </label>
      <button type="submit" className={styles.cancelButton}>
        Submit Cancellation
      </button>
    </div>
  );
};
export default Cancellation;
