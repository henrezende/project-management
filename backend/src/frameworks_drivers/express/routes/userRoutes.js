const express = require("express");
const MongooseUserRepository = require("../../../interfaces/repositories/MongoUserRepository");
const UserController = require("../../../interfaces/controllers/UserController");

const userRepository = new MongooseUserRepository();
const userController = new UserController(userRepository);

const router = express.Router();

router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));

module.exports = router;
