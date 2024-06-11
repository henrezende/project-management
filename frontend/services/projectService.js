import api from "@/utils/api";

const getProjects = async () => {
  const response = await api.get(`/projects`, {
    headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` },
  });
  return response.data;
};

export default { getProjects };
