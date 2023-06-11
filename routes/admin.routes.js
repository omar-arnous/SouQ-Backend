const express = require('express');

const adminController = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middlewares/image-upload');
const requireAuth = require('../middlewares/require-auth');

const app = express();
const router = express.Router();

router.get('/products', adminController.getProducts); // /admin/products

app.use(requireAuth);

router.post(
  '/products',
  imageUploadMiddleware,
  adminController.createNewProduct
);

router.post(
  '/products/:id',
  imageUploadMiddleware,
  adminController.updateProduct
);

router.delete('/products/:id', adminController.deleteProduct);

router.get('/orders', adminController.getOrders);

router.patch('/orders/:id', adminController.updateOrder);

router.get('/users', adminController.getUsers);

router.delete('/user/:id', adminController.deleteUser);

module.exports = router;
