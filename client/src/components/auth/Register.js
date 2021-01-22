// import Axios from "axios";
// import React, { useState, useContext } from "react";
// import UserContext from "../../context/UserContext";
// import { useHistory } from "react-router-dom";

// export default function Register() {
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [passwordCheck, setPasswordCheck] = useState();
//   const [displayName, setDisplayName] = useState();
//   const history = useHistory();
//   const { setUserData } = useContext(UserContext);

//   const submit = async (e) => {
//     e.preventDefault();
//     const newUser = { email, password, passwordCheck, displayName };

//     await Axios.post("http://localhost:3001/users/register", newUser);
//     const loginRes = await Axios.post("http://localhost:3001/users/login", {
//       email,
//       password,
//     });
//     setUserData({
//       token: loginRes.data.token,
//       user: loginRes.data.user,
//     });
//     localStorage.setItem("auth-token", loginRes.data.token);
//     history.push("/");
//   };
//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={submit}>
//         <label htmlFor="register-email">Email</label>
//         <input
//           id="register-email"
//           type="email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <label htmlFor="register-password">Password</label>
//         <input
//           id="register-password"
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Verify-Password"
//           onChange={(e) => setPasswordCheck(e.target.value)}
//         />

//         <label htmlFor="register-display-name">Display Name</label>
//         <input
//           id="register-display-name"
//           type="text"
//           onChange={(e) => setDisplayName(e.target.value)}
//         />

//         <input type="submit" value="register" />
//       </form>
//     </div>
//   );
// }

import Axios from "axios";
import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  center: {
    justifyContent: "center"
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const [displayName, setDisplayName] = useState();
  const history = useHistory();
  const { setUserData } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    const newUser = { email, password,  displayName };

    await Axios.post("http://localhost:3001/users/register", newUser);
    const loginRes = await Axios.post("http://localhost:3001/users/login", {
      email,
      password,
    });
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });
    localStorage.setItem("auth-token", loginRes.data.token);
    localStorage.setItem("email", email);
    history.push("/invoice");

  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="User Name"
                autoFocus
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container className={classes.center}>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}