const app = require("./app");
const sequelize = require("./src/config/db");
const User = require("./src/models/User");
const Store = require("./src/models/Store");
const Rating = require("./src/models/Rating");

const PORT = 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error syncing database:", err);
  });
