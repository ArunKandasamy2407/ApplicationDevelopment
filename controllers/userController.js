// controllers/userController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email, phone, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      phone,
      username,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const id = req.user.id;
  try {
    const count = await User.update(req.body, { where: { id } });
    if (count[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByPk(id);
    delete updatedUser.dataValues.password;
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
