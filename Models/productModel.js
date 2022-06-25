module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    pName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.INTEGER,
    },
    stockQty: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    cloudinary_id: {
      type: DataTypes.STRING,
    },
  })
  return Product
}
