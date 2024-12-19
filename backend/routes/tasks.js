const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

const tasks = []; 


router.get("/", verifyToken, (req, res) => {
  res.json(tasks);
});

// Create a task
router.post("/", verifyToken, (req, res) => {
  const { title, description, dueDate, status } = req.body;

  if (!title || !description || !dueDate || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newTask = { id: Date.now(), title, description, dueDate, status, userId: req.user.id };
  tasks.push(newTask);

  res.status(201).json(newTask);
});


router.put("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;

  const task = tasks.find((task) => task.id == id && task.userId === req.user.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.dueDate = dueDate || task.dueDate;
  task.status = status || task.status;

  res.json(task);
});


router.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id == id && task.userId === req.user.id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);

  res.json({ message: "Task deleted successfully" });
});

module.exports = router;
