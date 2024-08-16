// routes/shopRoutes.js
const express = require("express");
const shopController = require("../controllers/shopController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
// use multer to upload files and rename them to avoid name conflicts
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.get("/", shopController.getAllShops);
router.get("/:id", shopController.getShopById);
// router.post("/", authMiddleware.verifyToken, shopController.createShop);
router.post(
  "/",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "photos", maxCount: 10 },
  ]),
  authMiddleware.verifyToken,
  shopController.createShop
);
router.put("/:id", authMiddleware.verifyToken, shopController.updateShop);
router.delete("/:id", authMiddleware.verifyToken, shopController.deleteShop);

module.exports = router;
