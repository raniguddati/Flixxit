/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="social-icons">
          <a href="#">
            <FaFacebook className="social-icon" />
          </a>
          <a href="#">
            <FaTwitter className="social-icon" />
          </a>
          <a href="#">
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
      <div className="copyright">&copy; 2023 Flixxit. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
