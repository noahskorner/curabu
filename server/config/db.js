require("dotenv").config();

const Pool = require("pg").Pool;

const pool = new Pool(
  process.env.DEV_MODE
    ? {
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: process.env.PORT,
        database: process.env.DATABASE,
      }
    : {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
);

module.exports = pool;
