const storeController = require('../controllers/storeController')
const upload = require('../Middlewares/multer')
const router = require('express').Router()

router.post('/register', upload.single('image'), storeController.register)
router.get('/getAllStores', storeController.getAllStores)
router.get('/getStoreById/:id', storeController.getStoreById)
router.put('/updateStoreById/:id', storeController.updateStoreById)
router.delete('/deleteStoreById/:id', storeController.deleteStoreById)
router.get('/getAllStoresByUserId/:id', storeController.getAllStoresByUserId)
router.delete('/deleteStorePicture/:id', storeController.deleteStorePicture)

module.exports = router
