const express = require("express");
const taskValidation = require("../utils/taskValidation");
const router = express.Router();
const auth = require("../middleware/auth.js");
const { validationResult } = require("express-validator");
const Task = require("../models/Task.js");
const mongoose = require("mongoose");

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all user tasks
 *     description: Returns all tasks belonging to the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully returned user tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Missing or invalid token
 *       500:
 *         description: Server Error
 */

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    return res.json(tasks);
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     description: Returns a single task belonging to the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Successfully returned task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid task ID
 *       401:
 *         description: Missing or invalid token
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server Error
 */

router.get("/:id", auth, async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        errors: [{ msg: "Invalid task ID" }],
      });
    }
    const task = await Task.findOne({ _id: taskId, user: req.user.id });
    if (!task) {
      return res.status(404).json({
        errors: [{ msg: "Task not found" }],
      });
    }

    return res.json(task);
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a task for the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Missing or invalid token
 *       500:
 *         description: Server Error
 */

router.post("/", auth, taskValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, completed } = req.body;
  try {
    const task = new Task({ title, description, completed, user: req.user.id });
    await task.save();
    return res.status(201).json(task);
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task by ID
 *     description: Updates a task belonging to the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated task
 *               description:
 *                 type: string
 *                 example: Updated description
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdatedTask'
 *       400:
 *         description: Invalid task ID
 *       401:
 *         description: Missing or invalid token
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server Error
 */

router.put("/:id", auth, async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        errors: [{ msg: "Invalid task ID" }],
      });
    }

    const task = await Task.findOne({ _id: taskId, user: req.user.id });
    if (!task) {
      return res.status(404).json({
        errors: [{ msg: "Task not found" }],
      });
    }

    const ALLOWED_FIELDS = ["title", "description", "completed"];
    for (const field of ALLOWED_FIELDS) {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    }

    await task.save();
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task by ID
 *     description: Deletes a task belonging to the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Task deleted successfully
 *       400:
 *         description: Invalid task ID
 *       401:
 *         description: Missing or invalid token
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server Error
 */

router.delete("/:id", auth, async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        errors: [{ msg: "Invalid task ID" }],
      });
    }

    const task = await Task.findOne({ _id: taskId, user: req.user.id });
    if (!task) {
      return res.status(404).json({
        errors: [{ msg: "Task not found" }],
      });
    }
    await task.deleteOne();
    return res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

module.exports = router;
