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
      <ul>
        {projects.map((project) => (
          <div
            className=" bg-gray-100 hover:bg-gray-200 drop-shadow-md my-4 max-w-fit p-4 rounded-md "
            key={project._id}
          >
            <ProjectItem project={project} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
