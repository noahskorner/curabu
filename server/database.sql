CREATE DATABASE curabu;

\c curabu;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    "dateCreated" TIMESTAMP DEFAULT NOW(),
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE roles (
    name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE "userRoles" (
    "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(255) REFERENCES roles(name) ON DELETE CASCADE,
    PRIMARY KEY("userId", role)
);

CREATE TABLE "clubTypes" (
    name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE clubs (
    id SERIAL PRIMARY KEY,
    "dateCreated" TIMESTAMP DEFAULT NOW(),
    name VARCHAR(255),
    "lastModified" TIMESTAMP DEFAULT NOW(),
    "clubType" VARCHAR(255) REFERENCES "clubTypes"(name) ON DELETE SET NULL,
    "createdBy" INTEGER REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE "userClubs" (
    "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
    "clubId" INTEGER REFERENCES clubs(id) ON DELETE CASCADE,
    PRIMARY KEY ("userId", "clubId")
);

CREATE TABLE admins (
    "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
    "clubId" INTEGER REFERENCES clubs(id) ON DELETE CASCADE,
    PRIMARY KEY ("userId", "clubId")
);

CREATE TABLE moderators (
    "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
    "clubId" INTEGER REFERENCES clubs(id) ON DELETE CASCADE,
    PRIMARY KEY ("userId", "clubId")
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    "dateCreated" TIMESTAMP DEFAULT NOW(),
    author VARCHAR(255),
    summary VARCHAR(255),
    "numPages" INTEGER
);

CREATE TABLE "bookClubs" (
    id SERIAL PRIMARY KEY,
    "clubId" INTEGER REFERENCES clubs(id) ON DELETE CASCADE
);

CREATE TABLE "bookClubBooks" (
    id SERIAL PRIMARY KEY,
    "dateCreated" TIMESTAMP DEFAULT NOW(),
    "bookId" INTEGER REFERENCES books(id) ON DELETE CASCADE,
    "isCurrentBook" BOOLEAN,
    "startDate" TIMESTAMP,
    "endDate" TIMESTAMP
);

CREATE TABLE "userBooks" (
    "bookId "INTEGER REFERENCES books(id) ON DELETE CASCADE,
    "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
    "dateCreated" TIMESTAMP DEFAULT NOW(),
    "pagesRead" INTEGER,
    rating INTEGER,
    "hasRead" BOOLEAN
);

CREATE TABLE "refreshTokens" (
    token VARCHAR(255) PRIMARY KEY,
    "dateCeated" TIMESTAMP DEFAULT NOW(),
    "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO roles(name) VALUES("SUPERADMIN");

