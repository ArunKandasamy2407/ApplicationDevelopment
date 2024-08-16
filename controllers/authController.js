// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    delete user.dataValues.password;
    const shops = await User.getShops(user.id);
    user.dataValues.shops = shops;
    const token = jwt.sign(user.dataValues, process.env.JWT_SECRET);
    res.json({
      token,
      data: user.dataValues,
      message: "Login successful",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  const { username, password, email, name } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Missing username or password in request body" });
    }

    const user = await User.create({
      username,
      password: await bcrypt.hash(password, 10),
    });
    delete user.dataValues.password;
    res.status(201).json({
      status: "success",
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
