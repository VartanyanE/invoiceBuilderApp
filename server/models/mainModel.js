const mongoose = require("mongoose");
const moment = require("moment");

// we build our schema

const invoiceSchema = mongoose.Schema({
  invoiceNumber: Number,
  name: "String",
  address: "String",
  address2: "String",
  paymentTerms: Number,
  dueDate: {
    type: Date,
    default: moment().format("L"),
  },
  clientName: "String",
  clientEmail: "String",
  clientNumber: Number,
  clientAddress: "String",
  description: "String",  
  item: [],
  quantity: Number,
  rate: Number,
  hours: Number,
  tax: Number,
  preTax: Number,
  total: Number,
  thankYouMessage: "String",
  dueInSeven: Boolean,
  pastDue: false,
  selectedFile: "String",
  selectedLogo: "String",
  creator: "String",
  createdAt: {
    type: Date,
    default: moment().format("L"),
  },
});
// turn our schema into a model
const invoiceModel = mongoose.model("Invoice", invoiceSchema);
// export our model to our controller
module.exports = invoiceModel;
