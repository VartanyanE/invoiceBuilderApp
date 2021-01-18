const mongoose = require("mongoose");
const moment = require("moment");



// we build our schema

const invoiceSchema = mongoose.Schema({
  invoiceNumber: Number,
  name: "String",
  dueDate:  {
    type: Date,
    default: moment().format("L"),
  },
  pastDue: Boolean,
  description: "String",
  hours: Number,
  quantity: Number,
  rate: Number,
  tax: Number,
  paymentTerms: Number,
  total: Number,
  pastDue: false,
 
  selectedFile: "String",
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
