const paymentController = require('../controllers/paymentController.js')

const router = require('express').Router()

router.post('/pay', paymentController.pay)

module.exports = router
