class CreateProject {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(project) {
    return await this.projectRepository.add(project);
  }
}

module.exports = CreateProject;
