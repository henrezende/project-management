const ProjectModel = require("../gateways/ProjectModel");

class MongoProjectRepository {
  async add(project) {
    const newProject = new ProjectModel(project);
    await newProject.save();
    return newProject;
  }

  async findByUserId(userId) {
    return await ProjectModel.find({ userId });
  }

  async findById(id) {
    return await ProjectModel.findById(id);
  }

  async update(id, updatedProject) {
    return await ProjectModel.findByIdAndUpdate(id, updatedProject, {
      new: true,
    });
  }

  async delete(id) {
    return await ProjectModel.findByIdAndDelete(id);
  }
}

module.exports = MongoProjectRepository;
