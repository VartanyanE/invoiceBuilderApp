import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Grids from "./components/grids/Grids";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Invoice from "./components/pages/Invoice";
import UserContext from "./context/UserContext";
import axios from "axios";

const App = () => {
<<<<<<< Updated upstream
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    check: false
  });
 
=======
  const [userData, setUserData] = useState(false);

  const [clicked, setClicked] = useState(false);
>>>>>>> Stashed changes

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
          check: true
        });
       
      }
    };

    checkLoggedIn();
    
  }, []);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Route exact path="/" component={!userData.check ? Login : Invoice} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/invoice" component={Invoice} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
