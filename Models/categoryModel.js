module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    catergoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    cloudinary_id: {
      type: DataTypes.STRING,
    },
  })
  return Category
}
