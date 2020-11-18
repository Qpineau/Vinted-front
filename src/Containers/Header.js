import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../Assets/Vinted_logo.png";

const Header = ({ token, setUser }) => {
  return (
    <header>
      <>
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="" />
          </Link>
        </div>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Recherche des articles"
          />
        </div>
        {token ? (
          <button
            className="deconnection"
            onClick={() => {
              setUser(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <div>
            <Link to="/signup">
              <button className="header-button button-login-signup button-signup">
                S'inscrire
              </button>
            </Link>
            <Link to="/login">
              <button className="header-button button-login-signup">
                Se connecter
              </button>
            </Link>
          </div>
        )}
        <Link to={"/publish"}>
          <button className="header-button button-sold">
            Vends tes articles
          </button>
        </Link>
      </>
    </header>
  );
};

export default Header;
