const { Pool } = require('pg');
const db = new Pool({
    user: 'postgres.basyflwabtgjovjndbum',
    host: 'aws-0-us-west-1.pooler.supabase.com',
    database: 'ecommerce',
    password: 'j1122920156T1.',
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
