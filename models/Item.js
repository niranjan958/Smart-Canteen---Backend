module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Item', {
    name: { type: DataTypes.STRING, unique: true },
    price: DataTypes.DECIMAL(10,2),
    unit: DataTypes.STRING,
    stock: { type: DataTypes.INTEGER, defaultValue: 100 }
  });
};