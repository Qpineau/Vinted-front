import React, { useState, useEffect } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Offer = ({ token }) => {
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
          <img
            className="offer-picture"
            src={data.product_image.secure_url}
            alt={data.product_name}
          />
        </div>
        <div className="offer-infos">
          <div>
            <span className="offer-price">{data.product_price} €</span>

            <ul className="offer-list">
              {data.product_details.map((elem, index) => {
                const keys = Object.keys(elem);
                return (
                  <li>
                    <span>{keys[0]} </span>
                    <span>{elem[keys[0]]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="divider"></div>
          <div className="offer-content">
            <p className="name">{data.product_name}</p>
            <p className="description">{data.product_description}</p>
            <div className="offer-avatar-username">
              {data.owner.account.avatar ? (
                <img
                  src={data.owner.account.avatar.secure_url}
                  alt={data.owner.account.username}
                />
              ) : null}

              <span>{data.owner.account.username}</span>
            </div>
          </div>
          {token ? (
            <Link
              to={{
                pathname: "/payment",
                state: {
                  title: data.product_name,
                  price: data.product_price,
                  name: data._id,
                },
              }}
            >
              <button>Acheter</button>
            </Link>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Offer;
