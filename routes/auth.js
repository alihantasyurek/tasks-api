const express = require("express");
const router = express.Router();
const credentialsValidation = require("../utils/credentialsValidation.js");
const { validationResult } = require("express-validator");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const generatejwt = require("../utils/generatejwt.js");
const auth = require("../middleware/auth.js");

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Get current user
 *     description: Requires a JWT in the Authorization header.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully returned authenticated user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Missing or invalid Authorization token
 *       500:
 *         description: Server Error
 */

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a user account with email and password, then returns a JWT.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthCredentials'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthToken'
 *       400:
 *         description: Invalid request data
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server Error
 */

router.post("/register", credentialsValidation(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ errors: [{ msg: "User already exists" }] });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPass });
    await user.save();

    const token = generatejwt(user.id);
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Logs in a user with email and password, then returns a JWT.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthCredentials'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthToken'
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server Error
 */

router.post("/login", credentialsValidation(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const token = generatejwt(user.id);
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

module.exports = router;
