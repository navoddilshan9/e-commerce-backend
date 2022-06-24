const storeController = require('../controllers/storeController')

const router = require('express').Router()

router.post('/register', storeController.register)
router.get('/getAllStores', storeController.getAllStores)
router.get('/getStoreById/:id', storeController.getStoreById)
router.put('/updateStoreById/:id', storeController.updateStoreById)
router.delete('/deleteStoreById/:id', storeController.deleteStoreById)
router.get('/getAllStoresByUserId/:id', storeController.getAllStoresByUserId)

module.exports = router
