const router = require("express").Router();
const clientControllers = require("../controllers/client");

router.post("/client", clientControllers.registerClient);
router.get("/client", clientControllers.loginClient);
router.get("/allClients", clientControllers.getAllClients);

module.exports = router;
