const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER || 'alfre',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'moviefan',
  password: process.env.PGPASSWORD || 'alfre123',
  port: process.env.PGPORT || 5432,
});

module.exports = pool;
