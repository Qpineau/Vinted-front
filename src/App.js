import "./App.css";
import React, { useState } from "react";

import Cookie from "js-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Containers/Home.js";
import Offer from "./Containers/Offer";
import Header from "./Containers/Header";
import Signup from "./Containers/Signup";
import Login from "./Containers/Login";
import Publish from "./Containers/Publish";
import Payment from "./Containers/Payment";

function App() {
  const [token, setToken] = useState(Cookie.get("userToken") || null);

  const setUser = (tokenToSet) => {
    if (tokenToSet) {
      Cookie.set("userToken", tokenToSet);
      setToken(tokenToSet);
    } else {
      Cookie.remove("userToken");

      setToken(null);
    }
  };

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Switch>
        <Route path="/offer/:id">
          <Offer token={token} />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/publish">
          <Publish token={token} />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
