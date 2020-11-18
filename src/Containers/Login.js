import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Login = ({ setUser }) => {
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        setUser(response.data.token);

        history.push(location.state.fromPublish ? "/publish" : "/");
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="signup-container">
      <h2>Se connecter</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
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

        <button type="submit">Se connecter</button>
      </form>
      <a href="/Signup">Pas encore de compte? Inscris toi!</a>
    </div>
  );
};

export default Login;
