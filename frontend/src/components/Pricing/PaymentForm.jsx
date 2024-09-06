import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./Pricing.css";

const PaymentForm = ({ handlePaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false); // New state for payment success

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(false); // Payment is not successful
    } else {
      setPaymentError(null);
      setPaymentSuccess(true);

      handlePaymentSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-row">
        <label>Card details</label>
        <CardElement />
      </div>
      {paymentError && <div className="error">{paymentError}</div>}
      <button type="submit" className="choose-plan-button">
        {paymentSuccess ? "Payment Successful" : "Make Payment"}
      </button>
    </form>
  );
};

export default PaymentForm;
