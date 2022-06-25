const userController = require('../controllers/userController')
const upload = require('../Middlewares/multer')
const router = require('express').Router()

router.post('/login', userController.login)
router.post('/register', upload.single('image'), userController.register)
router.get('/getAllUsers', userController.getAllUser)
router.get('/getUserById/:id', userController.getUserById)
router.put('/updateUserById/:id', userController.updateUserById)
router.delete('/deleteUserById/:id', userController.deleteUserById)
router.post('/deleteProfilePicture', userController.deleteProfilePicture)
module.exports = router
