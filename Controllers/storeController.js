const db = require('../models')
const Store = db.stores
const Catergory = db.catergories
const cloudinary = require('../Middlewares/cloudinary')
//  register store
const register = async (req, res) => {
  const path = req.file.path
  let info = {
    name: req.body.name,
    description: req.body.description,
    userId: req.body.userId,
  }
  const catergoryId = req.body.catergoryId

  let catergoryInfo = await Catergory.findOne({
    where: { categoryID: catergoryId },
  })
  await Store.create(info).then((store) => {
    store
      .addCategories(catergoryInfo)
      .then(async (store) => {
        await cloudinary.uploader
          .upload(path)
          .then(async (result) => {
            await Store.update(
              { image: result.secure_url, cloudinary_id: result.public_id },
              { where: { storeId: store[0]?.dataValues?.storeStoreId } }
            )
              .then((response) => {
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
            // console.log('response')
            res.status(500).send(err)
          })
      })
      .catch((err) => {
        console.log('response')
        res.status(200).send(err)
      })
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
          message: 'Cant find the store',
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
//delete store picture
const deleteStorePicture = async (req, res) => {
  let id = req.params.id
  let path = null
  await Store.findOne({ where: { storeId: id } })
    .then((store) => {
      cloudinary.uploader
        .destroy(store.dataValues.cloudinary_id)
        .then((response) => {
          if (response.result == 'ok') {
            Store.update(
              { image: null, cloudinary_id: null },
              { where: { storeId: id } }
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
  register,
  getAllStores,
  getStoreById,
  updateStoreById,
  deleteStoreById,
  getAllStoresByUserId,
  deleteStorePicture,
}
