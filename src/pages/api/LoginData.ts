import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "./conexion";

type Data = {
  message: string;
};

export default async function insertLogin(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { usuario, contraseña } = req.body;

  if (usuario === undefined || contraseña === undefined) {
    return res
      .status(400)
      .json({ message: "Usuario y contraseña son obligatorios" });
  }

  const connection = await pool.getConnection();

  try {
    const [user]: any = await connection.execute(
      "SELECT nombre_usuario FROM railway.Usuarios WHERE nombre_usuario = ? AND contraseña = ?",
      [usuario,contraseña]
    );

   
    if (user.length > 0) {
        return res.status(200).json({ message: "Inicio de sesión exitoso" });
      } else {
        res.status(401).json({ message: "Credenciales incorrectas" });
      }
    } catch (error) {
      console.error("Error en la consulta a la base de datos:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    } finally {
      if (connection) {
        connection.release();
      }
    }
}
