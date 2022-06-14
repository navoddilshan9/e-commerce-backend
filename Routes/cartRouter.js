const cartController = require('../controllers/cartController')

const router = require('express').Router()

router.post('/addCartItem', cartController.addCartItem)

module.exports = router
