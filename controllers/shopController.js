// controllers/shopController.js
const Shop = require("../models/Shop");

// Get all shops
exports.getAllShops = async (req, res) => {
  try {
    const { sort, minRating, city, place, category } = req.query;
    let shops = await Shop.findAll();
    if (category) {
      shops = shops.filter((shop) => shop.category === category);
    }
    // Filter by city
    if (city) {
      shops = shops.filter((shop) => shop.city === city);
    }

    // Filter by place
    if (place) {
      shops = shops.filter((shop) => shop.place === place);
    }

    // Filter by rating
    if (minRating) {
      shops = shops.filter((shop) => shop.ratings >= parseFloat(minRating));
    }

    // Sort by rating
    if (sort === "rating") {
      shops.sort((a, b) => b.ratings - a.ratings);
    }

    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getShopById = async (req, res) => {
  const { id } = req.params;
  try {
    const shop = await Shop.findByPk(id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getShopByOwnerId = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const shops = await Shop.findAll({ where: { ownerId } });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Create a new shop
exports.createShop = async (req, res) => {
  console.log(req.files);
  try {
    const user = req.user;
    const { profilePic, photos } = req.files;
    req.body.profilePic = profilePic[0].filename;
    req.body.photos = photos.map((photo) => photo.filename);
    req.body.services = req.body.services
      .split(",")
      .map((service) => service.trim());

    req.body.ownerId = user.id;
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a shop
exports.updateShop = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedShop = await Shop.update(req.body, { where: { id } });
    res.json(updatedShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a shop
exports.deleteShop = async (req, res) => {
  const { id } = req.params;
  try {
    await Shop.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
