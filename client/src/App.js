import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
// import Grids from "./components/grids/Grids";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Invoice from "./components/pages/Invoice";
import UserContext from "./context/UserContext";
import ClickedContext from "./context/ClickedContext";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const App = () => {
  const [userData, setUserData] = useState([
    {
      user: "",
    },
  ]);

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:3001/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      console.log(tokenRes.data);
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:3001/users/", {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <ClickedContext.Provider value={{ clicked, setClicked }}>
          <Switch>
            <Route exact path="/" component={userData.user ? Home : Login} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/invoice" component={Invoice} />
          </Switch>
        </ClickedContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
