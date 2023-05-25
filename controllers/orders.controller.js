const Order = require('../models/order');
const User = require('../models/user');

const getOrders = async (req, res) => {
  try {
    const { uid } = req.headers;
    const orders = await Order.findAllForUser(uid);
    res.status(200).json({ orders: orders });
  } catch (error) {
    return next(error);
  }
};

const addOrder = async (req, res, next) => {
  let userDocument;
  try {
    const { uid } = req.headers;
    userDocument = await User.findById(uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(this.cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ message: 'Order Added successfully', order: order });
};

module.exports = {
  getOrders: getOrders,
  addOrder: addOrder,
};
