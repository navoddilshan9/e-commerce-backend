const Sequelize = require('sequelize')
const sequelize = require('../database')

const Rating = sequelize.define('rating', {
  RatingID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  //UseID is also a primary key in here, key(RatingID,UserID) <- weak Entity
  NumericRating: Sequelize.INTEGER,
  DateofRating: Sequelize.DATE,
  Comment: Sequelize.STRING,
})

module.exports = Rating
