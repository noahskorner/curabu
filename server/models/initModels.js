var DataTypes = require("sequelize").DataTypes;
var _admins = require("./admins");
var _bookClubBooks = require("./bookClubBooks");
var _bookClubs = require("./bookClubs");
var _books = require("./books");
var _clubTypes = require("./clubTypes");
var _clubs = require("./clubs");
var _moderators = require("./moderators");
var _refreshTokens = require("./refreshTokens");
var _roles = require("./roles");
var _userBooks = require("./userBooks");
var _userClubs = require("./userClubs");
var _userRoles = require("./userRoles");
var _users = require("./users");

function initModels(sequelize) {
  var clubTypes = _clubTypes(sequelize, DataTypes);
  var books = _books(sequelize, DataTypes);
  var admins = _admins(sequelize, DataTypes);
  var bookClubBooks = _bookClubBooks(sequelize, DataTypes);
  var bookClubs = _bookClubs(sequelize, DataTypes);
  var clubs = _clubs(sequelize, DataTypes);
  var moderators = _moderators(sequelize, DataTypes);
  var refreshTokens = _refreshTokens(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var userBooks = _userBooks(sequelize, DataTypes);
  var userClubs = _userClubs(sequelize, DataTypes);
  var userRoles = _userRoles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  clubs.belongsToMany(users, { as: 'userId_users', through: admins, foreignKey: "clubId", otherKey: "userId" });
  clubs.belongsToMany(users, { as: 'userId_users_moderators', through: moderators, foreignKey: "clubId", otherKey: "userId" });
  clubs.belongsToMany(users, { as: 'userId_users_userClubs', through: userClubs, foreignKey: "clubId", otherKey: "userId" });
  roles.belongsToMany(users, { as: 'userId_users_userRoles', through: userRoles, foreignKey: "role", otherKey: "userId" });
  users.belongsToMany(clubs, { as: 'clubId_clubs', through: admins, foreignKey: "userId", otherKey: "clubId" });
  users.belongsToMany(clubs, { as: 'clubId_clubs_moderators', through: moderators, foreignKey: "userId", otherKey: "clubId" });
  users.belongsToMany(clubs, { as: 'clubId_clubs_userClubs', through: userClubs, foreignKey: "userId", otherKey: "clubId" });
  users.belongsToMany(roles, { as: 'role_roles', through: userRoles, foreignKey: "userId", otherKey: "role" });
  bookClubBooks.belongsTo(books, { as: "book", foreignKey: "bookId"});
  books.hasMany(bookClubBooks, { as: "bookClubBooks", foreignKey: "bookId"});
  userBooks.belongsTo(books, { as: "bookId _book", foreignKey: "bookId "});
  books.hasMany(userBooks, { as: "userBooks", foreignKey: "bookId "});
  clubs.belongsTo(clubTypes, { as: "clubType_clubType", foreignKey: "clubType"});
  clubTypes.hasMany(clubs, { as: "clubs", foreignKey: "clubType"});
  admins.belongsTo(clubs, { as: "club", foreignKey: "clubId"});
  clubs.hasMany(admins, { as: "admins", foreignKey: "clubId"});
  bookClubs.belongsTo(clubs, { as: "club", foreignKey: "clubId"});
  clubs.hasMany(bookClubs, { as: "bookClubs", foreignKey: "clubId"});
  moderators.belongsTo(clubs, { as: "club", foreignKey: "clubId"});
  clubs.hasMany(moderators, { as: "moderators", foreignKey: "clubId"});
  userClubs.belongsTo(clubs, { as: "club", foreignKey: "clubId"});
  clubs.hasMany(userClubs, { as: "userClubs", foreignKey: "clubId"});
  userRoles.belongsTo(roles, { as: "role_role", foreignKey: "role"});
  roles.hasMany(userRoles, { as: "userRoles", foreignKey: "role"});
  admins.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(admins, { as: "admins", foreignKey: "userId"});
  clubs.belongsTo(users, { as: "createdBy_user", foreignKey: "createdBy"});
  users.hasMany(clubs, { as: "clubs", foreignKey: "createdBy"});
  moderators.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(moderators, { as: "moderators", foreignKey: "userId"});
  refreshTokens.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(refreshTokens, { as: "refreshTokens", foreignKey: "userId"});
  userBooks.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(userBooks, { as: "userBooks", foreignKey: "userId"});
  userClubs.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(userClubs, { as: "userClubs", foreignKey: "userId"});
  userRoles.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(userRoles, { as: "roles", foreignKey: "userId"});

  return {
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
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
