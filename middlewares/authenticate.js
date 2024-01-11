const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const Client = require("../model/client");
const Product = require("../model/product");

passport.use(
    new BearerStrategy(async (token, done) => {
        try {
            const client = await Client.findOne({ token });

            console.log("Token:", token);

            if (!client) {
                console.log("Client not found");
                return done(null, false);
            }

            console.log("Client found:", client);

            return done(null, client, { scope: "all" });
        } catch (err) {
            console.log("Error:", err);
            return done(err);
        }
    })
);

const authenticate = passport.authenticate("bearer", { session: false });

module.exports = authenticate;
