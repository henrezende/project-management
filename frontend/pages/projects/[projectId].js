import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProjectService from "@/services/projectService";
import TaskList from "@/components/tasks/TaskList";

const ProjectDetail = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEditProjectClick = () => {
    router.push(`/projects/${project._id}/edit`);
  };

  const handleDeleteProjectClick = async () => {
    try {
      await ProjectService.deleteProject(projectId);
      router.push("/projects");
    } catch (error) {
      console.error("Falha ao deletar projeto", error);
    }
  };

  const handleCreateTaskClick = () => {
    router.push(`/projects/${project._id}/create-task`);
  };

  useEffect(() => {
    if (projectId) {
      ProjectService.getProjectById(projectId)
        .then((project) => {
          setProject(project);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Falha ao buscar projeto", error);
          setLoading(false);
        });
    }
  }, [projectId]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <p>{project.description}</p>
      <button
        onClick={() => handleEditProjectClick()}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
      >
        Editar Projeto
      </button>

      <button
        onClick={() => handleDeleteProjectClick()}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Deletar Projeto
      </button>

      <button
        onClick={() => handleCreateTaskClick()}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Criar Tarefa
      </button>
      <TaskList projectId={project._id} />
    </div>
  );
};

export default ProjectDetail;
