module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('cart', {
    cartId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  })
  return Cart
}
