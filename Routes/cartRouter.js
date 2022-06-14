const cartController = require('../controllers/cartController')

const router = require('express').Router()

router.post('/addCart', cartController.addCart)
router.post('/getCartByCustomerId', cartController.getCartByCustomerId)
router.post('/getCartById', cartController.getCartById)
router.get('/getAllCarts', cartController.getAllCarts)
router.delete('/deleteCartById/:id', cartController.deleteCartById)

module.exports = router
