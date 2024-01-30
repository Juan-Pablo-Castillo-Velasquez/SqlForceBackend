// src/pages/api/insertLogin.ts

import { NextApiRequest, NextApiResponse } from "next";
import  pool  from "./conexion";

type Data = {
  message: string;
  rows?: any[] | undefined;
};

export default async function insertLogin(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { usuario, email,contraseña } = req.body;

  if (usuario === undefined || contraseña === undefined || email === undefined) {
    return res
      .status(400)
      .json({ message: "Usuario,correo y contraseña son obligatorios" });
  }

  const connection = await pool.getConnection();


  try{
    const [user]:any=await  connection.execute("Select nombre_usuario from railway.Usuarios where nombre_usuario=? ",[usuario])
    for(let users of user){
      if(Array.isArray(user && users.length<1 )){
        res.status(200).json({ message: "operacion exitosa"})
        return
         }
    }
  }catch (error) {
    console.log("usuario ya existente",error)
    res.status(500).json({message:"usuarioexistente"})
    return
    }
    

  try {
    const [result] = await connection.execute(
      "INSERT INTO railway.Usuarios (nombre_usuario,email, contraseña) VALUES (?,?,?)",
      [usuario,email, contraseña]
    );

    if (Array.isArray(result)) {
      res.status(200).json({ message: "Operación exitosa", rows: result });
    } else if ("affectedRows" in result) {
      res.status(200).json({ message: "Operación exitosa", rows: undefined });
    } else {
      res.status(200).json({ message: "Operación exitosa", rows: undefined });
    }
  } catch (error) {
    console.error("CorreoYaEnUso:", error);
    res.status(500).json({ message: "CorreoYaEnUso" });
  } finally {
    connection.release();
  }
}

