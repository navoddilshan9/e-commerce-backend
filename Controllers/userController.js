const db = require('../models')
const bcrypt = require('bcrypt')

const User = db.users

// Get all users
const getAllUser = async (req, res) => {
  let users = await User.findAll({
    include: [
      {
        model: Role,
      },
    ],
  })
  res.status(200).send(users)
}

//Get user by ID
const getUserById = async (req, res) => {
  let id = req.body.id
  let user = await User.findOne({
    where: { uId: id },
    include: [
      {
        model: Role,
      },
    ],
  })
  res.status(200).send(user)
}

//  update user by ID

const updateUserById = async (req, res) => {
  let id = req.params.id
  const user = await User.update(req.body, { where: { uId: id } })
  res.status(200).send(user)
}

//  Delete user by ID
const deleteUserById = async (req, res) => {
  let id = req.params.id
  const status = await User.destroy({ where: { uId: id } })
    .then((data) => {
      if (status != 0) {
        res.status(200).send('Success')
      } else {
        res.status(200).send('Error')
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
    include: [
      {
        model: Role,
      },
    ],
  }).then((user) => {
    console.log(res)
    if (user == null) {
      res.status(200).send('Cannot find user')
    } else {
      res.status(200).json({
        status: true,

        // userId: user.uId,
        // currency: user.currency,
        // admin: user.role.admin,
        // hotelAdmin: user.role.hotelAdmin,
        // customer: user.role.customer,
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
}
