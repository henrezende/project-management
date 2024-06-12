import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProjectService from "@/services/projectService";
import TaskList from "@/components/tasks/TaskList";
import GoHome from "@/components/utils/GoHome";

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
    <>
      <GoHome />
      <div className="container mx-auto p-8 bg-white drop-shadow-md">
        <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
        <span className="font-semibold">{project.description}</span>
        <div className="flex flex-row">
          <button
            onClick={() => handleEditProjectClick()}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-4"
          >
            Editar Projeto
          </button>

          <button
            onClick={() => handleDeleteProjectClick()}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-4"
          >
            Deletar Projeto
          </button>

          <button
            onClick={() => handleCreateTaskClick()}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 "
          >
            Criar Tarefa
          </button>
        </div>

        <TaskList projectId={project._id} />
      </div>
    </>
  );
};

export default ProjectDetail;
