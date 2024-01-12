const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/database");
const passport = require("passport");
const session = require("express-session");

const app = express();
app.use(bodyParser.json());

connectDB();

const port = process.env.PORT || 3300;

app.use(
    cors({
        origin: true,
        methods: ["GET", "POST", "DELETE", "PATCH"],
        credentials: true,
    })
);

app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
    })
);

require("./middlewares/bearer");
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./routes/client"));
app.use("/api", require("./routes/product"));
app.use("/api", require("./routes/order"));

app.listen(port, () =>
    console.log(" server is runing on http://localhost:" + port)
);
