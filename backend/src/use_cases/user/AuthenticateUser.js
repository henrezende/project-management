const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthenticateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    // Check if user exists

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials111");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials22");
    }

    // Create and sign JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return token;
  }
}

module.exports = AuthenticateUser;
