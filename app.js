const express = require('express');
const cors = require('cors');
const db = require('./models');
const sequelize = db.sequelize;
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const saleRoutes = require('./routes/saleRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/sales', saleRoutes);


sequelize.sync({ force: true }).then(async () => {
  console.log('Database synced');
  // Create admin
  const bcrypt = require('bcrypt');
  const hashed = await bcrypt.hash('123456', 10);
  await db.User.findOrCreate({
    where: { email: 'admin@shop.com' },
    defaults: { name: 'Admin', email: 'admin@shop.com', password: hashed }
  });
  // Default items
  const items = ['Tea', 'Coffee', 'Samosa', 'Vada', 'Puff'];
  for (let name of items) {
    await db.Item.findOrCreate({
      where: { name },
      defaults: { name, price: 10 + items.indexOf(name) * 5, unit: 'pc', stock: 100 }
    });
  }
  app.listen(5000, () => 
    console.log('Backend running on http://localhost:5000'));
});