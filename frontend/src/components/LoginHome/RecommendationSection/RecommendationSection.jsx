import React, { useState, useEffect } from "react";
import "./RecommendationSection.css";

const RecommendationSection = () => {
  const [formData, setFormData] = useState({
    title1: "",
    title2: "",
    title3: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if at least one field is filled before submitting
    if (formData.title1 || formData.title2 || formData.title3) {
      setSubmitted(true);

      // Reset form fields
      setFormData({
        title1: "",
        title2: "",
        title3: "",
      });

      // Hide the "Thank You" message after 30 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 30000);
    }
  };

  useEffect(() => {
    // Clear the form fields when the component unmounts
    return () => {
      setFormData({
        title1: "",
        title2: "",
        title3: "",
      });
    };
  }, []);

  return (
    <div className="recommendation-section">
      <h1 className="recommendation-heading">Movie Recommendations</h1>
      <p className="recommendation-subheading">
        Tell us your preferences, and we'll try to get it for you.
      </p>
      {submitted ? (
        <div className="thank-you-message">Thank you for your submission!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              type="text"
              name="title1"
              value={formData.title1}
              onChange={handleChange}
              placeholder="Title 1"
            />
            <input
              type="text"
              name="title2"
              value={formData.title2}
              onChange={handleChange}
              placeholder="Title 2"
            />
            <input
              type="text"
              name="title3"
              value={formData.title3}
              onChange={handleChange}
              placeholder="Title 3"
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default RecommendationSection;
