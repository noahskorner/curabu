const db = require("../models/index.js");

const seed = async () => {
  await db.sequelize.query(
    "INSERT INTO public.roles(name) VALUES ('SUPERADMIN');"
  );
  await db.sequelize.query("INSERT INTO public.roles(name) VALUES ('ADMIN');");
  await db.sequelize.query(
    "INSERT INTO public.users(id, username, email, password) VALUES (1,'noah-got-hacked', 'noahskorner@gmail.com', '$2b$10$KhJqZrmfX73RIUyhLw5zHOaBORx.d689EeqTEUkq0jAoMUHKDkfxe');"
  );
  await db.sequelize.query(
    'INSERT INTO public."userRoles"("userId", "role") VALUES (1, \'SUPERADMIN\');'
  );
  await db.sequelize.query(
    "INSERT INTO public.\"clubTypes\"(name) VALUES ('BOOK_CLUB');"
  );
  // Example Club 1
  // await db.sequelize.query(
  //   "INSERT INTO public.clubs(id, name, \"clubType\", \"createdBy\") VALUES (1, 'Taylors Book Club', 'BOOK_CLUB', 1);"
  // );
  // await db.sequelize.query(
  //   'INSERT INTO public.admins("userId", "clubId") VALUES (1, 1);'
  // );
  // await db.sequelize.query(
  //   'INSERT INTO public."userClubs"("userId", "clubId") VALUES (1, 1);'
  // );
  // await db.sequelize.query(
  //   "INSERT INTO public.posts(id, \"userId\", \"clubId\", title, body) VALUES (1, 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Vivamus ac tellus at turpis vestibulum ullamcorper. Nullam eu faucibus magna. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');"
  // );
  // await db.sequelize.query(
  //   "INSERT INTO public.posts(id, \"userId\", \"clubId\", title, body) VALUES (2, 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Vivamus ac tellus at turpis vestibulum ullamcorper. Nullam eu faucibus magna. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');"
  // );
  // await db.sequelize.query(
  //   "INSERT INTO public.posts(id, \"userId\", \"clubId\", title, body) VALUES (3, 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Vivamus ac tellus at turpis vestibulum ullamcorper. Nullam eu faucibus magna. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');"
  // );
  // await db.sequelize.query(
  //   "INSERT INTO public.posts(id, \"userId\", \"clubId\", title, body) VALUES (4, 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Vivamus ac tellus at turpis vestibulum ullamcorper. Nullam eu faucibus magna. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');"
  // );
  // await db.sequelize.query(
  //   "INSERT INTO public.posts(id, \"userId\", \"clubId\", title, body) VALUES (5, 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Vivamus ac tellus at turpis vestibulum ullamcorper. Nullam eu faucibus magna. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');"
  // );
  // Example Club 2
  // await db.sequelize.query(
  //   "INSERT INTO public.clubs(id, name, \"clubType\", \"createdBy\") VALUES (2, 'Noahs Book Club', 'BOOK_CLUB', 1);"
  // );
  // await db.sequelize.query(
  //   'INSERT INTO public.admins("userId", "clubId") VALUES (1, 2);'
  // );
  // await db.sequelize.query(
  //   'INSERT INTO public."userClubs"("userId", "clubId") VALUES (1, 2);'
  // );
  // await db.sequelize.query(
  //   "INSERT INTO public.posts(id, \"userId\", \"clubId\", title, body) VALUES (6, 1, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Vivamus ac tellus at turpis vestibulum ullamcorper. Nullam eu faucibus magna. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');"
  // );
  // await db.sequelize.query(
  //   "INSERT INTO public.posts(id, \"userId\", \"clubId\", title, body) VALUES (7, 1, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Vivamus ac tellus at turpis vestibulum ullamcorper. Nullam eu faucibus magna. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');"
  // );
  // await db.sequelize.query(
  //   "INSERT INTO public.posts(id, \"userId\", \"clubId\", title, body) VALUES (8, 1, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Vivamus ac tellus at turpis vestibulum ullamcorper. Nullam eu faucibus magna. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');"
  // );
  // await db.sequelize.query(
  //   "INSERT INTO public.posts(id, \"userId\", \"clubId\", title, body) VALUES (9, 1, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Vivamus ac tellus at turpis vestibulum ullamcorper. Nullam eu faucibus magna. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');"
  // );
  // await db.sequelize.query(
  //   "INSERT INTO public.posts(id, \"userId\", \"clubId\", title, body) VALUES (10, 1, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Vivamus ac tellus at turpis vestibulum ullamcorper. Nullam eu faucibus magna. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');"
  // );
};

module.exports = {
  seed,
};
