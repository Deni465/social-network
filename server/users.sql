DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL CHECK(first != ''),
    last VARCHAR(255) NOT NULL CHECK(last != ''),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL CHECK(password != ''),
    img_url VARCHAR,
    bio VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);