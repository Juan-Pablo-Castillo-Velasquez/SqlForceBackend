// En tu controlador de API (api/Tableinfo.js)

import { NextApiRequest, NextApiResponse } from 'next';
import conexion2 from './conexion';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const connection = await conexion2.getConnection();

  try {

    if (req.method === 'GET') {
      // Endpoint para obtener la lista de tablas
      const [tables] = await connection.query('SHOW TABLES');
      connection.release();
      res.status(200).json({ tables });
    } else if (req.method === 'POST') {
      // Endpoint para obtener los datos de una tabla específica
      const tableName = req.body.tableName; // Asegúrate de enviar el nombre de la tabla desde el cliente
      const [tableData] = await connection.query(`SELECT * FROM ${tableName}`);
      connection.release();
      res.status(200).json({ tableData });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }finally{
    connection.release(); 
    
        }
  
};

export default handler;
