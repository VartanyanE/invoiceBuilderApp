const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); const userRouter = require("./routes/userRoutes.js");
const invoiceRoutes = require("./routes/mainRoutes.js");
const pdfRoutes = require("./pdfRoutes.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/api/data", invoiceRoutes);
app.use("/create-pdf", pdfRoutes);

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server running on port Andre : ${PORT}..... yes it's an Outkast reference`
      )
    )
  )
  .catch((error) => console.log(error));
