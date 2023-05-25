const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

// Get All Products
router.get('/products', productsController.getAllProducts);

// Get Single Product
router.get('/products/:id', productsController.getProductDetails);

module.exports = router;
