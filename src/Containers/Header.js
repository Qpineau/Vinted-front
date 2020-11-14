import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "./Vinted_logo.png";

const Header = ({ token, setUser }) => {
  return (
    <header>
      <div>
        {token ? (
          <button
            onClick={() => {
              setUser(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <>
            <div>
              <img className="logo" src={logo} alt="" />
            </div>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Recherche des articles"
              />
            </div>
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
            <button className="header-button button-sold">
              Vends tes articles
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
