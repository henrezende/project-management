class Task {
  constructor(projectId, title, description, status, completedBy, completedAt) {
    this.projectId = projectId;
    this.title = title;
    this.description = description;
    this.status = status || "pending";
    this.createdAt = new Date();
    this.completedBy = completedBy;
    this.completedAt = completedAt;
  }
}

module.exports = Task;
