require("dotenv").config();
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const initModels = require("./initModels");

const sequelize = process.env.DEV_MODE
  ? new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      logging: false,
    })
  : new Sequelize(dbConfig.connectionString, {
      dialect: dbConfig.dialect,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: dbConfig.rejectUnauthorized,
        },
      },
      logging: false,
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const {
  admins,
  bookClubBooks,
  bookClubs,
  books,
  clubTypes,
  clubs,
  moderators,
  refreshTokens,
  roles,
  userBooks,
  userClubs,
  userRoles,
  users,
} = initModels(sequelize);

db.Admins = admins;
db.ClubTypes = clubTypes;
db.BookClubBooks = bookClubBooks;
db.BookClubs = bookClubs;
db.Books = books;
db.Clubs = clubs;
db.Moderators = moderators;
db.RefreshTokens = refreshTokens;
db.Roles = roles;
db.UserBooks = userBooks;
db.UserClubs = userClubs;
db.UserRoles = userRoles;
db.Users = users;

module.exports = db;
