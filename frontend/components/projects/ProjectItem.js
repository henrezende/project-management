import { useRouter } from "next/router";

const ProjectItem = ({ project }) => {
  const router = useRouter();

  const handleProjectClick = (projectId) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <li key={project._id} className="mb-2">
      <button
        onClick={() => handleProjectClick(project._id)}
        className="text-slate-600 font-bold"
      >
        {project.name}
      </button>
    </li>
  );
};

export default ProjectItem;
