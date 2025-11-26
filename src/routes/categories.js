const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

// Public: list categories
router.get('/', categoryController.getAllCategories);

// Public: get category by id
router.get('/:id', categoryController.getCategoryById);

// Protected: create category (admin only)
router.post('/', verifyToken, authorizeRoles('admin'), categoryController.createCategory);

// Protected: update and delete category (admin only)
router.put('/:id', verifyToken, authorizeRoles('admin'), categoryController.updateCategory);
router.delete('/:id', verifyToken, authorizeRoles('admin'), categoryController.deleteCategory);

module.exports = router;
