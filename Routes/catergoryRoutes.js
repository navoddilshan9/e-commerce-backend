const catergoryController = require('../controllers/catergoryController')

const router = require('express').Router()
router.post('/add', catergoryController.add)
router.get('/getAllCatergories', catergoryController.getAllCatergories)
router.get('/getCatergoryById/:id', catergoryController.getCatergoryById)
router.get(
  '/getStoresbyCatergoryId/:id',
  catergoryController.getStoresbyCatergoryId
)
router.put('/updateCatergoryById/:id', catergoryController.updateCatergoryById)
router.delete(
  '/deleteCatergoryById/:id',
  catergoryController.deleteCatergoryById
)
module.exports = router
