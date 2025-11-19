const { Sale, SaleItem, Item, Sequelize } = require('../models');

exports.getStats = async (req, res) => {
  const totalRevenue = await Sale.sum('totalAmount');
  const thisMonth = new Date();
  thisMonth.setDate(1);
  const monthlySales = await Sale.sum('totalAmount', { where: { createdAt: { [Sequelize.Op.gte]: thisMonth } } });

  const topItems = await SaleItem.findAll({
    attributes: ['itemName', [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQty']],
    group: 'itemName',
    order: [[Sequelize.fn('SUM', Sequelize.col('quantity')), 'DESC']],
    limit: 5
  });

  const lowStock = await Item.findAll({ where: { stock: { [Sequelize.Op.lt]: 20 } } });

  res.json({ totalRevenue: totalRevenue || 0, monthlySales: monthlySales || 0, topItems, lowStock });
};