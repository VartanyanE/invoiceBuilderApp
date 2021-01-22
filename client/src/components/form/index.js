import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { deepPurple, amber, pink } from "@material-ui/core/colors";
import { TextField, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      // width: "25ch",
      flexGrow: 1,
    },
  },
  gridContainer: {
    backgroundColor: "pink",
  },
  textField: {},
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <div className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={3}>
          <TextField
            className={classes.textField}
            id="item name"
            label="Item Name"
            variant="outlined"
          />
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
          <TextField id="outlined-basic" label="Quantity" variant="outlined" />
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
  );
}
