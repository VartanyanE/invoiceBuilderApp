import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid } from "@material-ui/core";
import { purple, yellow } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      // width: "25ch",
      flexGrow: 1,
    },
  },
  gridContainer: {
    backgroundColor: yellow[400],
    justifyContent: "space-around",
    margin: "1.5rem ",
    padding: "1.5rem",
  },
  textField: {
    color: purple[50],
  },
  thankYou: {
    width: "100%",
  },
  addIcon: {
    margin: "10px",
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [data, setData] = useState([{}]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const invoiceDueDate = moment().add(data.paymentTerms, "days");
    let taxConversion = data.tax / 100;
    console.log(taxConversion);
    let totalPrice = (data.quantity || data.hours) * data.rate;
    let taxTotal = taxConversion * totalPrice;
    let finalTotal = totalPrice + taxTotal;
    console.log(finalTotal);

    let randomInvoiceNumber = getRandomInt(9999, 100000);
    await createInvoice({
      invoiceNumber: randomInvoiceNumber,
      name: data.name.toUpperCase(),
      dueDate: invoiceDueDate,
      tax: data.tax,
      paymentTerms: data.paymentTerms,
      pastDue: false,

      description: data.description,
      hours: data.hours,
      quantity: data.quantity,
      rate: data.rate,
      total: finalTotal,

      selectedFile: data.selectedFile,
      creator: userData.user.id,
    });
    await clearForm();
  };

  return (
    <div className={classes.root} noValidate autoComplete="off">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item>
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Your Name"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Your Address"
              variant="outlined"
            />
          </Grid>

          <Grid item>
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
          item
          spacing={3}
          className={classes.gridContainer}
          direction="row"
        >
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Client Name/Business"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Client Email"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Client's Phone"
              variant="outlined"
            />
          </Grid>
          <Grid item>
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
            <TextField
              id="description"
              label="Description"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField id="quantity" label="Quantity" variant="outlined" />
          </Grid>
          <Grid item xs={3}>
            <TextField id="rate" label="Rate" variant="outlined" />
          </Grid>
          <AddIcon className={classes.addIcon} />
        </Grid>
        <br />
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12}>
            <TextField
              className={classes.thankYou}
              id="outlined-basic"
              label="Thank you message"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
