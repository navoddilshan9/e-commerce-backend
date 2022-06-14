const db = require('../models')
const Cart = db.carts
const addCartItem = async (req, res) => {
  res.send('success')
}

module.exports = { addCartItem }
