class CreateTask {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(task) {
    return await this.taskRepository.add(task);
  }
}

module.exports = CreateTask;
