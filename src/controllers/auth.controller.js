const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Faltan datos requeridos' });
    }

    // Find role (default 'user')
    const roleName = role || 'user';
    const roleInstance = await Role.findOne({ where: { name: roleName } });
    if (!roleInstance) {
      return res.status(400).json({ success: false, message: 'Rol inválido' });
    }

    const user = await User.create({ username, email, password, RoleId: roleInstance.id });

    res.status(201).json({ success: true, message: 'Usuario creado', data: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Error register:', err);
    res.status(500).json({ success: false, message: 'Error al crear usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email y password requeridos' });

    const user = await User.findOne({ where: { email }, include: Role });
    if (!user) return res.status(401).json({ success: false, message: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: 'Credenciales inválidas' });

    const payload = { id: user.id, username: user.username, role: user.Role ? user.Role.name : null };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

    res.json({ success: true, message: 'Autenticado', token, data: payload });
  } catch (err) {
    console.error('Error login:', err);
    res.status(500).json({ success: false, message: 'Error al autenticar' });
  }
};
