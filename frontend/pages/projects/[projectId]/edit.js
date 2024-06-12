import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProjectForm from "@/components/projects/ProjectForm";
import ProjectService from "@/services/projectService";

const EditProjectPage = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <h1 className="text-2xl font-bold mb-4">Editar Projeto</h1>
      <ProjectForm project={project} />
    </div>
  );
};

export default EditProjectPage;
