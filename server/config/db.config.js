require("dotenv").config();

const dbConfig = process.env.DEV_MODE
  ? {
      user: process.env.USER,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: process.env.PORT,
      database: process.env.DATABASE,
      dialect: "postgres",
    }
  : {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      dialect: "postgres",
    };

module.exports = dbConfig;
