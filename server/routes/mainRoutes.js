const express = require("express");
const {
  createInvoice,
  deleteInvoice,
  getInvoice,
  searchInvoice,
  isPastDue,
  dueInSeven,
  searchByName,
} = require("../controllers/mainController.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// specify the endpoints and the functions we want to call
router.get("/", getInvoice);
// router.get("/:id", getLikes);
router.get("/search/:common_invoice_number", searchInvoice);
router.get("/search/byname/:name", searchByName);

router.post("/", createInvoice);
router.delete("/delete/:id", deleteInvoice);

// router.put("/:id", editData);
router.patch("/:id", isPastDue);
router.patch("/:id", dueInSeven);

// router.delete("/:id", deleteData);

// export to our server.js file
module.exports = router;
