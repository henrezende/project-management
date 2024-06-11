import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectForm from "../../components/projects/ProjectForm";

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const token = document.cookie.split("=")[1];
          const response = await axios.get(`/api/projects/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProject(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProject();
    }
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-10">Edit Project</h1>
      {project && <ProjectForm project={project} isEdit={true} />}
    </div>
  );
}
