const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'davidb',
  password: 'admin',
  database: 'my_store'
});

module.exports = pool;