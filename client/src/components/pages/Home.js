import React from "react";
// import ReactDOM from "react-dom";
import { Container } from "@material-ui/core";
import AuthOptions from "../auth/AuthOptions";
import "fontsource-roboto";
import "./Home.css";
import { ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";
import Form from "../form/Form";
import TopNav from "../topNav/TopNav";

// import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <TopNav />
      <div className="main">
        <AuthOptions />
        <Container maxWidth="sm">
          <Form />
        </Container>
      </div>
    </ThemeProvider>
  );
}

// ReactDOM.render(<Home />, document.querySelector("#app"));
