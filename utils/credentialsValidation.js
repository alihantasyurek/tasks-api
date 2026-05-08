const { body } = require("express-validator");

module.exports = () => [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be type String")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
