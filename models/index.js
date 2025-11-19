const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const db = {};

// Import models with DataTypes passed correctly
db.User = require('./User')(sequelize, DataTypes);
db.Item = require('./Item')(sequelize, DataTypes);
db.Sale = require('./Sale')(sequelize, DataTypes);
db.SaleItem = require('./SaleItem')(sequelize, DataTypes);

// Associations
db.Sale.hasMany(db.SaleItem);
db.SaleItem.belongsTo(db.Sale);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;