module.exports = (sequelize, DataTypes) => {
  const SellerBankAccount = sequelize.define('sellerBankAccount', {
    dId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    accountNo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  return SellerBankAccount
}
