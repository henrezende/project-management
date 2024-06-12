import { useEffect, useState } from "react";
import TaskService from "@/services/taskService";
import TaskItem from "./TaskItem";

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    TaskService.getTasks(projectId)
      .then((data) => setTasks(data))
      .catch((error) => console.error("Erro ao buscar tarefas", error));
  }, [projectId]);

  return (
    <div className="max-w-lg mx-auto mt-4">
      {tasks.map((task) => (
        <div key={task._id}>
          <TaskItem projectId={projectId} task={task} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
