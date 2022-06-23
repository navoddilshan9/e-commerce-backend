const Sequelize = require('sequelize')
const sequelize = require('../database')

const SellerBankAccount = sequelize.define('sellerBankAccount', {
  AccountNo: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  BankName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  BranchName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = SellerBankAccount
