const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL;

const sql = postgres(connectionString, {
  ssl: 'require',
});

module.exports = sql;
