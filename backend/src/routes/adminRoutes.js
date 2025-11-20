const express = require("express");
const adminController = require("../controllers/adminController");

const {
  createUser,
  getDashboardData,
  listUsers,
  listStores,
  getUserDetails,
  createStore
} = adminController;

const router = express.Router();
router.post("/create-user", createUser);
router.post("/create-store", createStore);
router.get("/dashboard", getDashboardData);
router.get("/users", listUsers);
router.get("/stores", listStores);
router.get("/user/:id", getUserDetails);

module.exports = router;
