class User {
  constructor(id, name, email, password, createdAt) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt || new Date();
  }
}

module.exports = User;
