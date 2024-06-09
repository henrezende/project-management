class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(user) {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error("Email already taken");
    }
    return await this.userRepository.add(user);
  }
}

module.exports = RegisterUser;
