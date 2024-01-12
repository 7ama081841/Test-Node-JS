const router = require("express").Router();
const clientControllers = require("../controllers/client");
const passport = require("passport");

router.post("/client", clientControllers.registerClient);
router.get(
    "/client",
    passport.authenticate("local", { failureMessage: "user not found" }),
    clientControllers.loginClient
);

module.exports = router;
