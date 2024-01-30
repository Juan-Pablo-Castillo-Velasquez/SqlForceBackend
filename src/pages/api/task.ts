import pool from "./conexion";
import { NextApiRequest, NextApiResponse } from "next";

export default async function taskCreated(req: NextApiRequest, res: NextApiResponse) {
  const connection = await pool.getConnection();

  if (req.method === 'GET') {
    try {
      const [tables, fields] = await connection.execute("SELECT * FROM railway.tareas");
      console.log("tables from database:", tables);
      res.status(200).json(tables);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Error fetching tasks" });
    }
  } else if (req.method === 'POST') {
    const { name_tarea, descripcion_tarea, date_tarea } = req.body;
    try {
      const result = await connection.execute(
        "INSERT INTO railway.tareas (name_tarea, descripcion_tarea, date_tarea) VALUES (?, ?, ?)",
        [name_tarea, descripcion_tarea, date_tarea]
      );
      console.log("New task inserted:", result);
      res.status(200).json({ message: "Task inserted successfully" });
    } catch (error) {
      console.error("Error inserting task:", error);
      res.status(500).json({ error: "Error inserting task" });
    }
  } else if (req.method === 'DELETE') {
    const taskId = req.query.id; // Assuming the task ID is passed as a query parameter
    try {
      const result = await connection.execute(
        "DELETE FROM railway.tareas WHERE id_tarea = ?",
        [taskId]
      );
      console.log("Task deleted:", result);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Error deleting task" });
    }finally{
      connection.release(); 
      
          }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
 
}
