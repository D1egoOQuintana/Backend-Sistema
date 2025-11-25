const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

// Public: list categories
router.get('/', categoryController.getAllCategories);

// Protected: create category (admin only)
router.post('/', verifyToken, authorizeRoles('admin'), categoryController.createCategory);

module.exports = router;
