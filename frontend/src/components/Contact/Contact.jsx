import React, { useState } from "react";
import "./Contact.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const Contact = () => {
  const [expanded, setExpanded] = useState(null);
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password by clicking on the 'Forgot Password' link on the login page.",
    },
    {
      question: "How can I update my account information?",
      answer:
        "You can update your account information by navigating to the 'Account Settings' section in your profile.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards including Visa, MasterCard, and American Express.",
    },
    {
      question: "Is there a free trial available?",
      answer: "No, we dont provide any free trial services.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes, you can cancel your subscription at any time through your account settings. Keep in mind that cancellation might affect access to certain features.",
    },
  ];

  const handleToggle = (index) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (issue && description) {
      console.log("Issue:", issue);
      console.log("Description:", description);
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="raise-issue">
          <h2>Raise an Issue</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="issue">Issue:</label>
              <input
                type="text"
                id="issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="card-conatiner">
            <div className="card">
              <h3>Email</h3>
              <p>support@flixxit.com</p>
            </div>
            <div className="card">
              <h3>Phone Number</h3>
              <p>+1-800-123-4567</p>
            </div>
          </div>
        </div>
      </div>

      <div className="faqs">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div
              className={`question ${expanded === index ? "expanded" : ""}`}
              onClick={() => handleToggle(index)}
            >
              <span className="question-text">{faq.question}</span>
              {expanded === index ? <FaMinus /> : <FaPlus />}
            </div>
            {expanded === index && <div className="answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
