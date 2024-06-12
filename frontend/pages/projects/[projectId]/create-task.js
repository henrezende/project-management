import { useRouter } from "next/router";
import TaskForm from "@/components/tasks/TaskForm";

const CreateTaskPage = () => {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div>
      <TaskForm projectId={projectId} />
    </div>
  );
};

export default CreateTaskPage;
