import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TaskForm from "@/components/tasks/TaskForm";
import TaskService from "@/services/taskService";

const EditTaskPage = () => {
  const router = useRouter();
  const { projectId, taskId } = router.query;
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (taskId) {
      TaskService.getTaskById(taskId)
        .then((task) => {
          setTask(task);
        })
        .catch((error) => {
          console.error("Falha ao buscar tarefa", error);
        });
    }
  }, [taskId]);

  return (
    <div>
      <TaskForm projectId={projectId} task={task} />
    </div>
  );
};

export default EditTaskPage;
