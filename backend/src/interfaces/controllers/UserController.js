const User = require("../../entities/User");
const RegisterUser = require("../../use_cases/user/RegisterUser");
const AuthenticateUser = require("../../use_cases/user/AuthenticateUser");
const MongoUserRepository = require("../repositories/MongoUserRepository");

class UserController {
  constructor() {
    this.userRepository = new MongoUserRepository();
    this.jwtSecret = process.env.JWT_SECRET;
  }

  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const registerUser = new RegisterUser(this.userRepository);
      const user = new User(name, email, password);
      const newUser = await registerUser.execute(user);
      res.status(201).send(newUser);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const authenticateUser = new AuthenticateUser(
        this.userRepository,
        this.jwtSecret
      );

      const result = await authenticateUser.execute(email, password);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

module.exports = UserController;
