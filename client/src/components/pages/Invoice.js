import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { createInvoice, getInvoice, searchInvoice } from "../../utils/API";
import UserContext from "../../context/UserContext";
import { saveAs } from "file-saver";
import FileBase from "react-file-base64";
import moment from "moment";

export default function Invoice() {
  const { userData } = useContext(UserContext);

  const [data, setData] = useState([{}]);
  const [invoice, setInvoice] = useState();
  const [search, setSearch] = useState({
    invoiceNumber: "",
  });
  const [searchResultsState, setSearchResultsState] = useState(null);
  useEffect(() => {
    getInvoice().then((res) => {
      setInvoice(res.data);
    });
  }, [data]);

  useEffect(() => {
    searchInvoice(search.invoiceNumber).then(({ data }) =>
      setSearchResultsState(data)
    );
  }, [search]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = moment();
    const invoiceDueDate = moment().add(30, "days");
    const dueInSeven = moment().add(7, "days");
    let isDueInSeven = false;
    let isPastDue = false;
    if(currentDate.isBetween(dueInSeven)) {
      isDueInSeven = true;
    }
    if(currentDate.isAfter(invoiceDueDate)) {
      isPastDue = true;
    }
    

    let totalPrice = data.hours * data.rate;
    let randomInvoiceNumber = getRandomInt(9999, 100000);
    await createInvoice({
      invoiceNumber: randomInvoiceNumber,
      name: data.name,
      dueDate: invoiceDueDate,
      pastDue: isPastDue,
      dueInSeven: isDueInSeven,
      description: data.description,
      hours: data.hours,
      rate: data.rate,
      total: totalPrice,
      selectedFile: data.selectedFile,
      creator: userData.user.id,
    });
    await clearForm();
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await searchInvoice(search.invoiceNumber).then(({ data }) =>
      setSearchResultsState(data)
    );
    await console.log(searchResultsState);
  };

  const clearForm = () => {
    setData({
      name: "",

      description: "",
      hours: "",
      rate: "",
    });
  };

  const downloadPDF = async () => {
    console.log(invoice);
    let invoiceObject = {
      invoiceNumber: invoice[0].invoiceNumber,
      name: invoice[0].name,
      dueDate: invoice[0].dueDate,
      description: invoice[0].description,
      hours: invoice[0].hours,
      rate: invoice[0].rate,
      total: invoice[0].total,
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <br />
        <label>Description</label>
        <input
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <br />
        <label>Hours</label>
        <input
          value={data.hours}
          onChange={(e) => setData({ ...data, hours: e.target.value })}
        />
        <br />
        <label>Rate</label>
        <input
          value={data.rate}
          onChange={(e) => setData({ ...data, rate: e.target.value })}
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
        <button type="submit">Submit Data</button>
        <br />
      </form>
      <button onClick={downloadPDF}>Download PDF</button>
      <div>
        <form onSubmit={handleSearch}>
          <input
            placeholder="Enter Invoice Number"
            value={search.invoiceNumber}
            onChange={(e) => {
              setSearch({ ...search, invoiceNumber: e.target.value });
            }}
          />
          {/* <button type="submit>">Search</button> */}
        </form>
      </div>

      <div>
        {searchResultsState
          ? searchResultsState.map((results) => (
              <h2>
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
                PastDue: {results.pastDue ? "Yes" : "No"}
              </h2>
            ))
          : ""}
      </div>
    </div>
  );
}
