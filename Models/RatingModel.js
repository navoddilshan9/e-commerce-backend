module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('rating', {
    RatingID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    //UseID is also a primary key in here, key(RatingID,UserID) <- weak Entity
    NumericRating: DataTypes.INTEGER,
    DateofRating: DataTypes.DATE,
    Comment: DataTypes.STRING,
  })
  return Rating
}
