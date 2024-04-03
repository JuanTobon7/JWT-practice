const { Pool } = require('pg');
const db = new Pool({
    user: process.env.USER_DATABASE,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
})

db.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error al conectar a la base de datos', err.stack);
    } else {
      console.log('Conexión a la base de datos exitosa', res.rows);
    }
  });
module.exports = db;
