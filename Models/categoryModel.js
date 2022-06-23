const Sequelize = require('sequelize')
const sequelize = require('../database')

const Category = sequelize.define('category', {
  categoryID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  categoryName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Category
