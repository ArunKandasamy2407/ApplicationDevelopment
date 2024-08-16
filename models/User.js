// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Shop = require("./Shop");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
});

User.getShops = async (userId) => {
  return await Shop.findAll({ where: { ownerId: userId }, attributes: ["id"] });
};

module.exports = User;
