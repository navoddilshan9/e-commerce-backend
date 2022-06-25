const db = require('../models')
const Product = db.products
const add = async (req, res) => {
  let info = {
    pName: req.body.productName,
    price: req.body.price,
    description: req.body.description,
    stockQty: req.body.stockQty,
    storeStoreId: req.body.storeId,
  }
  Product.create(info)
    .then((store) => {
      res.status(200).send(store)
    })
    .catch((err) => {
      res.status(200).send(err)
    })
}
// Get all products
const getAllProducts = async (req, res) => {
  await Product.findAll({})
    .then((products) => {
      res.status(200).send(products)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}

//Get produc by ID
const getProductById = async (req, res) => {
  let id = req.params.id
  await Product.findOne({
    where: { productId: id },
  })
    .then((product) => {
      res.status(200).send(product)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}
//Get store by ID
const getProductByStore = async (req, res) => {
  let id = req.params.id
  await Product.findAll({
    where: { storeStoreId: id },
  })
    .then((products) => {
      res.status(200).send(products)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}

//Get store by ID
const deleteProduct = async (req, res) => {
  let id = req.params.id
  await Product.destroy({ where: { productId: id } })
    .then((status) => {
      if (status != 0) {
        res.status(200).json({
          status: true,
          message: 'success',
        })
      } else {
        res.status(200).json({
          status: false,
          message: 'Invalid product id',
        })
      }
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}
module.exports = {
  add,
  getAllProducts,
  getProductById,
  getProductByStore,
  deleteProduct,
}
