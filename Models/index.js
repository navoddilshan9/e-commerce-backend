const dbConfig = require('../Config/dbConfig')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    acquire: dbConfig.acquire,
    idle: dbConfig.idle,
  },
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected......')
  })
  .catch((err) => {
    console.log('Error ' + err)
  })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel')(sequelize, DataTypes)
db.payments = require('./paymentModel.js')(sequelize, DataTypes)
db.carts = require('./cartModel')(sequelize, DataTypes)

db.sequelize
  .sync({ force: false })
  //db.sequelize.sync({force:false})
  .then(() => {
    console.log('re-synced ...')
  })

module.exports = db
