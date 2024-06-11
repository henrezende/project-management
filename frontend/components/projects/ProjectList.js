import { useState, useEffect } from "react";
import projectService from "../../services/projectService";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className="mb-2 p-2 bg-white shadow-sm rounded-md"
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
