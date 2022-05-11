
const router = require("express").Router();
const { login } = require("../Controller/login.controller.js");
/* post create booking */
router.post("/", login)

module.exports = router;