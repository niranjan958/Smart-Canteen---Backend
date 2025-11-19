module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    companyName: DataTypes.STRING,
    totalAmount: DataTypes.DECIMAL(10,2),
    invoiceNo: DataTypes.STRING
  });
  return Sale;
};