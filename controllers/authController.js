const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../config/db').models;

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, 'secret123');
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Wrong credentials' });
  }
};