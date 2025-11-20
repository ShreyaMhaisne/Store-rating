const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./src/routes/authRoutes");
const storeRoutes = require("./src/routes/storeRoutes");
const ratingRoutes = require("./src/routes/ratingRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
app.use("/api/admin", adminRoutes);

app.use("/api/ratings", ratingRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);

module.exports = app;
