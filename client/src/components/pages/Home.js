import React from "react";
// import ReactDOM from "react-dom";
import { Container } from "@material-ui/core";
import AuthOptions from "../auth/AuthOptions";
import "fontsource-roboto";
import "./Home.css";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../theme";

import Form from "../form";

// import Box from "@material-ui/core/Box";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div className="main">
        <AuthOptions />
        <Container maxWidth="sm">
          <h1>Hello</h1>
          <Form />
        </Container>
      </div>
    </ThemeProvider>
  );
}

// ReactDOM.render(<Home />, document.querySelector("#app"));
