const bcrypt = require("bcryptjs");
const UserModel = require("../gateways/UserModel");

class MongoUserRepository {
  async add(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }
}

module.exports = MongoUserRepository;
