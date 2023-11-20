const Express = require("express");
const router = Express.Router();

const ordersController = require("../controllers/orders-controllers");

const { admin, protect } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(protect, admin, ordersController.getAllOrders)
  .post(protect, ordersController.addOrderItems);

// router.route("/:uid").get(ordersController.getUserOrder);

router.route("/mine").get(protect, ordersController.getUserOrder);

router.route("/:oid").get(protect, admin, ordersController.getOrderById);

router.route("/:oid/pay").put(protect, ordersController.updateOrderToPaid);

router
  .route("/:oid/deliver")
  .put(protect, admin, ordersController.updateOrderToDelivered);

module.exports = router;
