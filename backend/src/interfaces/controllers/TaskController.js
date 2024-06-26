const Task = require("../../entities/Task");
const CreateTask = require("../../use_cases/task/CreateTask");
const ListTasks = require("../../use_cases/task/ListTasks");
const ShowTask = require("../../use_cases/task/ShowTask");
const UpdateTask = require("../../use_cases/task/UpdateTask");
const DeleteTask = require("../../use_cases/task/DeleteTask");

class TaskController {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async listTasks(req, res) {
    try {
      const { projectId } = req.query;
      const listTasks = new ListTasks(this.taskRepository);
      const tasks = await listTasks.execute(projectId);
      res.status(200).send(tasks);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async showTask(req, res) {
    try {
      const { id } = req.params;
      const showTask = new ShowTask(this.taskRepository);
      const task = await showTask.execute(id);
      res.status(200).send(task);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async createTask(req, res) {
    try {
      const {
        title,
        description,
        status,
        completedBy,
        completedAt,
        projectId,
      } = req.body;
      const task = new Task(
        projectId,
        title,
        description,
        status,
        completedBy,
        completedAt
      );

      const createTask = new CreateTask(this.taskRepository);
      const createdTask = await createTask.execute(task);
      res.status(201).send(createdTask);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req;
      const { title, description, status } = req.body;
      const completedAt = status === "completed" ? new Date() : null;
      const updateTask = new UpdateTask(this.taskRepository);
      const updatedTask = await updateTask.execute(id, {
        title,
        description,
        status,
        userId,
        completedAt,
      });
      res.status(200).send(updatedTask);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const deleteTask = new DeleteTask(this.taskRepository);
      await deleteTask.execute(id);
      res.status(200).send({ message: "Tarefa deletada!" });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

module.exports = TaskController;
