class ShowProject {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(projectId) {
    return await this.projectRepository.findById(projectId);
  }
}

module.exports = ShowProject;
