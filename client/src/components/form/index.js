import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { deepPurple, amber, pink } from "@material-ui/core/colors";
import { TextField, Grid } from "@material-ui/core";

import { ThemeProvider } from "@material-ui/core";
import theme from "../../theme";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      flexGrow: 1,
    },

    textField: {
      width: "100%",
    },
    input: {
      color: "blue",
    },
    grid: {
      backgroundColor: "pink",
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextField id="item name" label="Item Name" variant="outlined" />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-basic" label="Rate" variant="outlined" />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Thank you message"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
