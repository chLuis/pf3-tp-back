const mysql = require('mysql2/promise');

const function_db_connection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'powerhouse_gym',
    })
    await connection.connect();
    console.log('✅ Conectado a la base de datos correctamente');

    return connection
  }
  catch (error) {
    console.log(error)
  }
}

const db_connection = function_db_connection();

module.exports = {db_connection};
