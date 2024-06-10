const supertest = require("supertest");
const app = require("../src/frameworks_drivers/express/app");
const Project = require("../src/entities/Project");

jest.mock("../src/use_cases/project/CreateProject");
jest.mock("../src/use_cases/project/ListProjects");
jest.mock("../src/use_cases/project/UpdateProject");
jest.mock("../src/use_cases/project/DeleteProject");
jest.mock("../src/interfaces/repositories/MongoProjectRepository");

const CreateProject = require("../src/use_cases/project/CreateProject");
const ListProjects = require("../src/use_cases/project/ListProjects");
const UpdateProject = require("../src/use_cases/project/UpdateProject");
const DeleteProject = require("../src/use_cases/project/DeleteProject");
const ProjectRepository = require("../src/interfaces/repositories/MongoProjectRepository");

jest.mock("../src/interfaces/middleware/authMiddleware", () => {
  return (req, res, next) => {
    req.userId = "mockedUserId";
    next();
  };
});

describe("ProjectController", () => {
  let request;
  let projectRepositoryMock;

  beforeAll(() => {
    request = supertest(app);
    projectRepositoryMock = {
      save: jest.fn(),
      findById: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    ProjectRepository.mockImplementation(() => projectRepositoryMock);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe("POST /projects", () => {
    it("should create a new project", async () => {
      const projectData = {
        name: "Test Project",
        description: "This is a test project",
      };

      const userId = "mockedUserId";
      const expectedProject = new Project(
        userId,
        projectData.name,
        projectData.description
      );

      CreateProject.mockImplementation(() => ({
        execute: jest.fn().mockResolvedValue(expectedProject),
      }));

      const response = await request
        .post("/projects")
        .send(projectData)
        .expect(201);

      expect(response.body.name).toBe(projectData.name);
      expect(response.body.description).toBe(projectData.description);
    });

    it("should return 400 if required fields are missing", async () => {
      const projectData = {
        description: "This is a test project",
      };

      CreateProject.mockImplementation(() => ({
        execute: jest.fn().mockImplementation(() => {
          throw new Error(
            "Project validation failed: name: Path `name` is required."
          );
        }),
      }));

      const response = await request
        .post("/projects")
        .send(projectData)
        .expect(400);

      expect(response.text).toBe(
        "Project validation failed: name: Path `name` is required."
      );
    });
  });

  describe("GET /projects", () => {
    it("should list all projects", async () => {
      const userId = "mockedUserId";
      const expectedProjects = [
        new Project("projectid1", userId, "Project 1", "Description 1"),
        new Project("projectid2", userId, "Project 2", "Description 2"),
      ];

      ListProjects.mockImplementation(() => ({
        execute: jest.fn().mockResolvedValue(expectedProjects),
      }));

      const response = await request.get("/projects").expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe(expectedProjects[0].name);
      expect(response.body[1].description).toBe(
        expectedProjects[1].description
      );
    });

    it("should return 400 if listing projects fails", async () => {
      ListProjects.mockImplementation(() => ({
        execute: jest.fn().mockImplementation(() => {
          throw new Error("Failed to list projects");
        }),
      }));

      const response = await request.get("/projects").expect(400);

      expect(response.text).toBe("Failed to list projects");
    });
  });

  describe("PUT /projects/:id", () => {
    it("should update a project", async () => {
      const projectId = "projectid1";
      const projectData = {
        name: "Updated Project",
        description: "Updated description",
      };

      UpdateProject.mockImplementation(() => ({
        execute: jest.fn().mockResolvedValue({
          _id: projectId,
          ...projectData,
        }),
      }));

      const response = await request
        .put(`/projects/${projectId}`)
        .send(projectData)
        .expect(200);

      expect(response.body._id).toBe(projectId);
      expect(response.body.name).toBe(projectData.name);
      expect(response.body.description).toBe(projectData.description);
    });

    it("should return 400 if update fails", async () => {
      const projectId = "projectid1";
      const projectData = {
        name: "Updated Project",
        description: "Updated description",
      };

      UpdateProject.mockImplementation(() => ({
        execute: jest.fn().mockImplementation(() => {
          throw new Error("Failed to update project");
        }),
      }));

      const response = await request
        .put(`/projects/${projectId}`)
        .send(projectData)
        .expect(400);

      expect(response.text).toBe("Failed to update project");
    });
  });

  describe("DELETE /projects/:id", () => {
    it("should delete a project", async () => {
      const projectId = "projectid1";

      DeleteProject.mockImplementation(() => ({
        execute: jest.fn().mockResolvedValue(),
      }));

      const response = await request
        .delete(`/projects/${projectId}`)
        .expect(200);

      expect(response.body.msg).toBe("Projeto removido");
    });

    it("should return 400 if delete fails", async () => {
      const projectId = "projectid1";

      DeleteProject.mockImplementation(() => ({
        execute: jest.fn().mockImplementation(() => {
          throw new Error("Failed to delete project");
        }),
      }));

      const response = await request
        .delete(`/projects/${projectId}`)
        .expect(400);

      expect(response.text).toBe("Failed to delete project");
    });
  });
});
