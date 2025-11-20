const express = require("express");
const {
  addRating,
  updateRating,
  getStoreRatings,
  getUserRating
} = require("../controllers/ratingController");

const router = express.Router();
router.post("/add", addRating);

router.put("/update", updateRating);

router.get("/store/:storeId", getStoreRatings);

router.get("/user/:storeId/:userId", getUserRating);

module.exports = router;
