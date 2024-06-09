class Project {
  constructor(id, userId, name, description, createdAt) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt || new Date();
  }
}

module.exports = Project;
