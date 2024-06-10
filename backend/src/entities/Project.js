class Project {
  constructor(userId, name, description, createdAt) {
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt || new Date();
  }
}

module.exports = Project;
