const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
require("dotenv").config();
const db = require("./db");
const { uploader } = require("./middleware.js");
const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

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

app.use((req, res, next) => {
    console.log("---------------------");
    console.log("req.url:", req.url);
    console.log("req.method:", req.method);
    console.log("req.session:", req.session);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);
    console.log("---------------------");
    next();
});

///////////////////// Routes /////////////////////

app.post("/register", (req, res) => {
    // console.log("Yes, register");
    const { first, last, email, password } = req.body;
    // console.log("req.body", req.body);
    db.createUser(first, last, email, password)
        .then((newUser) => {
            console.log({ newUser });
            req.session.userId = newUser.id;
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

app.get("/logout", (req, res) => {
    req.session = null;
    res.json({
        success: true,
    });
});

app.get("/user", (req, res) => {
    db.getUserById(req.session.userId)
        .then((data) => {
            delete data[0].password;
            res.json(data[0]);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/user/id.json", (req, res) => {
    console.log("userId", req.session.userId);
    if (req.session.userId) {
        return res.json({ userId: req.session.userId });
    }
});

///////////////////// My Profile /////////////////////

app.post("/profileimg", uploader.single("file"), (req, res) => {
    if (req.file) {
        console.log("success");
        const { filename, mimetype, size, path } = req.file;
        const promise = s3
            .putObject({
                Bucket: "spicedling",
                ACL: "public-read",
                Key: filename,
                Body: fs.createReadStream(path),
                ContentType: mimetype,
                ContentLength: size,
            })
            .promise();

        let url = `https://s3.amazonaws.com/spicedling/${filename}`;
        promise
            .then(() => {
                console.log("success", req.session.userId);
                // console.log("req.file", req.file);
                return db.updateProfilePicture(req.session.userId, url);
            })
            .then((data) => {
                console.log("path", path);
                fs.unlinkSync(path, () => {});

                res.json({
                    success: true,
                    message: "Thank you!",
                    id: data[0].id,
                    created_at: data[0].created_at,
                    url,
                });
                // console.log("url", url);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.json({
            success: false,
            message: "You didn't pick a file!",
        });
    }
});

app.post("/bio", (req, res) => {
    db.insertBio(req.session.userId, req.body.bio).then((data) => {
        console.log("Bio successful", data);
        res.json(data);
    });
});

///////////////////// Other Profiles /////////////////////

app.get("/getlatestuser/:id", (req, res) => {
    // console.log("req.params.id", req.params.id);
    db.getUserById(req.params.id)
        .then((data) => {
            delete data[0].password;
            console.log("getUserById data", data);
            res.json(data[0]);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/getlatestusers", (req, res) => {
    // console.log("req.query", req.query);
    if (req.query.query === "") {
        db.showLatestUsers().then((data) => {
            // console.log("Users shown", data);
            res.json(data);
        });
    } else {
        db.getMatchingUsers(req.query.query).then((data) => {
            res.json(data);
        });
    }
});

///////////////////// Reset Password /////////////////////

app.post("/getcode", (req, res) => {
    db.generateCode(req.body.email).then((data) => {
        res.json(data);
    });
});

app.post("/reset", (req, res) => {
    db.updatePassword(req.body.email, req.body.password, req.body.code).then(
        (data) => {
            console.log("updatePassword data", data);
            res.json(data);
        }
    );
});

///////////////////// Friendship Request /////////////////////

app.get("/getfriendship/:id", (req, res) => {
    console.log("-----------------------------------------");
    console.log("\t /getfriendship/:id ");
    console.log("id: ", req.params.id, "\nuserId: ", req.session.userId);
    console.log("-----------------------------------------");

    db.getFriendshipInformation(req.session.userId, req.params.id).then(
        (data) => {
            console.log("getFriendshipInformation data:", data);
            // initial value = no friendship => buttonStatus = request Friendship
            // find in FriendshipButton buttonStatus arr
            const friendshipResult = { friendshipStatus: 0 };
            console.log("data.length", data.length);
            if (data.length == 1) {
                if (data[0].accepted == true) {
                    // status friendship accepted => buttonStatus Unfriend
                    friendshipResult.friendshipStatus = 1;
                } else {
                    console.log("hello");
                    if (req.session.userId == data[0].sender_id) {
                        friendshipResult.friendshipStatus = 3;
                    } else if (req.session.userId == data[0].recipient_id) {
                        friendshipResult.friendshipStatus = 2;
                    }
                }
            }
            res.json(friendshipResult);
        }
    );
});

app.post("/requestfriendship/:id", (req, res) => {
    db.createFriendship(req.session.userId, req.params.id).then((data) => {
        console.log(data);
        res.json(data);
    });
});

app.post("/acceptfriendship/:id", (req, res) => {
    db.acceptFriendship(req.session.userId, req.params.id).then((data) => {
        console.log(data);
        res.json(data);
    });
});

app.post("/cancelfriendship/:id", (req, res) => {
    db.cancelFriendship(req.session.userId, req.params.id).then((data) => {
        console.log(data);
        res.json(data);
    });
});

//////////////////// Redux /////////////////////

app.get("/friends", (req, res) => {
    db.showFriendsAndWannabes().then((data) => {
        console.log("showFriendsAndWannabes", data);
        res.json();
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
