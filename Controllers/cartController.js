const db = require('../models')
const Cart = db.carts

// Get  cart
const addCart = async (req, res) => {
  let info = {
    qty: req.body.qty,
    unitPrice: req.body.unitPrice,
    itemId: req.body.itemId,
    customerId: req.body.customerId,
  }

  await Cart.create(info)
    .then((cart) => res.status(200).send(cart))
    .catch((err) => {
      res.status(500).send(err)
      console.log(err)
    })
}
// Get  cart by id
const getCartById = async (req, res) => {
  let cartId = req.body.cartId
  await Cart.findOne({ where: { cartId: cartId } })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
// Get cart by customer id
const getCartByCustomerId = async (req, res) => {
  let customerId = req.body.customerId
  await Cart.findAll({ where: { customerId: customerId } })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

// Get all reviews
const getAllCarts = async (req, res) => {
  await Cart.findAll({})
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

//  Delete cart by id
const deleteCartById = async (req, res) => {
  let cartId = req.params.id
  await Cart.destroy({ where: { cartId: cartId } })
    .then((data) => {
      if (data != 0) {
        res.status(200).send('Success')
      } else {
        res.status(200).send('Error')
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

module.exports = {
  addCart,
  getCartByCustomerId,
  getCartById,
  getAllCarts,
  deleteCartById,
}
