import Link from "next/link";
import ProjectList from "@/components/projects/ProjectList";

const Projects = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projetos</h1>
        <Link
          href="/projects/create"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Criar Projeto
        </Link>
      </div>
      <ProjectList />
    </div>
  );
};

export default Projects;
