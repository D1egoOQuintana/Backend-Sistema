const sequelize = require('../config/database');

// Import models so they register with sequelize
const Product = require('./Product');
const User = require('./User');
const Role = require('./Role');
const Category = require('./Category');

// Associations
Role.hasMany(User, { foreignKey: { name: 'RoleId', allowNull: false }, onDelete: 'RESTRICT' });
User.belongsTo(Role, { foreignKey: { name: 'RoleId', allowNull: false } });

Category.hasMany(Product, { foreignKey: 'CategoryId' });
Product.belongsTo(Category, { foreignKey: 'CategoryId' });

module.exports = {
  sequelize,
  Product,
  User,
  Role,
  Category
};
