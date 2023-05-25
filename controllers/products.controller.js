const Product = require('../models/product');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ products: products });
  } catch (error) {
    next(error);
  }
};

const getProductDetails = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    res.status(200).json({ product: product });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductDetails: getProductDetails,
};
