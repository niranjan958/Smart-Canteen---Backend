const { Item } = require('../models');

exports.getItems = async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
};

exports.addItem = async (req, res) => {
  const { name, price, unit } = req.body;
  const item = await Item.create({ name, price, unit, stock: 100 });
  res.json(item);
};