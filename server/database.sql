CREATE DATABASE curabu;

\c curabu;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    date_created TIMESTAMP DEFAULT NOW(),
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE user_roles (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE club_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE clubs (
    id SERIAL PRIMARY KEY,
    date_created TIMESTAMP DEFAULT NOW(),
    name VARCHAR(255),
    last_modified TIMESTAMP DEFAULT NOW(),
    club_type INTEGER REFERENCES club_types(id) ON DELETE SET NULL
);

CREATE TABLE user_clubs (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    club_id INTEGER REFERENCES clubs(id) ON DELETE CASCADE
);

CREATE TABLE admins (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    club_id INTEGER REFERENCES clubs(id) ON DELETE CASCADE
);

CREATE TABLE moderators (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    club_id INTEGER REFERENCES clubs(id) ON DELETE CASCADE
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    date_created TIMESTAMP DEFAULT NOW(),
    author VARCHAR(255),
    summary VARCHAR(255),
    num_pages INTEGER
);

CREATE TABLE book_clubs (
    id SERIAL PRIMARY KEY,
    club_id INTEGER REFERENCES clubs(id) ON DELETE CASCADE
);


CREATE TABLE book_club_books (
    id SERIAL PRIMARY KEY,
    date_created TIMESTAMP DEFAULT NOW(),
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    is_current_book BOOLEAN,
    start_date TIMESTAMP,
    end_date TIMESTAMP
);

CREATE TABLE user_books (
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    date_created TIMESTAMP DEFAULT NOW(),
    pages_read INTEGER,
    rating INTEGER,
    has_read BOOLEAN
);

CREATE TABLE refresh_tokens (
    token VARCHAR(255) PRIMARY KEY,
    date_created TIMESTAMP DEFAULT NOW(),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    valid_until TIMESTAMP NOT NULL
);


