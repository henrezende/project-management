import api from "../utils/api";

const TaskService = {
  getTasks: async (projectId) => {
    const response = await api.get("/tasks?", {
      params: { projectId },
      headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` },
    });
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` },
    });
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post("/tasks", taskData, {
      headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` },
    });
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData, {
      headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` },
    });
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` },
    });
    return response.data;
  },
};
export default TaskService;
