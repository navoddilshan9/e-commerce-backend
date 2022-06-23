const Sequelize = require('sequelize')
const sequelize = require('../database')

const Order = sequelize.define('order', {
  orderID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  TotalPrice: Sequelize.DOUBLE,
  quantity: Sequelize.INTEGER,
  placeDate: Sequelize.DATE,
})

module.exports = Order
