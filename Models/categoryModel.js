module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    catergoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  return Category
}
