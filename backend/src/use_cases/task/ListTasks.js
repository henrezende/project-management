class ListTasks {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(projectId) {
    return await this.taskRepository.findByProjectId(projectId);
  }
}

module.exports = ListTasks;
