const {Pool} = require('pg');
const db = new Pool({
    user: 'postgres.basyflwabtgjovjndbum',
    host: 'aws-0-us-west-1.pooler.supabase.com',
    database: 'ecommerce',
    password: 'j1122920156T1.',
    port: 5432,
})
