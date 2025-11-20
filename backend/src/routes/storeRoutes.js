const express = require("express");
const {
  addStore,
  getStores,
  getStoreById
} = require("../controllers/storeController");

const router = express.Router();

router.post("/add", addStore);

router.get("/", getStores);

router.get("/:id", getStoreById);

module.exports = router;
