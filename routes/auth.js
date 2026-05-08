const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("hello world from auth");
});

module.exports = routes;
