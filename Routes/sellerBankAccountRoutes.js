const sellerBankAccountController = require('../controllers/sellerBankAccountController')

const router = require('express').Router()

router.post('/add', sellerBankAccountController.add)
router.get('/getAllBankDetails', sellerBankAccountController.getAllBankDetails)
router.get(
  '/getUserBankDetails/:id',
  sellerBankAccountController.getUserBankDetails
)
router.delete(
  '/deleteBankDetailsById/:id',
  sellerBankAccountController.deleteBankDetailsById
)
module.exports = router
