const { body } = require("express-validator");

module.exports = [
  body("title", "Title is required").trim().notEmpty(),
  body("description", "Description is required").trim().notEmpty(),
];
