require("dotenv").config();
const spicedPg = require("spiced-pg");
const db_url = process.env.DATABASE_URL;
const bcrypt = require("bcryptjs");
console.log(db_url);
const db = spicedPg(db_url);
const cryptoRandomString = require("crypto-random-string");

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

module.exports.updateProfilePicture = function (id, img_url) {
    const sql = `UPDATE users SET img_url = $2 WHERE id = $1 RETURNING id, img_url;`;
    return db
        .query(sql, [id, img_url])
        .then((result) => result.rows)
        .catch((error) => console.log("error updating img_url", error));
};

module.exports.insertBio = function (id, bio) {
    const sql = `UPDATE users SET bio = $2 WHERE id = $1;`;
    return db
        .query(sql, [id, bio])
        .then((result) => result.rows)
        .catch((error) => console.log("error updating bio", error));
};

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
                        .then((result) => {
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

    // {
    //     // return bcrypt
    //     //     .genSalt()
    //     //     .then((salt) => {
    //     //         return bcrypt.hash(password, salt);
    //     //     })
    //     //     .then((hashedPassword) => {
    //     //         const sql = `UPDATE users SET password = $2 WHERE email = $1 AND code = $3;`;
    //     //         return db
    //     //             .query(sql, [email, hashedPassword, code])
    //     //             .then((result) => result.rows)
    //     //             .catch((error) =>
    //     //                 console.log("error updating password", error)
    //     //             );
    //     //     });
    // } else {
    //     return "Update Password Failed!";
    // }
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
        .catch((error) => console.log("error updating bio", error));
};

function checkCode(email, code) {
    const sql = `SELECT id FROM users WHERE email = $1 AND code = $2 AND CURRENT_TIMESTAMP - code_created_at < INTERVAL '1 minute';`;
    return db
        .query(sql, [email, code])
        .then((result) => result.rows)
        .catch((error) => console.log("error updating bio", error));
}
