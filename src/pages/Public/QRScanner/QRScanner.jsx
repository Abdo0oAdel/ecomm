import React from "react";
import styles from "./QRScanner.module.css";
import qrImage from "../../../assets/imgs/qr.png";

const QRScanner = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>QR Scanner</h2>
      <p className={styles.instructions}>Scan this QR code with your mobile device.</p>
      <div className={styles.qrWrapper}>
        <img src={qrImage} alt="QR Code" className={styles.qrImage} />
      </div>
    </div>
  );
};

export default QRScanner;
