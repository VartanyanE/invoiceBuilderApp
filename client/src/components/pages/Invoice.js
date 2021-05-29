import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Home.css";

import {
  createInvoice,
  getInvoice,
  searchInvoice,
  isPastDue,
  searchByName,
} from "../../utils/API";
import UserContext from "../../context/UserContext";
import { saveAs } from "file-saver";
import FileBase from "react-file-base64";
import moment from "moment";
import { set } from "mongoose";

export default function Invoice() {
  const { userData } = useContext(UserContext);
  const [currentId, setCurrentId] = useState();
  const [arrayGrab, setArrayGrab] = useState([{}]);
  const [data, setData] = useState([{}]);
  const [showInvoiceResults, setShowInvoiceResults] = useState(true);
  const [showCustomerResults, setShowCustomerResults] = useState(true);

  const [invoice, setInvoice] = useState([{}]);
  const [search, setSearch] = useState({
    invoiceNumber: "",
  });
  const [searchName, setSearchName] = useState({
    name: "",
  });
  const [searchResultsState, setSearchResultsState] = useState([{}]);
  const [searchResultsName, setSearchResultsName] = useState([{}]);

  useEffect(() => {
    getInvoice().then((res) => {
      setInvoice(res.data);
      console.log(res.data);
    });
  }, [data]);

  useEffect(() => {
    const arrayGrabber = async () => {
      await setArrayGrab(searchResultsName);
    };
    arrayGrabber();
  }, [searchResultsName]);

  console.log(arrayGrab);
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
    let taxTotal = taxConversion * parseInt(data.totalPrice);
    // let floatTax = data.tax.toFixed(2);
    let finalTotal = parseInt(data.totalPrice) + taxTotal;
    let floatTotal = finalTotal.toFixed(3);
    console.log(finalTotal);

    let randomInvoiceNumber = getRandomInt(9999, 100000);
    await createInvoice({
      invoiceNumber: randomInvoiceNumber,
      name: data.name.toUpperCase(),
      address: data.address,
      address2: data.address2,
      clientName: data.clientName,
      clientAddress: data.clientAddress,
      dueDate: invoiceDueDate,
      tax: data.tax,  
      paymentTerms: data.paymentTerms,
      pastDue: false,
      description: data.description,
      hours: data.hours,
      quantity: data.quantity,
      rate: data.rate,
      preTax: data.totalPrice,
      total: floatTotal,
      selectedFile: data.selectedFile,
      // creator: userData.user.id,
    });
    await clearForm();
  };

  const handlePastDue = async (event) => {
    event.preventDefault();

    await searchInvoice(search.invoiceNumber).then(({ data }) => {
      setShowInvoiceResults(true);
      setSearchResultsState(data);
      setCurrentId(searchResultsState[0]._id);
      let currentDate = moment();
      let dueDate = searchResultsState[0].dueDate;
      console.log(dueDate);
      if (currentDate.isAfter(dueDate)) {
        isPastDue(currentId);
      }
    });
  };

  const handleSearchByName = async (event) => {
    event.preventDefault();

    await searchByName(searchName.name).then(({ data }) => {
      setSearchResultsName(data);
    });
    await setShowCustomerResults(true);
  };

  const clearForm = () => {
    setData({
      name: "",
      address: "",
      address2: "",

      paymentTerms: "",
      quantity: "",
      tax: "",
      description: "",
      hours: "",
      total: "",
      totalPrice: "",
      clientAddress: "",
      clientName: ""
    });
  };

  const downloadPDF = async () => {
    console.log(invoice);
    let invoiceObject = {
      invoiceNumber: invoice[0].invoiceNumber,
      name: invoice[0].name,
      address: invoice[0].address,
      address2: invoice[0].address2,
      clientName: invoice[0].clientName,
      clientAddress: invoice[0].clientAddress,




      dueDate: invoice[0].dueDate,
      description: invoice[0].description,
      hours: invoice[0].hours,
      rate: invoice[0].rate,
      preTax: invoice[0].preTax,
      total: invoice[0].total,
      tax: invoice[0].tax,
      selectedFile: invoice[0].selectedFile,
    };
    console.log(invoiceObject);
    await axios
      .post("/create-pdf", invoiceObject)
      .then(() => axios.get("/create-pdf/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  // console.log(arrayGrab);
  return (
    <div className="container">
      
      <div className = "formClass">
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <br />
        

        <input 
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
                <br />

        
        <label>Address</label>
        <br />
        <input
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
                <br />

        <label>City & State</label>
        <br />

        <input
          value={data.address2}
          onChange={(e) => setData({ ...data, address2: e.target.value })}
        />
        <br />
        <label>Customer Name</label>
        <br />

        <input
          value={data.clientName}
          onChange={(e) => setData({ ...data, clientName: e.target.value })}
        />
        <br />
        <label>Customer Address</label>
        <br />

        <input
          value={data.clientAddress}
          onChange={(e) => setData({ ...data, clientAddress: e.target.value })}
        />
        <br />
        <label>Description</label>
        <br />

        <input
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <br />
        {/* `<label>Hours</label>
        <input
          value={data.hours}
          onChange={(e) => setData({ ...data, hours: e.target.value })}
        />
        <br />
        <label>Quantity</label>
        <input
          value={data.quantity}
          onChange={(e) => setData({ ...data, quantity: e.target.value })}
        />
        <br />` */}
        <label>Tax</label>
        <br />

        <input
          placeholder="%"
          value={data.tax}
          onChange={(e) => setData({ ...data, tax: e.target.value })}
        />
        <br />
        {/* <label>Payment Terms</label>
        <input
          value={data.paymentTerms}
          onChange={(e) => setData({ ...data, paymentTerms: e.target.value })}
        />
        <br /> */}
        <label>Price of Job/Service</label>
        <br />

        <input
          value={data.totalPrice}
          onChange={(e) => setData({ ...data, totalPrice: e.target.value })}
        />{" "}
        <br />
        Upload a logo{" "}
        <FileBase
          id="upload logo"
          type="file"
          multiple={false}
          onDone={({ base64 }) => setData({ ...data, selectedFile: base64 })}
        />{" "}
        <br />
        <button className="invoiceButton" type="submit">Create Invoice</button>
        
        <button className="pdfButton" onClick={downloadPDF}>Download PDF</button>

      </form></div>
      {/* <div>
        <form>
          <input
            placeholder="Enter Invoice Number"
            value={search.invoiceNumber}
            onChange={(e) => {
              setSearch({ ...search, invoiceNumber: e.target.value });
            }}
          />
          <button onClick={handlePastDue}>Search By Invoice</button>
        </form>
      </div>
      <div>
        <form>
          <input
            placeholder="Enter Customer Name"
            value={searchName.name}
            onChange={(e) => {
              setSearchName({
                ...searchName,
                name: e.target.value,
              });
            }}
          />
          <button onClick={handleSearchByName}>Search By Name</button>
        </form>
      </div>

      <div>
        {showInvoiceResults
          ? searchResultsState.map((results) => (
              <h2 key={results._id}>
                Invoice Number: {results.invoiceNumber} <br />
                Company Name: {results.name}
                <br />
                Description: {results.description}
                <br />
                Hours: {results.hours}
                <br />
                Rate: {results.rate}
                <br />
                Total: {results.total}
                <br />
                Status: {results.pastDue ? "Past Due!" : "Current"}
              </h2>
            ))
          : ""}
      </div>
      <div>
        {showCustomerResults
          ? arrayGrab.map((results) => (
              <h2 key={results._id}>
                Invoice Number: {results.invoiceNumber} <br />
                Company Name: {results.name}
                <br />
                Description: {results.description}
                <br />
                Hours: {results.hours}
                <br />
                Rate: {results.rate}
                <br />
                Total: {results.total}
                <br />
                Status: {results.pastDue ? "Past Due!" : "Current"}
              </h2>
            ))
          : ""}
      </div> */}
    </div>
  );
}
