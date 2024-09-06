import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css"; // Import CSS module
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.signupButton}>
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
