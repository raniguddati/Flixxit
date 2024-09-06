import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./SignUp.module.css"; // Import your styles

function CardForm({ handlePayment }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Use Stripe.js to handle the payment
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError(null);
      handlePayment(result.paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.cardForm}>
      {" "}
      <div>
        <label htmlFor="card-element" className={styles.cardLabel}>
          {" "}
          Credit Card
        </label>
        <CardElement id="card-element" className={styles.cardElement} />{" "}
      </div>
      <div>
        <button type="submit" disabled={!stripe} className={styles.cardButton}>
          {" "}
          Pay Now
        </button>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}{" "}
    </form>
  );
}

export default CardForm;
