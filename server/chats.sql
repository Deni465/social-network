DROP TABLE IF EXISTS chats;

CREATE TABLE chats(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chatrooms or 1:1 