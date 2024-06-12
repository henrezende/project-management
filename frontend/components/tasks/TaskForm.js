import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TaskService from "@/services/taskService";
import { STATUS } from "@/utils/constants";

const TaskForm = ({ projectId, task }) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [status, setStatus] = useState(task ? task.status : STATUS.Pending);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await TaskService.updateTask(task._id, { title, description, status });
      } else {
        await TaskService.createTask({ projectId, title, description, status });
      }
      router.push(`/projects/${projectId}`);
    } catch (error) {
      console.error("Falha ao salvar tarefa", error);
    }
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">
        {task ? "Editar Tarefa" : "Criar Tarefa"}
      </h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Título
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Descrição
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="pending">Pendente</option>
          <option value="completed">Completado</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {task ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
