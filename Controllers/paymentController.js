const db = require('../models')
const Payment = db.PaymentModel
const pay = async (req, res) => {
  res.send('success')
}

module.exports = { pay }
