import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { deepPurple, amber, pink } from "@material-ui/core/colors";
import { TextField, Grid } from "@material-ui/core";
import { deepPurple, amber } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      // width: "25ch",
      flexGrow: 1,
    },
  },
  gridContainer: {
    backgroundColor: amber[300],
  },
  textField: {
    color: deepPurple[50],
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <div className={classes.root} noValidate autoComplete="off">
      <Grid
        container
        spacing={3}
        className={classes.gridContainer}
        direction="column"
      >
        <Grid item xs={4}>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="Your Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Your Address"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Invoice Date"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Payment due"
            variant="outlined"
          />
        </Grid>
      </Grid>
      {/* ---------------------------------------------------------- */}
      <Grid
        container
        spacing={3}
        className={classes.gridContainer}
        direction="column"
      >
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Client Name/Business"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Client Email"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Client's Phone"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Client's Address"
            variant="outlined"
          />
        </Grid>
      </Grid>
      {/* -------------------------------------------------------- */}
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={3}>
          <TextField
            className={classes.textField}
            id="itemName"
            label="Item Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField id="description" label="Description" variant="outlined" />
        </Grid>
        <Grid item xs={3}>
          <TextField id="quantity" label="Quantity" variant="outlined" />
        </Grid>
        <Grid item xs={3}>
          <TextField id="rate" label="Rate" variant="outlined" />
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
  );
}
