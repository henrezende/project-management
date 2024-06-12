class ShowTasks {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id) {
    return await this.taskRepository.findById(id);
  }
}

module.exports = ShowTasks;
