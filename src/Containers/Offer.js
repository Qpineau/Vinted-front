import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div className="offer">
      <div className="offer-container">
        <div className="offer-pictures">
          <img className="offer-picture" src="" alt="" />
        </div>
        <div className="offer-infos">
          <div>
            <span className="offer-price">12.99 €</span>
            <ul className="offer-list">
              <li>
                <span>Marque</span>
                <span>Monki</span>
              </li>
              <li>
                <span>Marque</span>
                <span>Monki</span>
              </li>
              <li>
                <span>Marque</span>
                <span>Monki</span>
              </li>
              <li>
                <span>Marque</span>
                <span>Monki</span>
              </li>
              <li>
                <span>Marque</span>
                <span>Monki</span>
              </li>
            </ul>
          </div>
          <div className="divider"></div>
          <div className="offer-content">
            <p className="name"></p>
            <p className="description"></p>
            <div className="offer-avatar-username">
              <img src="" alt="" />
              <span></span>
            </div>
          </div>
          <button>Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
