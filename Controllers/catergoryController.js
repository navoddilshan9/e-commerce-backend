const db = require('../models')
const Catergory = db.catergories
const Store = db.storess
const cloudinary = require('../Middlewares/cloudinary')

const add = async (req, res) => {
  const path = req.file.path
  let info = {
    catergoryName: req.body.catergoryName,
    picture: req.body.picture,
  }
  Catergory.create(info)
    .then(async (category) => {
      await cloudinary.uploader
        .upload(path)
        .then((result) => {
          Catergory.update(
            { image: result.secure_url, cloudinary_id: result.public_id },
            { where: { categoryID: category.categoryID } }
          )
            .then((response) => {
              console.log(response)
              if (response != 0) {
                res.status(200).json({
                  status: true,
                  meesage: 'new store added',
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
      // res.status(200).send(store)
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
//Get Catergory by ID
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
const getStoresbyCatergoryId = async (req, res) => {
  let id = req.params.id
  await Catergory.findAll({
    where: { categoryID: id },
    include: [
      {
        model: Store,
      },
    ],
  })
    .then((stores) => {
      res.status(200).send(stores)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}

//delete catergory picture
const deleteCatergoryPicture = async (req, res) => {
  let id = req.params.id
  let path = null
  await Catergory.findOne({ where: { categoryID: id } })
    .then((catergory) => {
      cloudinary.uploader
        .destroy(catergory.dataValues.cloudinary_id)
        .then((response) => {
          if (response.result == 'ok') {
            Catergory.update(
              { image: null, cloudinary_id: null },
              { where: { categoryID: id } }
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
      res.status(500).send('err')
    })
}
module.exports = {
  add,
  getAllCatergories,
  deleteCatergoryById,
  updateCatergoryById,
  getCatergoryById,
  getStoresbyCatergoryId,
  deleteCatergoryPicture,
}
