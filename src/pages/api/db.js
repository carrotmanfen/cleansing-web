import mysql from 'mysql2/promise';

const createDatabasePool = (config) => {
  return mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: config.connectionLimit,
    queueLimit: config.queueLimit
  });
};

export default createDatabasePool;