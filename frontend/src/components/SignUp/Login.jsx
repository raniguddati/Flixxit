/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory

function LoginPage() {
  const navigate = useNavigate();
  // Destructure styles
  const {
    background,
    loginCard,
    h2,
    errorMessage,
    signupLink,
    forgotPasswordLink,
    button,
    inputContainer,
    label,
    input,
    rememberMe,
    rememberMeLabel,
    rememberMeCheckbox,
    loginOptions,
  } = styles;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false); // Track "Forgot Password" mode

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (forgotPasswordMode) {
        // Handle "Forgot Password" mode
        const response = await axios.post("/reset-password", {
          email: formData.email,
        });
        console.log("Reset email sent:", response.data);
        // Handle reset email sent
      } else {
        // Handle regular login
        // const url = `${process.env.REACT_APP_BASE_URL}/login`;
        // console.log(url);
        const response = await axios.post("/login", formData);
        if (response.status === 200 && response.data.token) {
          // Store the token in local storage
          localStorage.setItem("token", response.data.token);
          console.log("Access token stored:", response.data.token);
          console.log(response);

          // Redirect to the home page or handle success
          navigate("/home");
          window.location.reload();
        } else {
          // Handle login failures, show error messages, etc.
          console.error("Login failed:", response.data.error);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 401) {
        setError("Incorrect email or password.");
      } else {
        setError("Login failed. Please try again later.");
      }
    }
  };

  const toggleForgotPasswordMode = () => {
    setForgotPasswordMode(!forgotPasswordMode);
    setError(""); // Clear any previous errors
  };

  const handleBackToLogin = () => {
    setForgotPasswordMode(false); // Turn off "Forgot Password" mode
    setError(""); // Clear any previous errors
  };

  return (
    <div>
      <div className={background}></div>
      <div className={loginCard}>
        <h2 className={h2}>
          {forgotPasswordMode ? "Forgot Password" : "LOGIN"}
        </h2>
        {error && <p className={errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={inputContainer}>
            <label className={label} htmlFor="email">
              E-mail
            </label>
            <input
              className={input}
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {!forgotPasswordMode && (
            <div className={inputContainer}>
              <label className={label} htmlFor="password">
                Password
              </label>
              <input
                className={input}
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {!forgotPasswordMode && (
            <div className={rememberMe}>
              <label className={rememberMeLabel}>
                <input
                  className={rememberMeCheckbox}
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </label>
            </div>
          )}
          <button className={button} type="submit">
            {forgotPasswordMode ? "Send Reset Email" : "Login"}
          </button>
        </form>
        <div className={loginOptions}>
          <p>
            {!forgotPasswordMode ? (
              "Don't have an account? "
            ) : (
              <span>
                <Link className={signupLink} onClick={handleBackToLogin}>
                  Back to Login
                </Link>
                <br />
                <br />
              </span>
            )}
            <Link to="/signup" className={signupLink}>
              Sign Up
            </Link>
          </p>
          {/* {!forgotPasswordMode && (
            <p>
              <span
                className={forgotPasswordLink}
                onClick={toggleForgotPasswordMode}
              >
                Forgot Password
              </span>
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
