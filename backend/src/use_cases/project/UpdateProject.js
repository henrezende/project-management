class UpdateProject {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(projectId, projectData) {
    return await this.projectRepository.update(projectId, projectData);
  }
}

module.exports = UpdateProject;
