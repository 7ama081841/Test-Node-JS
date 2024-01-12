const passport = require("passport");
// const BearerStrategy = require("passport-http-bearer").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Client = require("../model/client");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// passport.use(
//     new BearerStrategy(async (token, done) => {
//         try {
//             const decoded = jwt.verify(token, process.env.TOKENKEY);
//             const client = await Client.findById(decoded._id);

//             if (!client) {
//                 return done(null, false);
//             }

//             return done(null, client, { scope: "all" });
//         } catch (err) {
//             return done(err);
//         }
//     })
// );

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (username, password, done) => {
            try {
                // const decoded = jwt.verify(token, process.env.TOKENKEY);
                const client = await Client.findOne({ email: username });

                // console.log(client);
                console.log(password);

                if (!client) {
                    return done(null, false, {
                        type: errorlogin,
                        message: "email or password is not valid ",
                    });
                }

                const isPassword = await bcrypt.compare(
                    client.password,
                    password
                );

                console.log(isPassword);

                if (!isPassword) {
                    return done(null, false, {
                        type: errorlogin,
                        message: "email or password is not valid ",
                    });
                }

                return done(null, client, { scope: "all" });
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser((client, done) => {
    done(null, client._id);
});

passport.deserializeUser((id, done) => {
    Client.findById(id)
        .then((client) => {
            done(null, client);
        })
        .catch((err) => {
            done(err, null);
        });
});
