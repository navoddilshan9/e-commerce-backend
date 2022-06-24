const db = require('../models')
const Store = db.stores

//  register store
const register = async (req, res) => {
  let info = {
    name: req.body.name,
    description: req.body.description,
    picture: 'path',
    userId: req.body.userId,
  }
  Store.create(info)
    .then((store) => {
      res.status(200).send(store)
    })
    .catch((err) => {
      res.status(200).send(err)
    })
}

// Get all store
const getAllStores = async (req, res) => {
  await Store.findAll({})
    .then((stores) => {
      res.status(200).send(stores)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}

//Get store by ID
const getStoreById = async (req, res) => {
  let id = req.params.id
  await Store.findOne({
    where: { storeId: id },
  })
    .then((store) => {
      res.status(200).send(store)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}
//Get store by ID
const getAllStoresByUserId = async (req, res) => {
  let id = req.params.id
  await Store.findAll({
    where: { userId: id },
  })
    .then((stores) => {
      res.status(200).send(stores)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}
//  update store by ID
const updateStoreById = async (req, res) => {
  let id = req.params.id
  await Store.update(req.body, { where: { storeId: id } })
    .then((store) => {
      if (store == 1) {
        res.status(200).json({
          status: true,
          message: 'Updated store',
        })
      } else {
        res.status(200).json({
          status: false,
          message: 'Cant find ther store',
        })
      }
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}

//  Delete store by ID
const deleteStoreById = async (req, res) => {
  let id = req.params.id
  await Store.destroy({ where: { storeId: id } })
    .then((status) => {
      if (status != 0) {
        res.status(200).json({
          status: true,
          message: 'success',
        })
      } else {
        res.status(200).json({
          status: false,
          message: 'Invalid store id',
        })
      }
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}
module.exports = {
  register,
  getAllStores,
  getStoreById,
  updateStoreById,
  deleteStoreById,
  getAllStoresByUserId,
}
