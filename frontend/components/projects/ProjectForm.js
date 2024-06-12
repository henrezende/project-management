import { useState } from "react";
import { useRouter } from "next/router";
import ProjectService from "@/services/projectService";

const ProjectForm = ({ project = {} }) => {
  const [name, setName] = useState(project.name || "");
  const [description, setDescription] = useState(project.description || "");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (project._id) {
        await ProjectService.updateProject(project._id, { name, description });
      } else {
        await ProjectService.createProject({ name, description });
      }
      router.push("/projects");
    } catch (error) {
      console.error("Falha ao salvar projeto", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Nome do projeto</label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Descrição</label>
        <textarea
          className="mt-1 p-2 w-full border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {project._id ? "Atualizar Projeto" : "Criar Projeto"}
      </button>
    </form>
  );
};

export default ProjectForm;
