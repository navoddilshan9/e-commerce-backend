const db = require('../models')
const BankDetails = db.bankDetails

//  register store
const add = async (req, res) => {
  let info = {
    accountNo: req.body.accountNo,
    bankName: req.body.bankName,
    branchName: req.body.branchName,
    userId: req.body.userId,
  }
  BankDetails.create(info)
    .then((store) => {
      res.status(200).send(store)
    })
    .catch((err) => {
      res.status(200).send(err)
    })
}

// Get all store
const getAllBankDetails = async (req, res) => {
  await BankDetails.findAll({})
    .then((details) => {
      res.status(200).send(details)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}

//Get bank details by user ID
const getUserBankDetails = async (req, res) => {
  let id = req.params.id
  await BankDetails.findAll({
    where: { userId: id },
  })
    .then((products) => {
      res.status(200).send(products)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}
const deleteBankDetailsById = async (req, res) => {
  let id = req.params.id
  await BankDetails.destroy({ where: { dId: id } })
    .then((status) => {
      if (status != 0) {
        res.status(200).json({
          status: true,
          message: 'success',
        })
      } else {
        res.status(200).json({
          status: false,
          message: 'Invalid bank detail id',
        })
      }
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}
module.exports = {
  add,
  getAllBankDetails,
  getUserBankDetails,
  deleteBankDetailsById,
}
