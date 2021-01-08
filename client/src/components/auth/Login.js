import Axios from "axios";
import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();
  const { setUserData } = useContext(UserContext);
  const loginSubmit = async (e) => {
    e.preventDefault();
    const loggedUser = { email, password };

    const logRes = await Axios.post(
      "http://localhost:3001/users/login",
      loggedUser
    );
    setUserData({
      token: logRes.data.token,
      user: logRes.data.user,
    });
    localStorage.setItem("auth-token", logRes.data.token);
    history.push("/");
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginSubmit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
