const db = require('../models')
const Catergory = db.catergories
const add = async (req, res) => {
  let info = {
    catergoryName: req.body.catergoryName,
    picture: req.body.picture,
  }
  Catergory.create(info)
    .then((store) => {
      res.status(200).send(store)
    })
    .catch((err) => {
      res.status(200).send(err)
    })
}
// Get all catergories
const getAllCatergories = async (req, res) => {
  await Catergory.findAll({})
    .then((catergories) => {
      res.status(200).send(catergories)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}
//  Delete Catergory by ID
const deleteCatergoryById = async (req, res) => {
  let id = req.params.id
  await Catergory.destroy({ where: { categoryID: id } })
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
//  update store by ID
const updateCatergoryById = async (req, res) => {
  let id = req.params.id
  await Catergory.update(req.body, { where: { categoryID: id } })
    .then((store) => {
      if (store == 1) {
        res.status(200).json({
          status: true,
          message: 'Updated catergory',
        })
      } else {
        res.status(200).json({
          status: false,
          message: 'Cant find the catergory',
        })
      }
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}
//Get store by ID
const getCatergoryById = async (req, res) => {
  let id = req.params.id
  await Catergory.findOne({
    where: { categoryID: id },
  })
    .then((stores) => {
      res.status(200).send(stores)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}
module.exports = {
  add,
  getAllCatergories,
  deleteCatergoryById,
  updateCatergoryById,
  getCatergoryById,
}
