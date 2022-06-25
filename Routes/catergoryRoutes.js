const catergoryController = require('../controllers/catergoryController')
const upload = require('../Middlewares/multer')
const router = require('express').Router()

router.post('/add', upload.single('image'), catergoryController.add)
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
router.delete(
  '/deleteCatergoryPicture/:id',
  catergoryController.deleteCatergoryPicture
)
module.exports = router
