// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware.verifyToken, userController.getAllUsers);
router.post("/", authMiddleware.verifyToken, userController.createUser);
router.put("/", authMiddleware.verifyToken, userController.updateUser);
router.delete("/:id", authMiddleware.verifyToken, userController.deleteUser);

module.exports = router;
