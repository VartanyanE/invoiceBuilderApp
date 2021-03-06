import React, { useState, useContext } from "react";
import Axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../../context/UserContext";
import ClickedContext from "../../context/ClickedContext";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  center: {
    justifyContent: "center",
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState();
  // const [clicked, setClicked] = useState(false);

  const history = useHistory();
  const { setUserData } = useContext(UserContext);
  const { clicked, setClicked } = useContext(ClickedContext);
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
    if (clicked) {
      localStorage.setItem("email", email);
    }
    history.push("/");
  };
  console.log(clicked);
  let checkAuth = localStorage.getItem("auth-token");
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={loginSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={
                !localStorage.getItem("email")
                  ? "Email Address"
                  : localStorage.getItem("email")
              }
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) =>
                localStorage.getItem("email")
                  ? setEmail(localStorage.getItem("email"))
                  : setEmail(e.target.value)
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              onClick={(e) =>
                e.target.checked ? setClicked(true) : setClicked(false)
              }
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container className={classes.center}>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
