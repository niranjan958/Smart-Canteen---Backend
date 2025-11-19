module.exports = (sequelize, DataTypes) => {
  return sequelize.define('SaleItem', {
    itemName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2),
    subtotal: DataTypes.DECIMAL(10,2)
  });
};