const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ products: products });
  } catch (error) {
    next(error);
    return;
  }
};

const createNewProduct = async (req, res, next) => {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.status(200).json({ message: 'Product Added Successfully!' });
};

const updateProduct = async (req, res, next) => {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) product.replaceImage(req.file.filename);

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.status(200).json({ message: 'Product Updated Successfully!' });
};

const deleteProduct = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
    await product.remove();
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ message: 'Product Deleted Successfully!' });
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json({ orders: orders });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;

  try {
    const order = await Order.findById(orderId);

    order.status = newStatus;

    await order.save();

    res.status(200).json({ message: 'Order updated', newStatus: newStatus });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users: users });
  } catch (error) {
    next(error);
    return;
  }
};

const deleteUser = (req, res, next) => {
  const uid = req.params.id;
  try {
    User.delete(uid);
  } catch (err) {
    res.status(400).json({ message: 'Unable to delete user' });
    next();
    return;
  }

  res.status(200).json({ message: 'User Deleted Successfully' });
};

module.exports = {
  getProducts: getProducts,
  createNewProduct: createNewProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getOrders: getOrders,
  updateOrder: updateOrder,
  getUsers: getUsers,
  deleteUser: deleteUser,
};
