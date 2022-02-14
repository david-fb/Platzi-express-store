const { Pool } = require('pg');
const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({ connectionString: URI})

// const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   user: 'davidb',
//   password: 'admin',
//   database: 'my_store'
// });

module.exports = pool;
