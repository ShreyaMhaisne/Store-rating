const Rating = require("../models/Rating");
const Store = require("../models/Store");
const User = require("../models/User");

exports.addRating = async (req, res) => {
  try {
    const { userId, storeId, rating } = req.body;

    const newRating = await Rating.create({
      userId,
      storeId,
      rating
    });

    res.json({ message: "Rating added", newRating });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const { userId, storeId, rating } = req.body;

    const updated = await Rating.findOne({
      where: { userId, storeId }
    });

    if (!updated) return res.status(404).json({ error: "Rating not found" });

    updated.rating = rating;
    await updated.save();

    res.json({ message: "Rating updated", updated });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStoreRatings = async (req, res) => {
  try {
    const storeId = req.params.storeId;

    const ratings = await Rating.findAll({
      where: { storeId },
      include: [User]
    });

    res.json(ratings);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserRating = async (req, res) => {
  try {
    const { storeId, userId } = req.params;

    const rating = await Rating.findOne({
      where: { storeId, userId }
    });

    res.json(rating);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
