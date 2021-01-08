import mongoose from "mongoose";

// we build our schema
const invoiceSchema = mongoose.Schema({
  name: "String",
  dueDate: "String",
  description: "String",
  hours: Number,
  rate: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
// turn our schema into a model
const invoiceModel = mongoose.model("Invoice", invoiceSchema);
// export our model to our controller
export default invoiceModel;
