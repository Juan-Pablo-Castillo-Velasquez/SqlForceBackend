import { NextApiRequest, NextApiResponse } from "next";
import pool  from "./conexion";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

type Data = {
  message: string;
  token?: string;
  id_sesion?: number;
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
      "SELECT id_usuario, nombre_usuario, contraseña FROM railway.Usuarios WHERE nombre_usuario = ?",
      [usuario]
    );

    if (user.length > 0) {
      if (user[0].nombre_usuario === usuario && user[0].contraseña === contraseña) {
        const id_usuario = user[0].id_usuario;

        // Crear un token JWT
        const token = jwt.sign({
          username: { usuario },
          exp: Math.floor(Date.now() / 1000) + (60 + 60 * 24 * 30),
        }, "secret");

        const serealize1 = serialize('mytoken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 10000 * 60 * 60 * 24 * 30,
          path: "/",
        });

        res.setHeader("set-cookie", serealize1);
        return res
          .status(200)
          .json({ message: "Operación exitosa", token, id_sesion: id_usuario });
      }
    }

    return res.status(401).json({ message: "Credenciales inválidas" });
  } catch (error) {
    console.error("Error al insertar en la tabla Sesiones:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
