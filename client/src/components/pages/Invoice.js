import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { createInvoice } from "../../utils/API";
import UserContext from "../../context/UserContext";
import { saveAs } from "file-saver";

export default function Invoice() {
  const { userData } = useContext(UserContext);

  const [data, setData] = useState([{}]);
  // useEffect(() => {
  //   const getData = async () => {
  //     await setData({ ...data, creator: userData.user.id });
  //   };
  //   getData();
  // }, []);
  console.log(data);
  const handleSubmit = async (event) => {
    event.preventDefault();

    await createInvoice({
      name: data.name,
      dueDate: data.dueDate,
      description: data.description,
      hours: data.hours,
      rate: data.rate,
      creator: userData.user.id,
    });
  };

  const downloadPDF = async () => {
    await axios
      .post("/create-pdf", data)
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
        <label>Due Date</label>
        <input
          value={data.dueDate}
          onChange={(e) => setData({ ...data, dueDate: e.target.value })}
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
        />
        <br />
        <button type="submit">Submit Data</button>
        <br />
      </form>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
}
