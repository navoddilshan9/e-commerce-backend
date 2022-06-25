const db = require('../models')
const bcrypt = require('bcrypt')
const User = db.users
const cloudinary = require('../Middlewares/cloudinary')
const register = async (req, res) => {
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const path = req.file.path
  let info = {
    userName: req.body.userName,
    password: hashedPassword,
    email: req.body.email,
    FName: req.body.firstName,
    MName: req.body.middleName,
    LName: req.body.lastName,
    Role: req.body.role,
    Location: req.body.location,
    street: req.body.street,
    number: req.body.number,
    town: req.body.town,
  }
  await User.findOne({
    where: { email: req.body.email },
  }).then(async (user) => {
    if (user == null) {
      await User.create(info).then(async (user) => {
        await cloudinary.uploader
          .upload(path)
          .then((result) => {
            User.update(
              { image: result.secure_url, cloudinary_id: result.public_id },
              { where: { id: user.id } }
            )
              .then((response) => {
                console.log(response)
                if (response != 0) {
                  res.status(200).json({
                    status: true,
                    meesage: 'new user added',
                  })
                } else {
                  res.status(200).json({
                    status: false,
                    meesage: 'Cloudinary error',
                  })
                }
              })
              .catch((err) => {
                res.status(200).json({
                  status: false,
                  meesage: 'Error',
                })
              })
          })
          .catch((err) => {
            res.status(500).send(err)
          })
      })
    } else {
      res.status(200).json({
        status: false,
        meesage: 'excisting user',
      })
    }
  })
}
// Get all users
const getAllUser = async (req, res) => {
  await User.findAll({})
    .then((users) => {
      res.status(200).send(users)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}

//Get user by ID
const getUserById = async (req, res) => {
  let id = req.params.id
  await User.findOne({
    where: { id: id },
  })
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}

//  update user by ID

const updateUserById = async (req, res) => {
  let id = req.params.id
  await User.update(req.body, { where: { id: id } })
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}

//  Delete user by ID
const deleteUserById = async (req, res) => {
  let id = req.params.id
  await User.destroy({ where: { id: id } })
    .then((status) => {
      if (status != 0) {
        res.status(200).json({
          status: true,
          message: 'success',
        })
      } else {
        res.status(200).json({
          status: false,
          message: 'Invalid user id',
        })
      }
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}
const login = async (req, res) => {
  let email = req.body.email
  let password = req.body.password

  await User.findOne({
    where: { email: email },
  }).then(async (user) => {
    if (user == null) {
      res.status(200).json({
        status: false,
        message: 'Cannot find user',
      })
    } else {
      if (await bcrypt.compare(password, user.password)) {
        res.status(200).json({
          status: true,
          role: user.Role,
        })
      } else {
        res.status(200).json({
          status: false,
        })
      }
    }
  })
}

//delete profile picture
const deleteProfilePicture = async (req, res) => {
  let id = req.params.id
  let path = null
  await User.findOne({ where: { id: id } })
    .then((user) => {
      cloudinary.uploader
        .destroy(user.dataValues.cloudinary_id)
        .then((response) => {
          if (response.result == 'ok') {
            User.update(
              { image: null, cloudinary_id: null },
              { where: { id: id } }
            )
              .then(() => {
                console.log('deleted')
                res.status(200).send('Success')
              })
              .catch((err) => {
                console.log('deleted')
                res.status(200).send(err)
              })
          } else {
            res.status(200).send('Failed')
          }
        })
        .catch((err) => {
          res.status(500).send('nothing to delete')
        })
    })
    .catch((err) => {
      res.status(500).send('error')
    })
}
module.exports = {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
  register,
  deleteProfilePicture,
}
