import React, { useState } from "react";
import "./Pricing.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm.jsx"; // You need to create PaymentForm component.
import axios from "axios";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51M1dLSLYXLDeaQnCJepttEdwWxLkuFRopP2LeAeaxewCVcNFjpcwQzeuQu56uzkuDspv65uvvWrZOOKtYx8loXfn00paTCPhV9"
);
const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "$7.99/month",
      features: [
        { name: "HD Streaming", available: true },
        { name: "Unlimited Movies", available: true },
        { name: "1 Device at a time", available: true },
        { name: "Cancel Anytime", available: true },
      ],
    },
    {
      name: "Standard",
      price: "$12.99/month",
      features: [
        { name: "Full HD Streaming", available: true },
        { name: "Unlimited Movies", available: true },
        { name: "2 Devices at a time", available: true },
        { name: "Cancel Anytime", available: true },
      ],
    },
    {
      name: "Premium",
      price: "$19.99/month",
      features: [
        { name: "4K Ultra HD Streaming", available: true },
        { name: "Unlimited Movies", available: true },
        { name: "4 Devices at a time", available: true },
        { name: "Cancel Anytime", available: true },
      ],
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showPreferencesForm, setShowPreferencesForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(true);

  const handleBackendData = async () => {
    console.log("Payment Successful:", paymentSuccessful);
    if (
      selectedPlan !== null &&
      username &&
      email &&
      password &&
      paymentSuccessful
    ) {
      const selectedPlanName = plans[selectedPlan].name;

      // Format genres as an array of objects
      const formattedGenres = selectedGenres.map((genre) => ({
        name: genre,
      }));

      // Format languages as an array of objects
      const formattedLanguages = selectedLanguages.map((language) => ({
        name: language,
      }));

      const userData = {
        username: username,
        email: email,
        password: password,
        selectedPlan: selectedPlanName,
        genres: formattedGenres,
        languages: formattedLanguages,
      };

      console.log("User Data to Send:", userData);
      const response = await axios.post("/signup", userData);
      console.log(userData);

      if (response.data.message === "User created successfully") {
        alert("registration successful");
        navigate("/signin");
      } else if (response.data.message === "User already exists") {
        alert("User with this email already exists.");
      }

      // Now, you can send the userData object to your backend.
    } else {
      console.log(
        "Please fill in all required fields and complete the payment."
      );
    }
  };

  const handleSelectPlan = (plan) => {
    // If the clicked plan is the currently selected plan, deselect it
    setSelectedPlan((prevSelectedPlan) =>
      prevSelectedPlan === plan ? null : plan
    );
    setSelectedGenres([]); // Initialize as an empty array
    setSelectedLanguages([]); // Initialize as an empty array
    setShowSignUpForm(true);
    setShowPreferencesForm(false);
    setShowPaymentForm(false);

    // Log the selected plan
    console.log("Selected Plan:", plan);
  };

  const handleSelectPreferences = () => {
    // Check if all three input fields are filled
    if (!username || !email || !password) {
      alert(
        "Please fill in all three input fields: Username, Email, and Password."
      );
    } else {
      setShowPreferencesForm(true);
    }
  };

  const handlePayNow = () => {
    // Validation logic

    // if (!selectedPlan) {
    // alert("Please select a plan.");
    // } else if (!showSignUpForm && !showPreferencesForm) {
    // Preferences form
    // if (selectedLanguages.length === 0 || selectedGenres.length === 0) {
    // alert("Please select at least one language and genre.");
    // } else {
    console.log("Selected Languages:", selectedLanguages);
    console.log("Selected Genres:", selectedGenres);

    console.log("Showing Payment Form");
    setShowPaymentForm(true);
    // }
    // }
  };

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

  const handleLanguageChange = (e, language) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Language is checked, add it to the selectedLanguages array
      setSelectedLanguages([...selectedLanguages, language]);
    } else {
      // Language is unchecked, remove it from the selectedLanguages array
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language)
      );
    }
  };

  const handleGenreChange = (e, genre) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Genre is checked, add it to the selectedGenres array
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      // Genre is unchecked, remove it from the selectedGenres array
      setSelectedGenres(selectedGenres.filter((gen) => gen !== genre));
    }
  };

  return (
    <div className="pricing">
      <h2 className="features-heading">
        Start by choosing the plan that's right for you
      </h2>

      <div className="cards">
        {plans.map((plan, index) => (
          <div
            className={`card ${selectedPlan === index ? "selected" : ""}`}
            key={index}
          >
            <h2 className="card-name">{plan.name}</h2>
            <p className="card-price">{plan.price}</p>
            <ul className="features">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>
                  {feature.available ? (
                    <FaCheck className="feature-icon available" />
                  ) : (
                    <FaTimes className="feature-icon not-available" />
                  )}
                  {feature.name}
                </li>
              ))}
            </ul>
            <button
              className="choose-plan-button"
              onClick={() => handleSelectPlan(index)}
            >
              {selectedPlan === index ? "Selected" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>

      {showSignUpForm && (
        <div className="sign-up-form">
          <h3>Sign Up</h3>
          <form>
            <div className="form-row">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
          <button
            className="choose-plan-button"
            onClick={handleSelectPreferences}
          >
            Select Preferences
          </button>
        </div>
      )}
      {showPreferencesForm && (
        <div className="preferences-form">
          <div className="preferences-form-left">
            <h3>Choose Language Preferences</h3>
            {/* Language Selection */}
            <div className="language-selection">
              {languages.map((language, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={language}
                    checked={selectedLanguages.includes(language)}
                    onChange={(e) => handleLanguageChange(e, language)}
                  />
                  {language}
                </label>
              ))}
            </div>
          </div>
          <div className="preferences-form-right">
            <h3>Choose Genre Preferences</h3>
            {/* Genre Selection */}
            <div className="genre-selection">
              {genres.map((genre, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={(e) => handleGenreChange(e, genre)}
                  />
                  {genre}
                </label>
              ))}
            </div>
          </div>
          <div className="clear-both"></div>
          {/* <button className="choose-plan-button" onClick={handlePayNow}>
            Pay Now
          </button> */}
        </div>
      )}
      {/* {showPaymentForm && ( */}
        <div className="payment-form">
          {/* <Elements stripe={stripePromise}>
            <PaymentForm handlePaymentSuccess={true} />
          </Elements> */}
          <button type="submit" onClick={handleBackendData}>
            Register
          </button>
        </div>
      {/* )} */}
    </div>
  );
};

export default Pricing;
