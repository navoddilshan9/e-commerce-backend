module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('store', {
    storeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.INTEGER,
    },
    picture: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  return Store
}
