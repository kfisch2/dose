const router = require("express").Router();
const sequelize = require("../config/connection");

router.get("/", (req, res) => {
  res.send("We made it to the homepage!");
});

module.exports = router;
