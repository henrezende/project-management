class ListProjects {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(userId) {
    return await this.projectRepository.findByUserId(userId);
  }
}

module.exports = ListProjects;
