module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    orderID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    TotalPrice: DataTypes.DOUBLE,
    quantity: DataTypes.INTEGER,
    placeDate: DataTypes.DATE,
  })
  return Order
}
