const  invoiceModel = require ("../models/mainModel.js");
const auth = require ("../middleware/auth.js");

module.exports.createInvoice = async (req, res) => {
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

module.exports.getInvoice = async (req, res) => {
 

  try {
    const getInvoice = await invoiceModel.find().sort({'_id':-1}).limit(1)
    res.status(200).json(getInvoice);
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteInvoice = async (req, res) => {
  try {
    const deleteQuery = await invoiceModel.findOneAndDelete({
      _id: req.params.id,
    });
    console.log(req.params.id);
    res.status(200).json(deleteQuery);
  } catch (error) {
    console.log(error);
  }
};

