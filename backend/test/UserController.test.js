const supertest = require("supertest");
const app = require("../src/frameworks_drivers/express/app");
const MongoUserRepository = require("../src/interfaces/repositories/MongoUserRepository");

jest.mock("../src/use_cases/user/RegisterUser.js");
jest.mock("../src/use_cases/user/AuthenticateUser");
jest.mock("../src/interfaces/repositories/MongoUserRepository");

const RegisterUser = require("../src/use_cases/user/RegisterUser");
const AuthenticateUser = require("../src/use_cases/user/AuthenticateUser");

describe("UserController", () => {
  let request;
  let userRepositoryMock;

  beforeAll(() => {
    request = supertest(app);
    userRepositoryMock = {
      save: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    };
    MongoUserRepository.mockImplementation(() => userRepositoryMock);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe("POST /register", () => {
    it("should register a new user", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "testpassword",
      };

      RegisterUser.mockImplementation(() => ({
        execute: jest.fn().mockResolvedValue(userData),
      }));

      const response = await request
        .post("/users/register")
        .send(userData)
        .expect(201);

      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
    });

    it("should return 400 if required fields are missing", async () => {
      const userData = {
        name: "Test User",
        password: "testpassword",
      };

      RegisterUser.mockImplementation(() => ({
        execute: jest.fn().mockImplementation(() => {
          throw new Error(
            "User validation failed: email: Path `email` is required."
          );
        }),
      }));

      const response = await request
        .post("/users/register")
        .send(userData)
        .expect(400);

      expect(response.text).toBe(
        "User validation failed: email: Path `email` is required."
      );
    });
  });

  describe("POST /login", () => {
    it("should authenticate and return a JWT token", async () => {
      const user = {
        _id: "someuserid",
        name: "Test User",
        email: "test@example.com",
        password: "testpassword",
      };

      userRepositoryMock.findByEmail.mockResolvedValue(user);

      AuthenticateUser.mockImplementation(() => ({
        execute: jest.fn().mockResolvedValue({ token: "mockedtoken" }),
      }));

      const loginData = {
        email: "test@example.com",
        password: "testpassword",
      };

      const response = await request
        .post("/users/login")
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty("token");
    });

    it("should return 400 if credentials are invalid", async () => {
      AuthenticateUser.mockImplementation(() => ({
        execute: jest.fn().mockImplementation(() => {
          throw new Error("Credenciais inválidas");
        }),
      }));

      const loginData = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      const response = await request
        .post("/users/login")
        .send(loginData)
        .expect(400);

      expect(response.text).toBe("Credenciais inválidas");
    });
  });
});
