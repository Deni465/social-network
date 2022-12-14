require("dotenv").config();
const spicedPg = require("spiced-pg");
const db_url = process.env.DATABASE_URL;
const bcrypt = require("bcryptjs");
console.log(db_url);
const db = spicedPg(db_url);
const cryptoRandomString = require("crypto-random-string");

///////////////////// Registration & Login /////////////////////

module.exports.getUserByEmail = function (email) {
    const sql = "SELECT * FROM users WHERE email = $1";
    return db.query(sql, [email]);
};

module.exports.auth = function (email, password) {
    return this.getUserByEmail(email).then((result) => {
        if (result.rows[0]) {
            return bcrypt
                .compare(password, result.rows[0].password)
                .then((crypt) => {
                    return { crypt, user: result.rows[0] };
                });
        } else {
            return { crypt: false };
        }
    });
};

module.exports.createUser = function (first, last, email, password) {
    return bcrypt
        .genSalt()
        .then((salt) => {
            return bcrypt.hash(password, salt);
        })
        .then((hashedPassword) => {
            const sql = `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
            // Here we are using SAFE interpolation to protect against SQL injection attacks
            return db
                .query(sql, [first, last, email, hashedPassword])
                .then((result) => result.rows[0])
                .catch((error) => console.log("error inserting user", error));
        });
};

module.exports.getUserById = function (id) {
    const sql = `SELECT * FROM users WHERE id = $1;`;
    return db
        .query(sql, [id])
        .then((result) => result.rows)
        .catch((error) => console.log("error getting user by id", error));
};

///////////////////// Upload Profile Pic /////////////////////

module.exports.updateProfilePicture = function (id, img_url) {
    const sql = `UPDATE users SET img_url = $2 WHERE id = $1 RETURNING id, img_url;`;
    return db
        .query(sql, [id, img_url])
        .then((result) => result.rows)
        .catch((error) => console.log("error updating img_url", error));
};

///////////////////// Bio /////////////////////

module.exports.insertBio = function (id, bio) {
    const sql = `UPDATE users SET bio = $2 WHERE id = $1;`;
    return db
        .query(sql, [id, bio])
        .then((result) => result.rows)
        .catch((error) => console.log("error updating bio", error));
};

///////////////////// Other User Profiles /////////////////////

module.exports.showLatestUsers = () => {
    const sql = `SELECT * FROM users
    ORDER BY id DESC
    LIMIT 3;`;
    return db
        .query(sql)
        .then((result) => result.rows)
        .catch((error) => console.log("error in getting latest users", error));
};

module.exports.getMatchingUsers = (first) => {
    const sql = `SELECT * FROM users WHERE first ILIKE $1;`;
    return db
        .query(sql, [first + "%"])
        .then((result) => result.rows)
        .catch((error) => console.log("error in finding other users", error));
};

///////////////////// Reset Password /////////////////////

module.exports.updatePassword = (email, password, code) => {
    return checkCode(email, code).then((result) => {
        if (result.length == 1) {
            return bcrypt
                .genSalt()
                .then((salt) => {
                    return bcrypt.hash(password, salt);
                })
                .then((hashedPassword) => {
                    const sql = `UPDATE users SET password = $2 WHERE email = $1 AND code = $3;`;
                    return db
                        .query(sql, [email, hashedPassword, code])
                        .then(() => {
                            return {
                                success: true,
                            };
                        })
                        .catch((error) =>
                            console.log("error updating password", error)
                        );
                });
        } else {
            return { success: false };
        }
    });
};

module.exports.generateCode = (email) => {
    const secretCode = cryptoRandomString({
        length: 6,
    });
    const sql = `UPDATE users SET code = $2, code_created_at = CURRENT_TIMESTAMP WHERE email = $1 RETURNING id, email,code;`;
    return db
        .query(sql, [email, secretCode])
        .then((result) => {
            return result.rows;
        })
        .catch((error) => console.log("error generating code", error));
};

function checkCode(email, code) {
    const sql = `SELECT id FROM users WHERE email = $1 AND code = $2 AND CURRENT_TIMESTAMP - code_created_at < INTERVAL '1 minute';`;
    return db
        .query(sql, [email, code])
        .then((result) => result.rows)
        .catch((error) => console.log("error checking the code", error));
}

///////////////////// Friendship With Other Users /////////////////////

module.exports.getFriendshipInformation = (user1, user2) => {
    const sql = `
        SELECT * FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)`;
    return db
        .query(sql, [user1, user2])
        .then((result) => result.rows)
        .catch((error) =>
            console.log("error get friendship information", error)
        );
};

module.exports.createFriendship = (user1, user2) => {
    const sql = `INSERT INTO friendships (sender_id, recipient_id)
    VALUES ($1, $2) RETURNING *;`;
    return db
        .query(sql, [user1, user2])
        .then((result) => result.rows)
        .catch((error) => console.log("error create friendship", error));
};

module.exports.acceptFriendship = (user1, user2) => {
    const sql = `UPDATE friendships SET accepted = true 
    WHERE (sender_id = $1 AND recipient_id = $2 AND accepted = false)
    OR (sender_id = $2 AND recipient_id = $1 AND accepted = false)
    RETURNING accepted;`;
    return db
        .query(sql, [user1, user2])
        .then((result) => result.rows)
        .catch((error) =>
            console.log("Error in acceptFriendshipRequest:", error)
        );
};

module.exports.cancelFriendship = (user1, user2) => {
    const sql = `DELETE FROM friendships 
    WHERE (sender_id = $1 AND recipient_id = $2)
    OR (sender_id = $2 AND recipient_id = $1);`;
    return db
        .query(sql, [user1, user2])
        .then((result) => result.rows)
        .catch((error) =>
            console.log("Error in cancelFriendshipRequest:", error)
        );
};

///////////////////// Redux Show Friends & Wannabes /////////////////////

module.exports.showFriendsAndWannabes = (id) => {
    // console.log("db.js", id);
    const sql = `SELECT users.id, first, last, accepted, img_url FROM users
JOIN friendships
ON (accepted = true AND recipient_id = $1 AND users.id = friendships.sender_id)
OR (accepted = true AND sender_id = $1 AND users.id = friendships.recipient_id)
OR (accepted = false AND recipient_id = $1 AND users.id = friendships.sender_id);`;
    return db
        .query(sql, [id])
        .then((result) => {
            // console.log("db result", result);
            return result.rows;
        })
        .catch((error) =>
            console.log("error in getting Friends and Wannabe's", error)
        );
};

///////////////////// Chat /////////////////////

module.exports.insertMessage = (id, message) => {
    console.log("db.js insertMessage", id, message);
    // insert messages
    const sql = `INSERT INTO chats (sender_id, message)
    VALUES ($1, $2) RETURNING *;`;
    return db
        .query(sql, [id, message])
        .then((result) => {
            // console.log("db result", result);
            return result.rows[0];
        })
        .catch((error) => console.log("error in inserting the message", error));
};

module.exports.getMessages = (limit = 10) => {
    // show messages
    // latest $1
    // FROM chats JOIN users ON ... ORDER BY DESC
    const sql = `SELECT chats.id, chats.message, chats.created_at, users.first, users.last, users.img_url FROM chats JOIN users ON chats.sender_id = users.id  
    ORDER BY chats.created_at DESC
    LIMIT $1;`;
    return db
        .query(sql, [limit])
        .then((result) => result.rows)
        .catch((error) => console.log("error get messages", error));
};
