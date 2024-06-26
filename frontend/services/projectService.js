import api from "@/utils/api";

const ProjectService = {
  getProjects: async () => {
    const response = await api.get(`/projects`, {
      headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` },
    });
    return response.data;
  },

  getProjectById: async (id) => {
    const response = await api.get(`/projects/${id}`, {
      headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` },
    });
    return response.data;
  },

  createProject: async (projectData) => {
    const response = await api.post("/projects", projectData, {
      headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` },
    });
    return response.data;
  },

  updateProject: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData, {
      headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` },
    });
    return response.data;
  },

  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`, {
      headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` },
    });
    return response.data;
  },
};

export default ProjectService;
