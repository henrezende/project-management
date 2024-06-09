const express = require("express");
const authMiddleware = require("../../../interfaces/middleware/authMiddleware");
const TaskController = require("../../../interfaces/controllers/TaskController");
const MongooseTaskRepository = require("../../../interfaces/repositories/MongoTaskRepository");

const router = express.Router();
const taskRepository = new MongooseTaskRepository();
const taskController = new TaskController(taskRepository);

router.get("/", authMiddleware, (req, res) =>
  taskController.listTasks(req, res)
);
router.post("/", authMiddleware, (req, res) =>
  taskController.createTask(req, res)
);
router.put("/:id", authMiddleware, (req, res) =>
  taskController.updateTask(req, res)
);
router.delete("/:id", authMiddleware, (req, res) =>
  taskController.deleteTask(req, res)
);

module.exports = router;
