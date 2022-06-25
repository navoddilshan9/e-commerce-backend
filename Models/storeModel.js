module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('store', {
    storeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
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
  return Store
}
