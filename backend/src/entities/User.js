class User {
  constructor(name, email, password, createdAt) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt || new Date();
  }
}

module.exports = User;
