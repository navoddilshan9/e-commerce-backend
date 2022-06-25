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
db.stores = require('./storeModel')(sequelize, DataTypes)
db.products = require('./productModel')(sequelize, DataTypes)
db.payments = require('./paymentModel.js')(sequelize, DataTypes)
db.carts = require('./cartModel')(sequelize, DataTypes)
db.catergories = require('./categoryModel')(sequelize, DataTypes)
db.bankDetails = require('./sellerBankAccountModel')(sequelize, DataTypes)
//=================================================================
//                     Associations
//=================================================================

//one-to-one
db.users.hasOne(db.stores, {
  onDelete: 'cascade',
})
db.stores.belongsTo(db.users)

db.users.hasOne(db.bankDetails, {
  onDelete: 'cascade',
})
db.bankDetails.belongsTo(db.users)
//one-to-many
db.stores.hasMany(db.products, {
  onDelete: 'cascade',
})
db.products.belongsTo(db.stores)

//many-to-many
db.stores.belongsToMany(db.catergories, {
  through: 'Store_Catergory',
  onDelete: 'cascade',
})
db.catergories.belongsToMany(db.stores, {
  through: 'Store_Catergory',
  onDelete: 'cascade',
})

//=================================================================
//     If you want to drop all tables,change the force as true
//=================================================================
db.sequelize
  .sync({ force: false })
  //db.sequelize.sync({force:false})
  .then(() => {
    console.log('re-synced ...')
  })

module.exports = db
