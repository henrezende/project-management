const supertest = require("supertest");
const app = require("../src/frameworks_drivers/express/app");
const Task = require("../src/entities/Task");

jest.mock("../src/use_cases/task/CreateTask");
jest.mock("../src/use_cases/task/ListTasks");
jest.mock("../src/use_cases/task/UpdateTask");
jest.mock("../src/use_cases/task/DeleteTask");
jest.mock("../src/interfaces/repositories/MongoTaskRepository");

jest.mock("../src/interfaces/middleware/authMiddleware", () => {
  return (req, res, next) => {
    req.userId = "mockedUserId";
    next();
  };
});

const CreateTask = require("../src/use_cases/task/CreateTask");
const ListTasks = require("../src/use_cases/task/ListTasks");
const UpdateTask = require("../src/use_cases/task/UpdateTask");
const DeleteTask = require("../src/use_cases/task/DeleteTask");
const TaskRepository = require("../src/interfaces/repositories/MongoTaskRepository");

describe("TaskController", () => {
  let request;
  let taskRepositoryMock;

  beforeAll(() => {
    request = supertest(app);
    taskRepositoryMock = {
      save: jest.fn(),
      findById: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    TaskRepository.mockImplementation(() => taskRepositoryMock);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe("GET /tasks", () => {
    it("should list all tasks for a project", async () => {
      const projectId = "mockedProjectId";
      const expectedTasks = [
        new Task(
          projectId,
          "Task 1",
          "Description 1",
          "pending",
          "userId1",
          null
        ),
        new Task(
          projectId,
          "Task 2",
          "Description 2",
          "completed",
          "userId2",
          new Date()
        ),
      ];

      ListTasks.mockImplementation(() => ({
        execute: jest.fn().mockResolvedValue(expectedTasks),
      }));

      const response = await request
        .get("/tasks")
        .send({ projectId })
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe(expectedTasks[0].title);
      expect(response.body[1].description).toBe(expectedTasks[1].description);
    });

    it("should return 400 if listing tasks fails", async () => {
      ListTasks.mockImplementation(() => ({
        execute: jest.fn().mockImplementation(() => {
          throw new Error("Failed to list tasks");
        }),
      }));

      const response = await request
        .get("/tasks")
        .send({ projectId: "mockedProjectId" })
        .expect(400);

      expect(response.text).toBe("Failed to list tasks");
    });
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const taskData = {
        title: "New Task",
        description: "This is a new task",
        status: "pending",
        completedBy: null,
        completedAt: null,
        projectId: "mockedProjectId",
      };

      const expectedTask = new Task(
        taskData.projectId,
        taskData.title,
        taskData.description,
        taskData.status,
        taskData.completedBy,
        taskData.completedAt
      );

      CreateTask.mockImplementation(() => ({
        execute: jest.fn().mockResolvedValue(expectedTask),
      }));

      const response = await request.post("/tasks").send(taskData).expect(201);

      expect(response.body.title).toBe(taskData.title);
      expect(response.body.description).toBe(taskData.description);
    });

    it("should return 400 if required fields are missing", async () => {
      const taskData = {
        description: "This is a new task",
        status: "pending",
        projectId: "mockedProjectId",
      };

      CreateTask.mockImplementation(() => ({
        execute: jest.fn().mockImplementation(() => {
          throw new Error(
            "Task validation failed: title: Path `title` is required."
          );
        }),
      }));

      const response = await request.post("/tasks").send(taskData).expect(400);

      expect(response.text).toBe(
        "Task validation failed: title: Path `title` is required."
      );
    });
  });

  describe("PUT /tasks/:id", () => {
    it("should update a task", async () => {
      const taskId = "mockedTaskId";
      const taskData = {
        title: "Updated Task",
        description: "Updated description",
        status: "completed",
        completedBy: "mockedUserId",
        completedAt: new Date(),
      };

      UpdateTask.mockImplementation(() => ({
        execute: jest.fn().mockResolvedValue({
          _id: taskId,
          ...taskData,
        }),
      }));

      const response = await request
        .put(`/tasks/${taskId}`)
        .send(taskData)
        .expect(200);

      expect(response.body._id).toBe(taskId);
      expect(response.body.title).toBe(taskData.title);
      expect(response.body.description).toBe(taskData.description);
    });

    it("should return 400 if update fails", async () => {
      const taskId = "mockedTaskId";
      const taskData = {
        title: "Updated Task",
        description: "Updated description",
        status: "completed",
      };

      UpdateTask.mockImplementation(() => ({
        execute: jest.fn().mockImplementation(() => {
          throw new Error("Failed to update task");
        }),
      }));

      const response = await request
        .put(`/tasks/${taskId}`)
        .send(taskData)
        .expect(400);

      expect(response.text).toBe("Failed to update task");
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete a task", async () => {
      const taskId = "mockedTaskId";

      DeleteTask.mockImplementation(() => ({
        execute: jest.fn().mockResolvedValue(),
      }));

      const response = await request.delete(`/tasks/${taskId}`).expect(200);

      expect(response.body.message).toBe("Tarefa deletada!");
    });

    it("should return 400 if delete fails", async () => {
      const taskId = "mockedTaskId";

      DeleteTask.mockImplementation(() => ({
        execute: jest.fn().mockImplementation(() => {
          throw new Error("Failed to delete task");
        }),
      }));

      const response = await request.delete(`/tasks/${taskId}`).expect(400);

      expect(response.text).toBe("Failed to delete task");
    });
  });
});
