const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');

router.get("/", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.post("/", authController.register);
router.delete("/:id", userController.deleteUser);
router.patch("/:id", userController.updateUser);

module.exports = router;