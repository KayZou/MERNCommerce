const asyncHandler = require("../middlewares/asyncHandler");
const Order = require("../models/orders.model");

const addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    totalPrice,
    shippingPrice,
    taxPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      totalPrice,
      shippingPrice,
      taxPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const getUserOrder = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.oid).populate(
    "user",
    "name email",
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.oid);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});
//admin:
const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.oid);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

module.exports = {
  getAllOrders,
  getUserOrder,
  getOrderById,
  addOrderItems,
  updateOrderToPaid,
  updateOrderToDelivered,
};
