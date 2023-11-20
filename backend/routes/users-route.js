const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const usersControllers = require("../controllers/users-controllers");

router
  .route("/")
  .post(usersControllers.registerUser)
  .get(
    authMiddleware.protect,
    authMiddleware.admin,
    usersControllers.getAllUsers,
  );

router
  .route("/profile")
  .get(authMiddleware.protect, usersControllers.getUserProfile)
  .put(authMiddleware.protect, usersControllers.updateUserProfile);

router
  .route("/:uid")
  .delete(
    authMiddleware.protect,
    authMiddleware.admin,
    usersControllers.deleteUser,
  )
  .get(
    authMiddleware.protect,
    authMiddleware.admin,
    usersControllers.getUserById,
  )
  .put(
    authMiddleware.protect,
    authMiddleware.admin,
    usersControllers.updateUser,
  );

// authMiddleware.protect,
router.post("/logout", authMiddleware.protect, usersControllers.logoutUser);
router.post("/login", usersControllers.authUser);

module.exports = router;
