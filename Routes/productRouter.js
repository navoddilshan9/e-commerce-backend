const productController = require('../controllers/productController')
const upload = require('../Middlewares/multer')
const router = require('express').Router()

router.post('/add', upload.single('image'), productController.add)
router.get('/getAllProducts', productController.getAllProducts)
router.get('/getProductById/:id', productController.getProductById)
router.get('/getProductByStore/:id', productController.getProductByStore)
router.delete('/deleteProduct/:id', productController.deleteProduct)
router.delete(
  '/deleteProductPicture/:id',
  productController.deleteProductPicture
)

module.exports = router
