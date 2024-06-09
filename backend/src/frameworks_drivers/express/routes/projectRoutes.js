const express = require("express");
const authMiddleware = require("../../../interfaces/middleware/authMiddleware");
const MongooseProjectRepository = require("../../../interfaces/repositories/MongoProjectRepository");
const ProjectController = require("../../../interfaces/controllers/ProjectController");

const projectRepository = new MongooseProjectRepository();
const projectController = new ProjectController(projectRepository);

const router = express.Router();

router.get("/", authMiddleware, (req, res) =>
  projectController.listProjects(req, res)
);
router.post("/", authMiddleware, (req, res) =>
  projectController.createProject(req, res)
);
router.put("/:id", authMiddleware, (req, res) =>
  projectController.updateProject(req, res)
);
router.delete("/:id", authMiddleware, (req, res) =>
  projectController.deleteProject(req, res)
);

module.exports = router;
