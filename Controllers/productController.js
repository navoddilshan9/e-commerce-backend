const db = require('../models')
const Product = db.products
const cloudinary = require('../Middlewares/cloudinary')

const add = async (req, res) => {
  const path = req.file.path
  let info = {
    productName: req.body.productName,
    price: req.body.price,
    description: req.body.description,
    stockQty: req.body.stockQty,
    storeStoreId: req.body.storeId,
  }
  Product.create(info)
    .then(async (product) => {
      await cloudinary.uploader
        .upload(path)
        .then(async (result) => {
          await Product.update(
            { image: result.secure_url, cloudinary_id: result.public_id },
            { where: { productId: product.productId } }
          )
            .then((response) => {
              console.log(response)
              if (response != 0) {
                res.status(200).json({
                  status: true,
                  meesage: 'new product added',
                })
              } else {
                res.status(200).json({
                  status: false,
                  meesage: 'Cloudinary error',
                })
              }
            })
            .catch((err) => {
              res.status(200).json({
                status: false,
                meesage: 'Error',
              })
            })
        })
        .catch((err) => {
          res.status(500).send(err)
        })
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

//delete product image picture
const deleteProductPicture = async (req, res) => {
  let id = req.params.id
  let path = null
  await Product.findOne({ where: { productId: id } })
    .then((product) => {
      cloudinary.uploader
        .destroy(product.dataValues.cloudinary_id)
        .then((response) => {
          if (response.result == 'ok') {
            Product.update(
              { image: null, cloudinary_id: null },
              { where: { productId: id } }
            )
              .then(() => {
                console.log('deleted')
                res.status(200).send('Success')
              })
              .catch((err) => {
                console.log('deleted')
                res.status(200).send(err)
              })
          } else {
            res.status(200).send('Failed')
          }
        })
        .catch((err) => {
          res.status(500).send('nothing to delete')
        })
    })
    .catch((err) => {
      res.status(500).send('err')
    })
}
module.exports = {
  add,
  getAllProducts,
  getProductById,
  getProductByStore,
  deleteProduct,
  deleteProductPicture,
}
