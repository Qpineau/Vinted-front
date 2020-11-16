import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../App.css";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          placeholder="Nom d'utilisateur"
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <input
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button type="submit">S'inscrire</button>
      </form>
      <a href="/Login">Déjà inscris? Connecte-toi!</a>
    </div>
  );
};

export default Signup;
