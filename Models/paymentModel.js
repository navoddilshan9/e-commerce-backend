module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('payment', {
    paymentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.REAL,
    },
  })
  return Payment
}
