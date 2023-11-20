const express = require("express");
const router = express.Router();

const { admin, protect } = require("../middlewares/authMiddleware");

const productsController = require("../controllers/products-controllers");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(protect, admin, productsController.createProduct);

router.route("/top").get(productsController.getTopProducts);

router
  .route("/:pid")
  .get(productsController.getProductById)
  .put(protect, admin, productsController.updateProduct)
  .delete(protect, admin, productsController.deleteProduct);

router
  .route("/:pid/reviews")
  .post(protect, productsController.createProductReview);

module.exports = router;
