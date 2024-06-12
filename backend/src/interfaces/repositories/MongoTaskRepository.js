const TaskModel = require("../gateways/TaskModel");

class MongoTaskRepository {
  async add(task) {
    const newTask = new TaskModel(task);
    return await newTask.save();
  }

  async findById(id) {
    return await TaskModel.findById(id);
  }

  async findByProjectId(projectId) {
    return await TaskModel.find({ projectId });
  }

  async update(id, updatedTask) {
    return await TaskModel.findByIdAndUpdate(id, updatedTask, { new: true });
  }

  async delete(id) {
    return await TaskModel.findByIdAndDelete(id);
  }
}

module.exports = MongoTaskRepository;
