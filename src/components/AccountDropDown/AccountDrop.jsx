import React from "react";
import { FiUser } from "react-icons/fi";
import styles from "./AccountDrop.module.css";
import { useNavigate } from "react-router-dom";

const AccountDrop = ({ closeMenu, onLogout }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inner}>
          <ul>
            <li
              onClick={() => {
                navigate("/account");
                closeMenu();
              }}
            >
              <FiUser size={24} />
              Manage My Account
            </li>
            <li
              onClick={() => {
                navigate("/MyOrder");
                closeMenu();
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6.3V20.5C3 20.7652 3.10536 21.0196 3.29289 21.2071C3.48043 21.3946 3.73478 21.5 4 21.5H20C20.2652 21.5 20.5196 21.3946 20.7071 21.2071C20.8946 21.0196 21 20.7652 21 20.5V6.3H3Z"
                  stroke="#FAFAFA"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M21 6.3L18.1665 2.5H5.8335L3 6.3M15.7775 9.6C15.7775 11.699 14.0865 13.4 12 13.4C9.9135 13.4 8.222 11.699 8.222 9.6"
                  stroke="#FAFAFA"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              My Orders
            </li>
            <li
              onClick={() => {
                navigate("/cancellation");
                closeMenu();
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1393_458)">
                  <path
                    d="M8 16L12 12M16 8L11.9992 12M11.9992 12L8 8M12 12L16 16"
                    stroke="#FAFAFA"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="11.25"
                    stroke="white"
                    stroke-width="1.5"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1393_458">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              My Cancellations
            </li>
            <li
              onClick={() => {
                navigate("/Reviews");
                closeMenu();
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3789 4.54785C11.5677 3.93719 12.4323 3.93719 12.6211 4.54785L13.8184 8.4209C14.0968 9.32148 14.9295 9.93631 15.8721 9.93652H19.8281C20.4514 9.93652 20.7176 10.7284 20.2207 11.1045L16.8906 13.623C16.1689 14.1689 15.8665 15.1091 16.1338 15.9736L17.3867 20.0264C17.5734 20.6313 16.8728 21.1193 16.3701 20.7344L13.3076 18.3877C12.5361 17.7967 11.4639 17.7967 10.6924 18.3877L7.61328 20.7471C7.11126 21.1311 6.41157 20.6446 6.59668 20.04L7.83203 16.0049C8.09492 15.1463 7.79679 14.214 7.08398 13.668L3.73438 11.1025C3.24116 10.7247 3.50858 9.93652 4.12988 9.93652H8.12793C9.07053 9.93631 9.90322 9.32147 10.1816 8.4209L11.3789 4.54785Z"
                  stroke="#FAFAFA"
                  stroke-width="1.5"
                />
              </svg>
              My Reviews
            </li>
            <li
              onClick={() => {
                onLogout();
                closeMenu();
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12H13.5M6 15L3 12L6 9M11 7V6C11 5.46957 11.2107 4.96086 11.5858 4.58579C11.9609 4.21071 12.4696 4 13 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H13C12.4696 20 11.9609 19.7893 11.5858 19.4142C11.2107 19.0391 11 18.5304 11 18V17"
                  stroke="#FAFAFA"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AccountDrop;
