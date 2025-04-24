const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');


router.post('/', authenticateJWT, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authenticateJWT, productController.updateProduct);
router.delete('/:id', authenticateJWT, productController.deleteProduct);

module.exports = router;