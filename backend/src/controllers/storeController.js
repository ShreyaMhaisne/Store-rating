const Store = require("../models/Store");
const User = require("../models/User");

exports.addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const store = await Store.create({
      name,
      email,
      address,
      ownerId
    });

    res.json({ message: "Store added successfully", store });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [{ model: User, as: "owner" }]
    });

    res.json(stores);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStoreById = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id, {
      include: [{ model: User, as: "owner" }]
    });

    res.json(store);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
