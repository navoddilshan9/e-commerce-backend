const productController = require('../controllers/productController')

const router = require('express').Router()
router.post('/add', productController.add)
router.get('/getAllProducts', productController.getAllProducts)
router.get('/getProductById/:id', productController.getProductById)
router.get('/getProductByStore/:id', productController.getProductByStore)

module.exports = router
