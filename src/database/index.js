const { Pool } = require('pg');
const db = new Pool({
    user: procces.env.DATABASEUSER,
    host: procces.env.DATABASEHOST,
    database: procces.env.DATABASE,
    password: process.env.DATABASEPASSWD,
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
