const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', verifyToken, authorizeRoles('admin'), productController.createProduct);
router.put('/:id', verifyToken, authorizeRoles('admin'), productController.updateProduct);
router.delete('/:id', verifyToken, authorizeRoles('admin'), productController.deleteProduct);

module.exports = router;
