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
      const project = new Project(null, userId, name, description);
      const newProject = await createProject.execute(project);
      res.status(201).send(newProject);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  listProjects(req, res) {
    const userId = req.userId;
    const listProjects = new ListProjects(this.projectRepository);

    listProjects
      .execute(userId)
      .then((projects) => res.json(projects))
      .catch((err) => res.status(400).send(err.message));
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

  deleteProject(req, res) {
    const { id } = req.params;
    const deleteProject = new DeleteProject(this.projectRepository);

    deleteProject
      .execute(id)
      .then(() => res.json({ msg: "Projeto removido" }))
      .catch((err) => res.status(400).send(err.message));
  }
}

module.exports = ProjectController;
