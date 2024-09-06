import React, { useState } from "react";
import axios from "axios";
import styles from "./SignUp.module.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardForm from "./CardForm";
import { Link, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51M1dLSLYXLDeaQnCJepttEdwWxLkuFRopP2LeAeaxewCVcNFjpcwQzeuQu56uzkuDspv65uvvWrZOOKtYx8loXfn00paTCPhV9"
); // Replace with your Stripe publishable key

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    // Add more genres here
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Korean",
    "Chinese",
    "Russian",
    // Add more languages here
  ];

  const pricingOptions = ["200RS/ Month", "500RS/ quater", "290RS/ Month"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenreSelection = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(
        selectedGenres.filter((selected) => selected !== genre)
      );
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleLanguageSelection = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((selected) => selected !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handlePayment = (paymentMethod) => {
    setPaymentMethod(paymentMethod);
  };

  const handlePricingSelection = (pricingOption) => {
    setSelectedPlan(pricingOption); // Update the selected plan
    setStep(3); // Move to the next step (step 3)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
      } else {
        setError("");
        const userData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          selectedPlan: selectedPlan,
          genres: selectedGenres.map((genre) => ({ name: genre })), // Format genres as an array of objects
          languages: selectedLanguages.map((language) => ({ name: language })), // Format languages as an array of objects
        };
        // Send the signup request to the server with user data
        const response = await axios.post("/signup", userData);
        console.log(userData);

        if (response.data.message === "User created successfully") {
          navigate("/signin");
        } else if (response.data.message === "User already exists") {
          setError("User with this email already exists.");
        }
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Sign-up failed. Please try again.");
    }
  };

  const renderGenres = () => {
    return genres.map((genre, index) => (
      <div
        key={index}
        className={`${styles.genreCard} ${
          selectedGenres.includes(genre) ? styles.selected : ""
        }`}
        onClick={() => handleGenreSelection(genre)}
      >
        {genre}
      </div>
    ));
  };

  const renderLanguages = () => {
    return languages.map((language) => (
      <div
        key={language}
        className={`${styles.languageCard} ${
          selectedLanguages.includes(language) ? styles.selected : ""
        }`}
        onClick={() => handleLanguageSelection(language)}
      >
        {language}
      </div>
    ));
  };

  const renderPricingOptions = () => {
    return pricingOptions.map((option) => (
      <div
        key={option}
        className={`${styles.pricingCard} ${
          selectedPlan === option ? styles.selected : ""
        }`}
        onClick={() => handlePricingSelection(option)}
      >
        <h3>{option}</h3>
        <p>{option}</p>
      </div>
    ));
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.background}></div>
      <div className={styles.signupCard}>
        <h2 className={styles.h2}>
          {step === 1
            ? "SIGN UP New"
            : step === 2
            ? "Step 2: Select Plan New"
            : step === 3
            ? "Step 3: Payment  New"
            : step === 4
            ? "Step 4: Select Genres  New"
            : "Step 5: Select Languages  New"}
        </h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {step === 1 ? (
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                className={styles.input}
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                className={styles.input}
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className={styles.input}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button className={styles.button} onClick={() => setStep(2)}>
              Sign Up
            </button>
          </form>
        ) : step === 2 ? (
          <div>
            <div className={styles.pricingContainer}>
              {renderPricingOptions()}
            </div>
            <button
              className={styles.button}
              onClick={() => setStep(4)}
              disabled={!selectedPlan}
            >
              Next
            </button>
          </div>
        // ) : step === 3 ? (
        //   <div>
        //     <h3>Payment Information:</h3>
        //     <Elements stripe={stripePromise}>
        //       <CardForm handlePayment={handlePayment} />
        //     </Elements>
        //     <button
        //       className={styles.button}
        //       onClick={() => setStep(4)}
        //       disabled={!paymentMethod}
        //     >
        //       Next
        //     </button>
        //   </div>
        ) : step === 4 ? (
          <div>
            <h3>Select Movie Genres:</h3>
            <div className={styles.genreContainer}>{renderGenres()}</div>
            <button
              className={styles.button}
              onClick={() => setStep(5)}
              disabled={selectedGenres.length === 0}
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <h3>Select Language Preferences:</h3>
            <div className={styles.languageContainer}>{renderLanguages()}</div>
            <button
              className={styles.button}
              onClick={handleSubmit}
              disabled={selectedLanguages.length === 0}
            >
              Complete Signup
            </button>
          </div>
        )}
      </div>
      <p className={styles.loginLinkp}>
        Already have an account?
        <Link to="/signin" className={styles.loginLink}>
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
