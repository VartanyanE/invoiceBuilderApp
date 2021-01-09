const express = require("express");
const pdf = require("html-pdf");
const pdfTemplate = require("./documents/index.js");

const router = express.Router();

router.post("/", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

router.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

module.exports = router;
