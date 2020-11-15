import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";
import dechirure from "../Assets/dechirure.svg";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <>
      <div className="home-pub">
        <img className="home-pub-dech" src={dechirure} alt="" />
        <div>
          <div className="home-ready">
            "Prêts à faire du tri dans vos placards ?"
            <button>Commencer à vendre</button>
          </div>
        </div>
      </div>
      <div className="home-offers-wrapper">
        {data.offers.map((offer, index) => {
          return (
            <Link to={`/offer/${offer._id}`} key={offer._id}>
              <div className="offers-container">
                <div className="offer-avatar">
                  <img
                    src={offer.owner.account.avatar.secure_url}
                    alt={offer.product_name}
                  />
                  <span>{offer.owner.account.username}</span>
                </div>
                <div>
                  <img src={offer.product_image.secure_url} alt="" />
                  <div className="offer-price-size">
                    <span>{offer.product_price} €</span>
                    <span>{offer.product_details[1].TAILLE}</span>
                    <span>{offer.product_details[0].MARQUE}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default Home;
