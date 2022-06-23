const Sequelize = require('sequelize')

const sequelize = require('../database')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  FName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  MName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  LName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Role: {
    typeof: Sequelize.STRING,
    allowNull: false,
  },
  Location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  town: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = User
