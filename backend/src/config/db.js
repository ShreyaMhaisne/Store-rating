const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("store_rating", "root", "shreya", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
