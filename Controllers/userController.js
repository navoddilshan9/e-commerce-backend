const db = require('../models')
const bcrypt = require('bcrypt')

const User = db.users

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

const register = async (req, res) => {
  //bcrtpy password

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

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
      await User.create(info).then((user) => {
        res.status(200).json({
          status: true,
          meesage: 'new user added',
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
module.exports = {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
  register,
}
