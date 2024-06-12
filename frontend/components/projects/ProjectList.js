import { useEffect, useState } from "react";
import ProjectService from "@/services/projectService";
import ProjectItem from "./ProjectItem";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    ProjectService.getProjects()
      .then((data) => setProjects(data))
      .catch((error) => console.error("Erro ao buscar projetos", error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Projetos</h1>
      <ul>
        {projects.map((project) => (
          <div key={project._id}>
            <ProjectItem project={project} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
