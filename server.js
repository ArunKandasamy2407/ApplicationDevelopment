const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/auth", authRoutes);
app.use("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(5000, () => {
    console.log(`Server is running on port http://localhost:5000`);
  });
});
