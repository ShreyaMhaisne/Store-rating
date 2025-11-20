const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");
const bcrypt = require("bcryptjs");
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role
    });

    res.json({ message: "User created successfully", user });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    if (!name || !email || !address || !ownerId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const store = await Store.create({
      name,
      email,
      address,
      ownerId
    });

    res.json({ message: "Store created successfully", store });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const usersCount = await User.count();
    const storesCount = await Store.count();
    const ratingsCount = await Rating.count();

    res.json({
      usersCount,
      storesCount,
      ratingsCount
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;

    const where = {};

    if (name) where.name = name;
    if (email) where.email = email;
    if (address) where.address = address;
    if (role) where.role = role;

    const users = await User.findAll({ where });

    res.json(users);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [{ model: User, as: "owner" }]
    });

    res.json(stores);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.role === "owner") {
      const stores = await Store.findAll({
        where: { ownerId: user.id },
      });

      res.json({ user, stores });
    } else {
      res.json({ user });
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
