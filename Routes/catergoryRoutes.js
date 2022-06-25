const catergoryController = require('../controllers/catergoryController')

const router = require('express').Router()
router.post('/add', catergoryController.add)
router.get('/getAllCatergories', catergoryController.getAllCatergories)
router.get('/getCatergoryById/:id', catergoryController.getCatergoryById)
router.delete(
  '/deleteCatergoryById/:id',
  catergoryController.deleteCatergoryById
)
router.put('/updateCatergoryById/:id', catergoryController.updateCatergoryById)
module.exports = router
