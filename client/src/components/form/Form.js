import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid } from "@material-ui/core";
import { purple, yellow } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import { saveAs } from "file-saver";
import FileBase from "react-file-base64";
import Item from "./Item";
import {
  createInvoice,
  getLogo,
  // getInvoice,
  // searchInvoice,
  // isPastDue,
  // searchByName,
} from "../../utils/API";

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
  logo: {
    height: "60px",
    width: "60px",
  },
  logo_grow: {
    border: "4px solid green",
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const changeSizeRef = useRef(0);
  const [data, setData] = useState([{}]);
  const [logo, setLogo] = useState([{}]);
  const [item, setItem] = useState([]);
  const [selected, setSelected] = useState();
  const [inputList, setInputList] = useState([
    {
      itemName: "",
      description: "",
      quantity: "",
      rate: "",
    },
  ]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    getLogo().then((res) => {
      setLogo(res.data);
    });
  }, []);
  console.log(changeSizeRef);
  // console.log(data);
  // console.log(selected);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    console.log(value);
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    console.log(inputList);
  };

  const changeSize = (index) => {
    let currentIndex = (changeSizeRef.current.id = index);
    console.log(currentIndex);
    if (!selected && currentIndex === index) {
      changeSizeRef.current.style.border = "2px solid red";
    } else {
      changeSizeRef.current.style.border = "none";
    }
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { itemName: "", description: "", quantity: "", rate: "" },
    ]);
  };

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
    // let finalTotal = data.quantity * data.rate;
    console.log(totalPrice);

    let randomInvoiceNumber = getRandomInt(9999, 100000);
    await createInvoice({
      invoiceNumber: randomInvoiceNumber,
      name: data.name.toUpperCase(),
      dueDate: invoiceDueDate,
      tax: data.tax,
      paymentTerms: data.paymentTerms,
      item: inputList,
      pastDue: false,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientNumber: data.clientNumber,
      clientAddress: data.clientAddress,

      rate: data.rate,
      preTax: totalPrice,
      total: finalTotal,
      thankYouMessage: data.thankYouMessage,

      selectedFile: data.selectedFile,
      selectedLogo: data.selelctedLogo,
      // creator: userData.user.id,
    });
    await clearForm();
  };

  const clearForm = () => {
    setData({
      name: "",
      quantity: "",
      tax: "",
      description: "",
      hours: "",
      rate: "",
    });
  };

  return (
    <div className={classes.root} noValidate autoComplete="off">
      <form onSubmit={handleSubmit}>
        Upload a logo{" "}
        <FileBase
          id="upload logo"
          type="file"
          multiple={false}
          onDone={({ base64 }) => setData({ ...data, selectedFile: base64 })}
        />
        {logo.map((x, i) => {
          // let selectedClass = selected ? "logo_grow" : "";
          return (
            <>
              {x.selectedFile ? (
                <div className={classes.logo}>
                  <img
                    // className={selected ? classes.logo_grow : ""}
                    ref={changeSizeRef}
                    style={{ height: "100%", width: "100%" }}
                    src={x.selectedFile}
                    onClick={() => {
                      setData({ ...data, selectedLogo: x.selectedFile });
                      changeSize(i);
                      setSelected(!selected);
                    }}
                  />
                </div>
              ) : (
                ""
              )}
            </>
          );
        })}
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item>
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Your Name"
              variant="outlined"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Your Address"
              variant="outlined"
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </Grid>

          <Grid item>
            <TextField
              id="outlined-basic"
              label="Payment Terms"
              variant="outlined"
              onChange={(e) =>
                setData({ ...data, paymentTerms: e.target.value })
              }
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
              onChange={(e) => setData({ ...data, clientName: e.target.value })}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Client Email"
              variant="outlined"
              onChange={(e) =>
                setData({ ...data, clientEmail: e.target.value })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Client's Phone"
              variant="outlined"
              onChange={(e) =>
                setData({ ...data, clientNumber: e.target.value })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Client's Address"
              variant="outlined"
              onChange={(e) =>
                setData({ ...data, clientAddress: e.target.value })
              }
            />
          </Grid>
        </Grid>
        {/* -------------------------------------------------------- */}
        <Grid container spacing={3} className={classes.gridContainer}>
          {inputList.map((x, i) => {
            return (
              <>
                <Grid item xs={3}>
                  <TextField
                    className={classes.textField}
                    name="itemName"
                    id="itemName"
                    label="Item Name"
                    variant="outlined"
                    value={x.itemName}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    value={x.description}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    variant="outlined"
                    value={x.quantity}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="rate"
                    name="rate"
                    label="Rate"
                    variant="outlined"
                    value={x.rate}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </Grid>
              </>
            );
          })}

          {/* {item.map((result) => result)} */}
          <AddIcon className={classes.addIcon} onClick={handleAddClick} />
        </Grid>
        <br />
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12}>
            <TextField
              className={classes.thankYou}
              id="outlined-basic"
              label="Thank you message"
              variant="outlined"
              onChange={(e) =>
                setData({ ...data, thankYouMessage: e.target.value })
              }
            />
            <button type="submit">Create Invoice</button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
