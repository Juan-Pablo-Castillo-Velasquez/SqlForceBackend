import pool from "./conexion";
import { NextApiRequest, NextApiResponse } from "next";

export default async function taskCreated(req: NextApiRequest, res: NextApiResponse) {
  const connection = await pool.getConnection();

  if (req.method === 'GET') {
    try {
      const [tables, fields] = await connection.execute("SELECT * FROM railway.usuarios");
      console.log("tables from database:", tables);
      res.status(200).json(tables);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Error fetching tasks" });
    }finally{
connection.release(); 

    }
}

}
