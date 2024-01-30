import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/nav';

interface Task {
  id_tarea: number;
  name_tarea: string;
  descripcion_tarea: string;
  date_tarea: string;
  Taskinfo:string,
  status: 'pendiente' | 'completada';
}

const TodoList: React.FC = () => {
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskDate, setTaskDate] = useState<string>('');
  const [Taskinfo, setTaskinfo] = useState<string>('');

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>('../api/task');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDate(e.target.value);
  };
  const handleChangeinfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskinfo(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskName.trim() !== '' && taskDescription.trim() !== '' && taskDate.trim() !== '') {
      try {
        const response = await axios.post<Task[]>('../api/task', {
          name_tarea: taskName,
          descripcion_tarea: taskDescription,
          date_tarea: taskDate,
          status: 'pendiente',
          Taskinfo: Taskinfo || '' // Use '' as default value if Taskinfo is undefined
        });
        fetchTasks();
        setTaskName('');
        setTaskDescription('');
        setTaskDate('');
        setTaskinfo('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    } else {
      console.error('One or more values are empty');
    }
  };
  
  
  useEffect(() => {
    const UserInfotask = async () => {
      try {
        const response = await axios.get<any>('../api/profile');
        console.log(response.data.usuario.usuario)
     if (response.data && response.data.usuario.usuario) {
      setTaskinfo(response.data.usuario.usuario);

}

      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    
    UserInfotask();
  }, []);

  const handleTaskCompleted = async (taskId: number) => {
    console.log('Implementar lógica para marcar la tarea como completada:', taskId);
  };

  const handleTaskDeleted = async (taskId: number) => {
    try {
      await axios.delete(`../api/task?id=${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  const condicion= tasks.length<=0 ? (<div><h1 className='text-white text-4xl'>No hay tareas aun añade una ⚙️ </h1></div>):<div><h1 className='text-white text-4xl'>tareas {tasks.length}  💬  </h1></div> ;

  const colors = {
    sidebar: 'bg-gradient-to-r from-gray-900 to-pink-900',
    container: 'bg-gray-900',
    text: 'text-gray-800',
  };

  return (
    <>
      <Nav />
      <div className={`p-4 sm:ml-60 ${colors.text}`}>
        <div className={`p-2 border-2 ${colors.container} border-dashed rounded-lg dark:border-${colors.text}`}>
          <h1 className="text-xl font-bold mb-4">Lista de Tareas</h1>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              placeholder="Nombre de la tarea"
              value={taskName}
              onChange={handleChangeName}
              className="border border-gray-300 p-2 rounded-md mr-2 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={taskDescription}
              onChange={handleChangeDescription}
              className="border border-gray-300 p-2 rounded-md mr-2 focus:outline-none focus:border-blue-500"
            />
            <input
              type="date"
              value={taskDate}
              onChange={handleChangeDate}
              className="border border-gray-300 p-2 rounded-md mr-2 focus:outline-none focus:border-blue-500"
            />
            <input
  type="text"
  value={Taskinfo}
  onChange={handleChangeinfo}
  className="border border-gray-300 p-2 rounded-md mr-2 focus:outline-none focus:border-blue-500"
/>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Agregar tarea
            </button>
          </form>
          <div className="grid grid-cols-1 gap-4">
          {condicion}

            {tasks.map((task) => (
              <div key={task.id_tarea} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{task.name_tarea}</h3>
                  <p className="text-sm text-gray-500">{task.descripcion_tarea}</p>
                  <p className="text-xs text-gray-400">Creada el: {task.date_tarea}</p>
                  <p className="text-xs text-gray-400">Estado: {task.status}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleTaskCompleted(task.id_tarea)}
                    className={`py-1 px-3 text-xs font-semibold rounded ${
                      task.status === 'pendiente' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white cursor-not-allowed'
                    }`}
                    disabled={task.status === 'completada'}
                  >
                    {task.status === 'pendiente' ? 'Completar' : 'Completada'}
                  </button>
                  <button
                    onClick={() => handleTaskDeleted(task.id_tarea)}
                    className="py-1 px-3 text-xs font-semibold bg-red-500 text-white rounded ml-2"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
