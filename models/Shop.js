// models/Shop.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Shop = sequelize.define("Shop", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  address: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  profilePic: DataTypes.STRING,
  services: DataTypes.JSON,
  timings: DataTypes.STRING,
  website: DataTypes.STRING,
  ratings: DataTypes.STRING,
  description: DataTypes.TEXT,
  photos: DataTypes.JSON,
  category: DataTypes.ENUM(
    "mobile",
    "laptop",
    "computer",
    "car",
    "home-appliances"
  ),
  place: DataTypes.STRING,
  city: DataTypes.STRING,
  ownerId: DataTypes.INTEGER,
});
module.exports = Shop;
