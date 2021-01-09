const mongoose = require ("mongoose");

// we build our schema
const invoiceSchema = mongoose.Schema({
  name: "String",
  dueDate: "String",
  description: "String",
  hours: Number,
  rate: Number,
  creator: "String",
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
// turn our schema into a model
const invoiceModel = mongoose.model("Invoice", invoiceSchema);
// export our model to our controller
module.exports = invoiceModel;
