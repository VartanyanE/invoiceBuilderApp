const invoiceModel = require("../models/mainModel.js");
const auth = require("../middleware/auth.js");
const moment = require("moment");
const { db } = require("../models/mainModel.js");

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
    const getInvoice = await invoiceModel.find().sort({ _id: -1 }).limit(1);

    res.status(200).json(getInvoice);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getLogo = async (req, res) => {
  try {
    const getLogo = await invoiceModel.find({}, { selectedFile: true });

    res.status(200).json(getLogo);
  } catch (error) {
    console.log(error);
  }
};

module.exports.searchInvoice = async (req, res) => {
  try {
    //run .find() on our model
    const searchPayload = await invoiceModel.find({
      invoiceNumber: req.params.common_invoice_number,
    });

    res.status(200).json(searchPayload);
  } catch (error) {
    console.log(error);
  }
};

module.exports.searchByName = async (req, res) => {
  try {
    //run .find() on our model
    const searchName = await invoiceModel.find({
      name: req.params.name.toUpperCase(),
    });

    res.status(200).json(searchName);
  } catch (error) {
    console.log(error);
  }
};

module.exports.isPastDue = async (req, res) => {
  try {
    const changePastDue = await invoiceModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          pastDue: true,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(changePastDue);
  } catch (error) {
    console.log(error);
  }
};

module.exports.dueInSeven = async (req, res) => {
  try {
    const changePastDue = await invoiceModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          dueInSeven: true,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(changePastDue);
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
