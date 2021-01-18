const express = require('express');
const { createInvoice, deleteInvoice, getInvoice, searchInvoice, isPastDue } = require ("../controllers/mainController.js");
const auth = require("../middleware/auth.js");

// import {
//   getData,
//   createData,
//   editData,
//   deleteData,
//   likeCount,
//   getLikes,
//   searchResults,
// } from "../controllers/crudController.js";
const router = express.Router();

// specify the endpoints and the functions we want to call
router.get("/", getInvoice);
// router.get("/:id", getLikes);
router.get("/search/:common_invoice_number", searchInvoice);

router.post("/", createInvoice);
router.delete("/delete/:id", deleteInvoice);

// router.put("/:id", editData);
router.patch("/:id", isPastDue);
// router.delete("/:id", deleteData);

// export to our server.js file
module.exports = router;
