const Project = require("../../entities/Project");
const CreateProject = require("../../use_cases/project/CreateProject");
const ListProjects = require("../../use_cases/project/ListProjects");
const UpdateProject = require("../../use_cases/project/UpdateProject");
const DeleteProject = require("../../use_cases/project/DeleteProject");

class ProjectController {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async createProject(req, res) {
    try {
      const { name, description } = req.body;
      const userId = req.userId;

      const createProject = new CreateProject(this.projectRepository);
      const project = new Project(userId, name, description);
      const newProject = await createProject.execute(project);
      res.status(201).send(newProject);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async listProjects(req, res) {
    try {
      const userId = req.userId;
      const listProjects = new ListProjects(this.projectRepository);

      const projects = await listProjects.execute(userId);
      res.status(200).send(projects);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async updateProject(req, res) {
    try {
      const { id } = req.params;
      const projectData = req.body;
      const updateProject = new UpdateProject(this.projectRepository);

      const updatedProject = await updateProject.execute(id, projectData);
      res.status(200).send(updatedProject);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async deleteProject(req, res) {
    try {
      const { id } = req.params;
      const deleteProject = new DeleteProject(this.projectRepository);
      await deleteProject.execute(id);
      res.status(200).send({ msg: "Projeto removido" });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

module.exports = ProjectController;
