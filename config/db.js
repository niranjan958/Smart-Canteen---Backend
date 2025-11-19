const { Sequelize } = require('sequelize');
module.exports = new Sequelize('canteen_db', 'postgres', 'niranjan@12345', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});