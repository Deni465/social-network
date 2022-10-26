const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
require("dotenv").config();
const db = require("./db");

app.use(compression());

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.urlencoded({ extended: false }));

app.use(
    cookieSession({
        secret: process.env.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14, // 24h
        sameSite: true,
    })
);

app.post("/register", (req, res) => {
    // console.log("Yes, register");
    const { first, last, email, password } = req.body;
    // console.log("req.body", req.body);
    db.createUser(first, last, email, password)
        .then((id) => {
            req.session.userId = id;
            res.json({
                success: true,
                message: "Registration successfull",
            });
        })
        .catch((error) => {
            res.json({
                success: false,
                message: error,
            });
        });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.auth(email, password)
        .then((authentication) => {
            if (authentication.crypt) {
                req.session.userId = authentication.user.id;
            }

            res.json({
                success: true,
                message: "Login successfull",
            });
        })
        .catch((error) => {
            res.json({
                success: false,
                message: error,
            });
        });
});

app.get("/user/id.json", (req, res) => {
    console.log("userId", req.session.userId);
    if (req.session.userId) {
        // db.getUserById().then((data) => {
        //     console.log(data);
        //     res.json(data);
        // });
        return res.json({ userId: req.session.userId });
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
