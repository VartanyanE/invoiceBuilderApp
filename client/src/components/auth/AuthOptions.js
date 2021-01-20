import React, { Component, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./Auth.css";

export default function AuthOptions() {
  const history = useHistory();

  const { userData, setUserData } = useContext(UserContext);

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const createInvoice = () => history.push("/invoice");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div className="">
      {userData.user ? (
        <>
          <button onClick={createInvoice}>Create Invoice</button>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={register}>REGISTER </button>
          <button onClick={login}>LOGIN </button>
        </>
      )}
    </div>
  );
}
