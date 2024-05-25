import mysql from 'mysql2/promise';

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '50mb', // Adjust the size limit as needed
      },
    },
  };
  
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { host, user, password, database, table } = req.body;

  try {
    const connection = await mysql.createConnection({ host, user, password, database });

    const [rows] = await connection.execute(`SELECT * FROM ${table}`);
    // You can process the 'rows' array to display or use the data

    res.status(200).json({ data: rows });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'An error occurred while connecting to the database.' });
  }
}