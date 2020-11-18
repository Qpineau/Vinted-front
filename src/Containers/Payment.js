import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "../App.css";

import CheckoutForm from "../Components/CheckoutForm";

const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

const Payment = () => {
  const location = useLocation();
  const { title, price, name } = location.state;

  return (
    <div className="payment">
      <div className="payment-container">
        <div className="payment-card summary">
          <div className="title">Résumé de la commande</div>
          <div className="content">
            <ul>
              <li>
                Commande <span>{price} €</span>
              </li>

              <li>
                Frais protection acheteurs{" "}
                <span>{(price * 0.1).toFixed(2)} €</span>
              </li>
              <li>
                Frais de port <span>{(price * 0.2).toFixed(2)} €</span>
              </li>
            </ul>
          </div>
          <div className="divider"></div>
          <div className="content">
            <ul>
              <li className="bold">
                Total <span>{(price * 1.3).toFixed(2)} €</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="payment-card">
          <div className="content">
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <span className="bold">{title}</span>. Vous allez payer{" "}
            <span className="bold">{(price * 1.3).toFixed(2)} €</span> (frais de
            protection et frais de port inclus).
            <div className="divider"></div>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                title={title}
                price={(price * 1.3).toFixed(2)}
                name={name}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
