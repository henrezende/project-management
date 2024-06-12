import { useRouter } from "next/router";
import moment from "moment";
import TaskService from "@/services/taskService";
import { STATUS } from "@/utils/constants";

const TaskItem = ({ projectId, task }) => {
  const router = useRouter();

  const handleEdit = (taskId) => {
    router.push(`/projects/${projectId}/${taskId}/edit`);
  };

  const handleDelete = async (taskId) => {
    try {
      await TaskService.deleteTask(taskId);
      router.reload();
    } catch (error) {
      console.error("Falha ao deletar tarefa", error);
    }
  };

  return (
    <div className="flex items-center justify-between mb-2 p-2 border rounded">
      <div>
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        {task.status === STATUS.Completed ? (
          <p>
            Completado em: {moment(task.completedAt).format("DD/MM/YYYY HH:mm")}
          </p>
        ) : null}
      </div>
      <button
        onClick={() => handleEdit(task._id)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
      >
        Editar
      </button>

      <button
        onClick={() => handleDelete(task._id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
      >
        Excluir
      </button>
    </div>
  );
};

export default TaskItem;
