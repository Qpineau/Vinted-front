import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import "../App.css";

const CheckoutForm = ({ title, price, name }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: name,
    });

    const stripeToken = stripeResponse.token.id;

    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripeToken,
        title: title,
        amount: price,
      }
    );

    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <div>
      {completed ? (
        <p>Paiement effectué !</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="card-details">
            <CardElement />
          </div>
          <button className="payment-button" type="submit">
            Acheter
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
