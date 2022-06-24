const userController = require('../controllers/userController')

const router = require('express').Router()

router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/getAllUsers', userController.getAllUser)
router.get('/getUserById/:id', userController.getUserById)
router.put('/updateUserById/:id', userController.updateUserById)
router.delete('/deleteUserById/:id', userController.deleteUserById)

module.exports = router
