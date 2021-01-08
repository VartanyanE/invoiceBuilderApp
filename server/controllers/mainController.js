import invoiceModel from "../models/mainModel.js";

export const createInvoice = async (req, res) => {
  // our data from the frontend
  const frontEnd = req.body;
  // create a new document on our model
  const newInvoice = new invoiceModel(frontEnd);

  try {
    // run .save() on our model
    await newInvoice.save();
    // return status and send our payload in the response
    res.status(200).json(newInvoice);
  } catch (error) {
    console.log(error);
  }
};
